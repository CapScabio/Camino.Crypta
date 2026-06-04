import React from 'react';
import type { Choice } from '../data/script';
import { useAudio } from '../hooks/useAudio';

interface ChoiceOverlayProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  isSatoshiNode?: boolean;
}

export const ChoiceOverlay: React.FC<ChoiceOverlayProps> = ({ choices, onSelect, isSatoshiNode }) => {
  const audio = useAudio();

  const handleHover = () => {
    // Soft hover tick
    audio.playBeep(800, 0.02, 'sine');
  };

  return (
    <div className="vn-choices-overlay">
      {choices.map((choice, index) => (
        <button
          key={index}
          className={`vn-choice-btn ${isSatoshiNode ? 'satoshi' : ''}`}
          onMouseEnter={handleHover}
          onClick={() => onSelect(choice)}
        >
          {choice.text}
        </button>
      ))}
    </div>
  );
};
