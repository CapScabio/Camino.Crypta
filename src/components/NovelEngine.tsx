import React, { useState, useEffect } from 'react';
import { script } from '../data/script';
import type { Choice } from '../data/script';
import { DialogBox } from './DialogBox';
import { SceneScreen } from './SceneScreen';
import { ChoiceOverlay } from './ChoiceOverlay';
import { ExchangeSim } from './ExchangeSim';
import { WalletSim } from './WalletSim';
import { useAudio } from '../hooks/useAudio';

interface NovelEngineProps {
  onBackToMenu: () => void;
}

export const NovelEngine: React.FC<NovelEngineProps> = ({ onBackToMenu }) => {
    const [currentNodeId, setCurrentNodeId] = useState('c1_start');
    const [sats, setSats] = useState(50000);
    const [maxiScore, setMaxiScore] = useState(0);
    const [shitcoinFomo, setShitcoinFomo] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const audio = useAudio();

  const currentNode = script[currentNodeId] || script['c1_start'];

  // Start background music and handle volume state
  useEffect(() => {
    if (!isMuted) {
      audio.startMusic();
    } else {
      audio.stopMusic();
    }
    return () => {
      audio.stopMusic();
    };
  }, [isMuted]);

  // Sync panic effect to expression
  const isPanic = currentNode.expression === 'panico' || currentNode.id.includes('panic') || currentNode.id.includes('liquidation');

  const handleAdvance = () => {
    if (currentNode.choices && currentNode.choices.length > 0) {
      // Must make a choice, clicking dialog box does nothing
      return;
    }

    if (currentNode.nextId) {
      if (currentNode.nextId === 'game_finished_reset') {
        audio.playSuccess();
        onBackToMenu();
      } else {
        setCurrentNodeId(currentNode.nextId);
      }
    }
  };

  const handleChoiceSelect = (choice: Choice) => {
    // Apply stats effects
    if (choice.effects) {
      if (choice.effects.sats !== undefined) {
        if (choice.nextId === 'c1_start') setSats(50000);
        else if (choice.nextId === 'c2_start') setSats(10000);
        else if (choice.nextId === 'c3_start') setSats(10000);
        else setSats(prev => Math.max(0, prev + (choice.effects?.sats || 0)));
      }
      if (choice.effects.maxiScore !== undefined) {
        if (choice.nextId.includes('start') || choice.nextId.includes('arrival')) setMaxiScore(0);
        else setMaxiScore(prev => Math.max(0, prev + (choice.effects?.maxiScore || 0)));
      }
      if (choice.effects.shitcoinFomo !== undefined) {
        if (choice.nextId.includes('start') || choice.nextId.includes('arrival')) setShitcoinFomo(0);
        else setShitcoinFomo(prev => Math.max(0, prev + (choice.effects?.shitcoinFomo || 0)));
      }
    }

    // Play contextual sounds
    if (choice.nextId.includes('gameover') || choice.nextId.includes('wrong') || choice.nextId.includes('liquidated')) {
      audio.playError();
    } else if (choice.nextId.includes('correct') || choice.nextId.includes('success')) {
      audio.playSuccess();
    } else {
      audio.playBeep(440, 0.08, 'sine');
    }

    setCurrentNodeId(choice.nextId);
  };

  const handleExchangeComplete = (success: boolean) => {
    if (!success) {
      setSats(0);
      setCurrentNodeId('c1_liquidation');
    }
  };

  const handleWalletComplete = (success: boolean) => {
    if (success) {
      setSats(prev => Math.max(0, prev - 4500)); // Coffee cost 4500 sats
      setCurrentNodeId('c3_wallet_success');
    }
  };

  // Quick stats values display in top overlay
  return (
    <div className="vn-frame">
      {/* Top Status HUD */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '20px',
        right: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 15,
        pointerEvents: 'none'
      }}>
        {/* Statistics HUD */}
        <div style={{ display: 'flex', gap: '16px', pointerEvents: 'auto' }}>
          <div style={{
            background: 'rgba(10, 15, 30, 0.75)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: 'var(--accent-btc)' }}>⚡ Sats:</span>
            <span>{sats.toLocaleString()}</span>
          </div>

          <div style={{
            background: 'rgba(10, 15, 30, 0.75)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: 'var(--accent-cyan)' }}>💊 Orange Score:</span>
            <span>{maxiScore}</span>
          </div>

          <div style={{
            background: 'rgba(10, 15, 30, 0.75)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ color: 'var(--accent-red)' }}>🔥 FOMO:</span>
            <span>{shitcoinFomo}</span>
          </div>
        </div>

        {/* Audio Mute controls */}
        <div style={{ display: 'flex', gap: '10px', pointerEvents: 'auto' }}>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            style={{
              background: 'rgba(10, 15, 30, 0.75)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-light)',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              transition: 'all 0.2s'
            }}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          
          <button 
            onClick={onBackToMenu}
            style={{
              background: 'rgba(10, 15, 30, 0.75)',
              border: '1px solid var(--accent-red)',
              color: 'var(--accent-red)',
              padding: '0 12px',
              height: '36px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              transition: 'all 0.2s',
              fontFamily: 'var(--font-mono)'
            }}
          >
            SALIR
          </button>
        </div>
      </div>

      {/* Interactive Screens */}
      {currentNode.minigame === 'exchange' ? (
        <ExchangeSim onComplete={handleExchangeComplete} />
      ) : currentNode.minigame === 'wallet' ? (
        <WalletSim onComplete={handleWalletComplete} />
      ) : (
        <>
          {/* Main Visual Novel Dialogue & Scene rendering */}
          <SceneScreen
            background={currentNode.background}
            character={currentNode.character || null}
            expression={currentNode.expression || null}
            isPanic={isPanic}
          />

          {/* Choices selector */}
          {currentNode.choices && currentNode.choices.length > 0 && (
            <ChoiceOverlay
              choices={currentNode.choices}
              onSelect={handleChoiceSelect}
              isSatoshiNode={currentNode.isSatoshiNode}
            />
          )}

          {/* Dialogue text box at bottom */}
          <DialogBox
            speaker={currentNode.speaker}
            text={currentNode.text}
            isSatoshiNode={currentNode.isSatoshiNode}
            onAdvance={handleAdvance}
          />
        </>
      )}
    </div>
  );
};
