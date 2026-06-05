import React from 'react';

interface SceneScreenProps {
  background: string;
  character: string | null;
  expression: string | null;
  isPanic: boolean;
}

// Background mapping to the high-quality generated PNGs
const getBgUrl = (bgName: string) => {
  switch (bgName) {
    case 'exchange_room':
      return '/bg_exchange.png';
    case 'dream_satoshi':
      return '/bg_dream.png';
    case 'coffee_shop':
      return '/bg_cafe.png';
    case 'la_crypta_door':
      return '/bg_crypta_door.png';
    case 'la_crypta_interior':
      return '/bg_crypta_interior.png';
    case 'game_over_scene':
      return '/bg_gameover.png';
    case 'victory_scene':
      return '/bg_victory.png';
    default:
      return '/bg_exchange.png';
  }
};

export const SceneScreen: React.FC<SceneScreenProps> = ({ background, isPanic }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Background Image Layer */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${getBgUrl(background)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 0.5s ease-in-out'
        }}
      />

      {/* Ambient Red Panic Glow Overlay */}
      <div className={`vn-overlay ${isPanic ? 'panic' : ''}`} />
    </div>
  );
};
