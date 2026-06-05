import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';

interface DialogBoxProps {
  speaker: string;
  text: string;
  character?: string | null;
  isSatoshiNode?: boolean;
  onAdvance: () => void;
}

const getAvatarUrl = (charName: string) => {
  switch (charName) {
    case 'nico': return '/avatar_nico.png';
    case 'shitcoin_bro': return '/avatar_shitcoin_bro.png';
    case 'satoshi': return '/avatar_satoshi.png';
    case 'barista': return '/avatar_barista.png';
    case 'gorilla': return '/avatar_gorilla.png';
    default: return null;
  }
};

export const DialogBox: React.FC<DialogBoxProps> = ({ speaker, text, character, isSatoshiNode, onAdvance }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const audio = useAudio();
  const indexRef = useRef(0);
  const textRef = useRef(text);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    textRef.current = text;
    indexRef.current = 0;
    setDisplayedText('');
    setIsTyping(true);

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      if (indexRef.current < textRef.current.length) {
        const nextChar = textRef.current.charAt(indexRef.current);
        setDisplayedText(prev => prev + nextChar);
        
        if (nextChar !== ' ') {
          audio.playDialogBeep();
        }
        
        indexRef.current += 1;
      } else {
        setIsTyping(false);
        if (timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    }, 25);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [text]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTyping) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setDisplayedText(text);
      setIsTyping(false);
    } else {
      onAdvance();
    }
  };

  const avatarUrl = character ? getAvatarUrl(character) : null;

  return (
    <div 
      className={`vn-dialog-box ${isSatoshiNode ? 'satoshi-glow' : ''}`} 
      onClick={handleClick}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '20px'
      }}
    >
      {avatarUrl && (
        <div style={{
          width: '90px',
          height: '90px',
          borderRadius: '50%',
          border: `3px solid ${isSatoshiNode ? 'var(--accent-btc)' : 'var(--accent-cyan)'}`,
          overflow: 'hidden',
          flexShrink: 0,
          boxShadow: isSatoshiNode ? 'var(--glow-btc)' : 'var(--glow-cyan)',
          backgroundColor: '#04060f'
        }}>
          <img 
            src={avatarUrl} 
            alt={speaker} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        height: '100%',
        overflow: 'hidden'
      }}>
        <div className="vn-dialog-name">
          {speaker}
        </div>
        <div className="vn-dialog-text">
          {displayedText}
        </div>
      </div>
      
      {!isTyping && (
        <span className="vn-next-indicator">▼</span>
      )}
    </div>
  );
};
