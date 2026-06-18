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
    case 'c1_bg':
      return '/bg_exchange.png';
    case 'c2_bg':
      return '/bg_dream.png';
    case 'c3_bg':
      return '/bg_chapter3.png';
    case 'c4_bg':
      return '/bg_chapter4.png';
    case 'c5_bg':
      return '/bg_chapter5.png';
    case 'c6_bg':
      return '/bg_cafe.png';
    case 'c7_bg':
      return '/bg_chapter7.png';
    case 'c8_bg':
      return '/bg_chapter8.png';
    case 'c9_bg':
      return '/bg_chapter9.png';
    case 'c10_bg':
      return '/bg_chapter10.png';
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
