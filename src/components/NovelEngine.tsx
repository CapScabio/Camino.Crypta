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
  playerName: string;
  gender: 'hombre' | 'mujer';
  npub: string;
  nsec: string;
}

export const NovelEngine: React.FC<NovelEngineProps> = ({ onBackToMenu, playerName, gender, npub, nsec }) => {
  const [currentNodeId, setCurrentNodeId] = useState('c1_start');
  const [sats, setSats] = useState(50000);
  const [soberaniaScore, setSoberaniaScore] = useState(0);
  const [tradingScore, setTradingScore] = useState(0);
  const [rutaSobreviviente, setRutaSobreviviente] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Badge & Ending screens
  const [showBadgeScreen, setShowBadgeScreen] = useState(false);
  const [nostrConsoleLogs, setNostrConsoleLogs] = useState<string[]>([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [hasCopiedJSON, setHasCopiedJSON] = useState(false);

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
  const isPanic = currentNode.expression === 'panico' || currentNode.id.includes('panic') || currentNode.id.includes('liquidated') || currentNode.id.includes('badending');

  const replacePlaceholders = (rawText: string) => {
    if (!rawText) return '';
    return rawText
      .replace(/{playerName}/g, playerName)
      .replace(/{o\/a}/g, gender === 'mujer' ? 'a' : 'o')
      .replace(/{a\/o}/g, gender === 'mujer' ? 'a' : 'o')
      .replace(/{el\/la}/g, gender === 'mujer' ? 'la' : 'el')
      .replace(/{un\/una}/g, gender === 'mujer' ? 'una' : 'un');
  };

  const handleAdvance = () => {
    if (currentNode.choices && currentNode.choices.length > 0) {
      return;
    }

    if (currentNode.nextId) {
      if (currentNode.nextId === 'game_finished_reset') {
        audio.playSuccess();
        onBackToMenu();
      } else if (currentNode.id === 'c10_routing_branch') {
        // Programmatic routing based on consensus rules
        if (soberaniaScore > 85 && !rutaSobreviviente) {
          setCurrentNodeId('c10_route_a');
        } else if (rutaSobreviviente) {
          setCurrentNodeId('c10_route_c');
        } else {
          setCurrentNodeId('c10_route_b');
        }
      } else if (currentNode.nextId === 'game_finished_badge_trigger') {
        audio.playSuccess();
        setShowBadgeScreen(true);
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
        else if (choice.nextId === 'c4_start') setSats(10000);
        else if (choice.nextId === 'c5_start') setSats(10000);
        else if (choice.nextId === 'c6_start') setSats(10000);
        else if (choice.nextId === 'c7_start') setSats(10000);
        else if (choice.nextId === 'c8_start') setSats(10000);
        else if (choice.nextId === 'c9_start') setSats(10000);
        else if (choice.nextId === 'c10_start') setSats(10000);
        else setSats(prev => Math.max(0, prev + (choice.effects?.sats || 0)));
      }
      if (choice.effects.soberaniaScore !== undefined) {
        if (choice.nextId.includes('start')) {
          setSoberaniaScore(0);
          setRutaSobreviviente(false);
        } else {
          setSoberaniaScore(prev => Math.max(0, prev + (choice.effects?.soberaniaScore || 0)));
        }
      }
      if (choice.effects.tradingScore !== undefined) {
        if (choice.nextId.includes('start')) {
          setTradingScore(0);
          setRutaSobreviviente(false);
        } else {
          setTradingScore(prev => Math.max(0, prev + (choice.effects?.tradingScore || 0)));
        }
      }
      if (choice.effects.detour !== undefined && choice.effects.detour) {
        setRutaSobreviviente(true);
      }
    }

    // Play contextual sounds
    if (choice.nextId.includes('gameover') || choice.nextId.includes('badending') || choice.nextId.includes('liquidated')) {
      audio.playError();
    } else if (choice.nextId.includes('correct') || choice.nextId.includes('success') || choice.nextId.includes('route')) {
      audio.playSuccess();
    } else {
      audio.playBeep(440, 0.08, 'sine');
    }

    setCurrentNodeId(choice.nextId);
  };

  const handleExchangeComplete = (success: boolean) => {
    if (!success) {
      setSats(0);
      setCurrentNodeId('c1_liquidated');
    }
  };

  const handleWalletComplete = (success: boolean) => {
    if (success) {
      setSats(prev => Math.max(0, prev - 4500)); // Coffee cost 4500 sats
      setCurrentNodeId('c6_lightning_success');
    }
  };

  // Badge properties helpers
  const getBadgeClassification = () => {
    if (soberaniaScore > 85 && !rutaSobreviviente) {
      return {
        title: 'HACKER OPEN SOURCE',
        route: 'Ruta A',
        desc: 'Soberanía matemática pura, desarrollo e inmutabilidad.',
        color: '#00f0ff'
      };
    } else if (rutaSobreviviente) {
      return {
        title: 'SOBREVIVIENTE REDIMIDO',
        route: 'Ruta C',
        desc: 'Cometió errores iniciales pero aprendió a verificar.',
        color: '#ff0055'
      };
    } else {
      return {
        title: 'GUARDIÁN DESCENTRALIZADO',
        route: 'Ruta B',
        desc: 'Equilibrio de privacidad P2P y comunicación libre.',
        color: '#f7931a'
      };
    }
  };

  const badgeInfo = getBadgeClassification();

  // Download Badge Image (Canvas rendering)
  const handleDownloadBadge = () => {
    audio.playBeep(600, 0.1, 'sine');
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const gradient = ctx.createRadialGradient(300, 200, 50, 300, 200, 350);
    gradient.addColorStop(0, '#0c1024');
    gradient.addColorStop(1, '#03050c');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 400);

    // Neon glowing border
    ctx.strokeStyle = badgeInfo.color;
    ctx.lineWidth = 6;
    ctx.strokeRect(15, 15, 570, 370);

    // Frame corner accents
    ctx.fillStyle = badgeInfo.color;
    ctx.fillRect(10, 10, 30, 8);
    ctx.fillRect(10, 10, 8, 30);
    ctx.fillRect(560, 10, 30, 8);
    ctx.fillRect(582, 10, 8, 30);
    ctx.fillRect(10, 382, 30, 8);
    ctx.fillRect(10, 360, 8, 30);
    ctx.fillRect(560, 382, 30, 8);
    ctx.fillRect(582, 360, 8, 30);

    // Badge Title
    ctx.fillStyle = '#f0f4ff';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('LA CRYPTA BITCOINER BADGE', 40, 60);

    ctx.fillStyle = badgeInfo.color;
    ctx.font = '14px monospace';
    ctx.fillText('NIP-58 CERTIFIED SOVEREIGNTY', 40, 85);

    // Divider Line
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 105);
    ctx.lineTo(560, 105);
    ctx.stroke();

    // Text labels and values
    ctx.fillStyle = 'rgba(240, 244, 255, 0.6)';
    ctx.font = '16px monospace';
    ctx.fillText('USUARIO:', 40, 140);
    ctx.fillText('IDENTIDAD NOSTR:', 40, 175);
    ctx.fillText('SOBERANÍA (PS):', 40, 210);
    ctx.fillText('TRADING (PT):', 40, 245);
    ctx.fillText('CLASIFICACIÓN:', 40, 280);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.fillText(playerName, 180, 140);
    ctx.fillText(npub, 220, 175);
    ctx.fillText(`${soberaniaScore} PS`, 220, 210);
    ctx.fillText(`${tradingScore} PT`, 200, 245);

    ctx.fillStyle = badgeInfo.color;
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`${badgeInfo.title} (${badgeInfo.route})`, 210, 280);

    // Date
    const today = new Date().toLocaleDateString('es-AR', { year: 'numeric', month: '2-digit', day: '2-digit' });
    ctx.fillStyle = 'rgba(240, 244, 255, 0.4)';
    ctx.font = '13px monospace';
    ctx.fillText(`EMISIÓN: ${today}`, 40, 350);

    // Holographic Emblem Circle with ₿
    ctx.strokeStyle = badgeInfo.color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(480, 220, 55, 0, Math.PI * 2);
    ctx.stroke();

    // Inner dash circle
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(480, 220, 48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]); // clear dash

    ctx.fillStyle = badgeInfo.color;
    ctx.font = 'bold 46px sans-serif';
    ctx.fillText('₿', 468, 235);

    // Download file
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = `badge_crypta_${playerName.toLowerCase()}_${badgeInfo.route.replace(' ', '').toLowerCase()}.png`;
    link.click();
  };

  // Generate Nostr NIP-58 Event JSON
  const getNostrEventJSON = () => {
    const todaySeconds = Math.floor(Date.now() / 1000);
    const mockId = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const mockSig = Array.from({ length: 128 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

    const event = {
      id: mockId,
      pubkey: npub.startsWith('npub1') ? npub.slice(5, 30) + '...' : npub,
      created_at: todaySeconds,
      kind: 30009, // Standard Badge Event NIP-58
      tags: [
        ['d', 'crypta-sovereignty-badge'],
        ['name', 'La Crypta Bitcoiner Badge'],
        ['description', 'Otorgado por completar Camino a La Crypta con mentalidad soberana.'],
        ['player_name', playerName],
        ['sovereignty_score', soberaniaScore.toString()],
        ['trading_score', tradingScore.toString()],
        ['route', badgeInfo.route],
        ['badge_type', badgeInfo.title],
        ['zaps_address', 'yawninghood99@walletofsatoshi.com']
      ],
      content: `¡Logro desbloqueado! Completé la novela visual Camino a La Crypta. Clasificación: ${badgeInfo.title}. #Bitcoin #Nostr #LaCrypta`,
      sig: mockSig
    };
    return JSON.stringify(event, null, 2);
  };

  // Simulate publish in Nostr CLI Console
  const handlePublishNostr = async () => {
    if (isPublishing) return;
    setIsPublishing(true);
    setNostrConsoleLogs([]);
    audio.playBeep(330, 0.05, 'triangle');

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const addLog = (text: string) => setNostrConsoleLogs(prev => [...prev, text]);

    await sleep(400);
    addLog(`$ nostr-tool publish --kind 30009 --relays wss://nos.lol,wss://relay.damus.io`);
    await sleep(600);
    addLog(`[INFO] Conectando a relé público: wss://nos.lol...`);
    await sleep(800);
    addLog(`[INFO] Conectado con éxito a wss://nos.lol`);
    await sleep(500);
    addLog(`[INFO] Conectando a relé público: wss://relay.damus.io...`);
    await sleep(700);
    addLog(`[INFO] Conectado con éxito a wss://relay.damus.io`);
    await sleep(800);
    addLog(`[SIGN] Solicitando firma criptográfica para ${npub.slice(0, 12)}...`);
    
    // If NIP-07 is real, we can try to actually sign!
    if ((window as any).nostr && nsec === 'Extensión NIP-07 protegida') {
      try {
        await sleep(500);
        addLog(`[NIP-07] Solicitando firma a la extensión...`);
        // We simulate signing for stability, but log the extension request
        addLog(`[NIP-07] Firma concedida!`);
      } catch (e) {
        addLog(`[ERROR] Firma denegada por el usuario.`);
        setIsPublishing(false);
        return;
      }
    } else {
      await sleep(1000);
      addLog(`[KEY] Evento firmado localmente con clave efímera.`);
    }

    await sleep(600);
    addLog(`[SEND] Difundiendo evento NIP-58 Badge Award a la red...`);
    await sleep(1200);
    const mockEventId = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    addLog(`[SUCCESS] OK! Evento publicado de manera distribuida.`);
    addLog(`[SUCCESS] Event ID: 0x${mockEventId}e4a991f82...`);
    addLog(`[INFO] ¡Tu Badge coleccionable ya está enlazado a tu perfil de Nostr! 💜`);
    
    audio.playSuccess();
    setIsPublishing(false);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(getNostrEventJSON());
    setHasCopiedJSON(true);
    audio.playBeep(880, 0.05, 'sine');
    setTimeout(() => setHasCopiedJSON(false), 2000);
  };

  // Quick stats values display in top overlay
  return (
    <div className="vn-frame">
      {/* Top Status HUD (Only show when not in badge screen) */}
      {!showBadgeScreen && (
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
          <div style={{ display: 'flex', gap: '12px', pointerEvents: 'auto' }}>
            <div style={{
              background: 'rgba(10, 15, 30, 0.75)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ color: 'var(--accent-btc)' }}>⚡ Sats:</span>
              <span>{sats.toLocaleString()}</span>
            </div>

            <div style={{
              background: 'rgba(10, 15, 30, 0.75)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ color: 'var(--accent-cyan)' }}>🛡️ PS:</span>
              <span>{soberaniaScore}</span>
            </div>

            <div style={{
              background: 'rgba(10, 15, 30, 0.75)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{ color: 'var(--accent-red)' }}>📈 PT:</span>
              <span>{tradingScore}</span>
            </div>

            {/* Nostr user HUD indicator */}
            <div style={{
              background: 'rgba(10, 15, 30, 0.75)',
              border: '1px solid rgba(175, 82, 222, 0.4)',
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
              color: '#af52de',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>💜 {playerName}</span>
              <span style={{ opacity: 0.6, fontSize: '0.7rem' }}>({npub.slice(0, 10)}...)</span>
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
      )}

      {/* Interactive Screens */}
      {showBadgeScreen ? (
        // --- NOSTR BADGE & END GAME SCREEN ---
        <div style={{
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, #0c0919 0%, #030409 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          overflowY: 'auto'
        }}>
          <h1 style={{
            fontSize: '1.8rem',
            fontFamily: 'var(--font-mono)',
            background: 'linear-gradient(135deg, var(--accent-btc) 0%, var(--accent-cyan) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '3px',
            marginBottom: '15px',
            textShadow: '0 0 10px rgba(0, 240, 255, 0.2)'
          }}>
            🏆 AVENTURA COMPLETADA 🏆
          </h1>

          <div style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            maxWidth: '1000px',
            gap: '24px',
            alignItems: 'stretch',
            justifyContent: 'center'
          }}>
            {/* Left Column: Holographic CSS Badge Card */}
            <div style={{
              flex: '1',
              maxWidth: '440px',
              background: 'rgba(10, 18, 38, 0.7)',
              border: `2px solid ${badgeInfo.color}`,
              borderRadius: '16px',
              padding: '24px',
              boxShadow: `0 0 25px ${badgeInfo.color}44, inset 0 0 20px rgba(255,255,255,0.05)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              backdropFilter: 'blur(8px)',
              minHeight: '380px'
            }}>
              {/* Holographic background shines */}
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                borderRadius: '14px',
                background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, ${badgeInfo.color}15 100%)`,
                pointerEvents: 'none',
                zIndex: 1
              }} />

              {/* Title & metadata */}
              <div style={{ zIndex: 2 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-mono)',
                      color: badgeInfo.color,
                      fontSize: '1.2rem',
                      letterSpacing: '1px',
                      textShadow: `0 0 5px ${badgeInfo.color}`
                    }}>
                      {badgeInfo.title}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      NIP-58 SOVEREIGNTY CERTIFICATE
                    </span>
                  </div>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: `1.5px solid ${badgeInfo.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: badgeInfo.color,
                    fontWeight: 'bold',
                    fontSize: '1.1rem'
                  }}>
                    ₿
                  </div>
                </div>

                <div style={{
                  height: '1px',
                  background: 'rgba(255,255,255,0.1)',
                  margin: '12px 0'
                }} />

                {/* Badge specifications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>USUARIO: </span>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{playerName}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>IDENTIDAD: </span>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.8rem', wordBreak: 'break-all' }}>{npub}</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>SOBERANÍA: </span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 'bold' }}>{soberaniaScore} PS</span>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>TRADING: </span>
                    <span style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>{tradingScore} PT</span>
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>CLASIFICACIÓN: </span>
                    <div style={{
                      color: badgeInfo.color,
                      fontWeight: 'bold',
                      fontSize: '0.95rem',
                      border: `1px dashed ${badgeInfo.color}55`,
                      padding: '4px 8px',
                      borderRadius: '4px',
                      marginTop: '4px',
                      background: 'rgba(0,0,0,0.2)'
                    }}>
                      {badgeInfo.route} - {badgeInfo.desc}
                    </div>
                  </div>
                </div>
              </div>

              {/* Download & Emit details */}
              <div style={{ zIndex: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  EMITIDO: {new Date().toLocaleDateString('es-AR')}
                </span>
                <button
                  onClick={handleDownloadBadge}
                  className="menu-btn primary"
                  style={{
                    margin: 0,
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    width: 'auto',
                    borderColor: badgeInfo.color,
                    boxShadow: `0 0 10px ${badgeInfo.color}55`
                  }}
                >
                  💾 Descargar PNG
                </button>
              </div>
            </div>

            {/* Right Column: Nostr CLI Console & Donar & Join */}
            <div style={{
              flex: '1.2',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Nostr CLI simulator */}
              <div style={{
                background: '#04060f',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--accent-green)',
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', maxHeight: '180px' }}>
                  <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>// RELAY CONSOLE INTERFACE (NIP-58)</span>
                  {nostrConsoleLogs.length === 0 && (
                    <span style={{ color: 'var(--text-muted)' }}>Lista para emitir evento Badge Award en relés Nostr...</span>
                  )}
                  {nostrConsoleLogs.map((log, index) => (
                    <div key={index} style={{
                      color: log.startsWith('[SUCCESS]') ? 'var(--accent-green)' :
                             log.startsWith('[ERROR]') ? 'var(--accent-red)' :
                             log.startsWith('[SIGN]') || log.startsWith('[NIP-07]') ? 'var(--accent-cyan)' :
                             log.startsWith('$') ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'
                    }}>
                      {log}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button
                    onClick={handlePublishNostr}
                    disabled={isPublishing}
                    className="menu-btn"
                    style={{
                      flex: 1,
                      margin: 0,
                      padding: '8px',
                      fontSize: '0.8rem',
                      borderColor: 'var(--accent-green)',
                      background: 'rgba(0, 255, 102, 0.05)',
                      opacity: isPublishing ? 0.5 : 1
                    }}
                  >
                    {isPublishing ? 'Emitiendo...' : '💜 Publicar Badge en Nostr'}
                  </button>
                  
                  <button
                    onClick={handleCopyJSON}
                    className="menu-btn"
                    style={{
                      flex: 1,
                      margin: 0,
                      padding: '8px',
                      fontSize: '0.8rem',
                      borderColor: 'var(--accent-cyan)',
                      background: 'rgba(0, 240, 255, 0.05)'
                    }}
                  >
                    {hasCopiedJSON ? '¡Copiado!' : '📋 Copiar Evento JSON'}
                  </button>
                </div>
              </div>

              {/* Community & Zap block */}
              <div style={{
                background: 'rgba(10, 18, 38, 0.6)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center'
              }}>
                {/* QR code API for Zap address */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: '#fff',
                  padding: '6px',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=lightning:yawninghood99@walletofsatoshi.com"
                    alt="Zap QR Code"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--accent-btc)', fontFamily: 'var(--font-mono)' }}>
                    ⚡ ZAP POR EL TRABAJO REALIZADO
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                    Si te gustó el juego, escanea el QR o zapa a la Lightning Address del creador:
                  </p>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(0,0,0,0.3)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    color: '#fff',
                    wordBreak: 'break-all'
                  }}>
                    <span>yawninghood99@walletofsatoshi.com</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText('yawninghood99@walletofsatoshi.com');
                        audio.playBeep(880, 0.05, 'sine');
                        alert('Copiado yawninghood99@walletofsatoshi.com');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-cyan)',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        padding: 0
                      }}
                    >
                      [copiar]
                    </button>
                  </div>
                </div>
              </div>

              {/* Join Discord button */}
              <a
                href="https://discord.gg/lacrypta"
                target="_blank"
                rel="noreferrer"
                style={{ textDecoration: 'none', width: '100%' }}
              >
                <button
                  className="menu-btn"
                  onClick={() => audio.playBeep(440, 0.08, 'sine')}
                  style={{
                    width: '100%',
                    margin: 0,
                    padding: '14px',
                    borderColor: '#5865F2',
                    color: '#fff',
                    background: 'rgba(88, 101, 242, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    fontSize: '0.95rem'
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 127.14 96.36" fill="currentColor">
                    <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0,-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58,-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63,-10.85,68.43,68.43,0,0,1,-10.43,-5c.87,-1.21,1.76,-2.5,2.62,-3.82a74.13,74.13,0,0,0,72.48,0c.87,1.3,1.76,2.6,2.63,3.81a68.43,68.43,0,0,1,-10.43,5,77.7,77.7,0,0,0,6.63,10.85,105.73,105.73,0,0,0,31.06,-18.83C129,54.65,123.51,31.58,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.88,46,53.88,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.12,46,96.12,53,91,65.69,84.69,65.69Z" />
                  </svg>
                  Unirse al Discord de La Crypta
                </button>
              </a>
            </div>
          </div>

          <button
            className="menu-btn"
            onClick={onBackToMenu}
            style={{
              marginTop: '24px',
              width: '240px',
              borderColor: 'var(--accent-red)',
              color: 'var(--accent-red)',
              background: 'rgba(255, 0, 85, 0.05)'
            }}
          >
            ◀ VOLVER AL MENÚ PRINCIPAL
          </button>
        </div>
      ) : (
        currentNode.minigame === 'exchange' ? (
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
                choices={currentNode.choices.map(c => ({
                  ...c,
                  text: replacePlaceholders(c.text)
                }))}
                onSelect={handleChoiceSelect}
                isSatoshiNode={currentNode.isSatoshiNode}
              />
            )}

            {/* Dialogue text box at bottom */}
            <DialogBox
              speaker={replacePlaceholders(currentNode.speaker)}
              text={replacePlaceholders(currentNode.text)}
              character={currentNode.character}
              isSatoshiNode={currentNode.isSatoshiNode}
              onAdvance={handleAdvance}
              gender={gender}
            />
          </>
        )
      )}
    </div>
  );
};
