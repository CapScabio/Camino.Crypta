import React, { useState, useEffect, useRef } from 'react';
import { useAudio } from '../hooks/useAudio';

interface DialogBoxProps {
  speaker: string;
  text: string;
  isSatoshiNode?: boolean;
  onAdvance: () => void;
}

export const DialogBox: React.FC<DialogBoxProps> = ({ speaker, text, isSatoshiNode, onAdvance }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const audio = useAudio();
  const indexRef = useRef(0);
  const textRef = useRef(text);
  const timerRef = useRef<number | null>(null);

  // Sync ref to avoid closure issues in timers
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
        
        // Play dialog sound unless it's a space character
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
    }, 25); // Speed of typewriter (ms per char)

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [text]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTyping) {
      // Skip typing and show whole text
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

  return (
    <div 
      className={`vn-dialog-box ${isSatoshiNode ? 'satoshi-glow' : ''}`} 
      onClick={handleClick}
    >
      <div className="vn-dialog-name">
        {speaker}
      </div>
      <div className="vn-dialog-text">
        {displayedText}
      </div>
      {!isTyping && (
        <span className="vn-next-indicator">▼</span>
      )}
    </div>
  );
};
