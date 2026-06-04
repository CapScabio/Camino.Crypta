import React from 'react';

interface SceneScreenProps {
  background: string;
  character: string | null;
  expression: string | null;
  isPanic: boolean;
}

// Background SVGs drawn inline for robust loading & high-fidelity styling
const BackgroundVector: React.FC<{ name: string }> = ({ name }) => {
  if (name === 'exchange_room') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 1280 720" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Background Dark Room */}
        <rect width="1280" height="720" fill="#04060f" />
        <path d="M 0 0 L 1280 720 M 1280 0 L 0 720" stroke="rgba(255, 255, 255, 0.01)" strokeWidth="1" />
        {/* Trading Desk Monitors */}
        <rect x="140" y="80" width="460" height="300" rx="10" fill="#090e1a" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="2" />
        <rect x="680" y="80" width="460" height="300" rx="10" fill="#090e1a" stroke="rgba(0, 240, 255, 0.2)" strokeWidth="2" />
        <rect x="390" y="400" width="500" height="260" rx="10" fill="#060912" stroke="rgba(0, 240, 255, 0.15)" strokeWidth="2" />
        
        {/* Red and Green Candles on Charts */}
        {/* Monitor Left: Shitcoin Charts plunging */}
        <path d="M 160 300 L 220 240 L 280 280 L 340 180 L 400 290 L 460 330 L 520 350" fill="none" stroke="#ff0055" strokeWidth="3" />
        <rect x="210" y="220" width="15" height="40" fill="#ff0055" opacity="0.6" />
        <rect x="330" y="160" width="15" height="50" fill="#00ff66" opacity="0.6" />
        <rect x="450" y="300" width="15" height="60" fill="#ff0055" opacity="0.6" />
        {/* Monitor Right: Green Candlesticks */}
        <path d="M 700 320 L 760 280 L 820 220 L 880 240 L 940 140 L 1000 120 L 1060 90" fill="none" stroke="#00ff66" strokeWidth="3" />
        <rect x="750" y="260" width="15" height="50" fill="#00ff66" opacity="0.6" />
        <rect x="930" y="120" width="15" height="60" fill="#00ff66" opacity="0.6" />
        
        {/* Ambient room items */}
        <circle cx="100" cy="500" r="15" fill="#f7931a" opacity="0.05" />
        <text x="640" y="50" textAnchor="middle" fill="rgba(0, 240, 255, 0.3)" fontSize="14" fontFamily="Share Tech Mono"> Nico's Desk // Terminal C4 </text>
      </svg>
    );
  }

  if (name === 'dream_satoshi') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 1280 720" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Dream Space */}
        <defs>
          <linearGradient id="dreamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#030510" />
            <stop offset="50%" stopColor="#080721" />
            <stop offset="100%" stopColor="#1a0b36" />
          </linearGradient>
        </defs>
        <rect width="1280" height="720" fill="url(#dreamGrad)" />
        
        {/* Binary Matrix Code and Formulas */}
        <g fill="rgba(247, 147, 26, 0.12)" fontSize="18" fontFamily="Share Tech Mono">
          <text x="100" y="100">01000111 01000101 01001110 01000101 01010011 01001001 01010011</text>
          <text x="100" y="150">SHA-256(SHA-256(BlockHeader))</text>
          <text x="800" y="200">21,000,000 LIMIT</text>
          <text x="900" y="450">GENESIS BLOCK: 2009-01-03</text>
          <text x="200" y="600">Proof-of-Work (PoW)</text>
        </g>
        
        {/* Big Glowing Orange Bitcoin Logo in background */}
        <circle cx="640" cy="300" r="140" fill="none" stroke="rgba(247, 147, 26, 0.15)" strokeWidth="6" />
        <path d="M 640 210 L 640 390 M 610 240 L 680 240 M 610 300 L 690 300 M 610 360 L 680 360" stroke="rgba(247, 147, 26, 0.12)" strokeWidth="15" strokeLinecap="round" />
        
        {/* Floating particles */}
        <circle cx="250" cy="180" r="3" fill="#f7931a" opacity="0.3" />
        <circle cx="950" cy="120" r="5" fill="#00f0ff" opacity="0.2" />
        <circle cx="450" cy="550" r="4" fill="#f7931a" opacity="0.4" />
      </svg>
    );
  }

  if (name === 'coffee_shop') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 1280 720" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Cafe Backdrop */}
        <rect width="1280" height="720" fill="#0e0d16" />
        
        {/* Cozy Wooden Bar Counter */}
        <rect x="0" y="480" width="1280" height="240" fill="#2d1c13" />
        <rect x="0" y="480" width="1280" height="15" fill="#f7931a" opacity="0.15" />
        
        {/* Coffee Machine & Shelves */}
        <rect x="80" y="200" width="300" height="280" fill="#1b1c24" rx="5" />
        <circle cx="160" cy="400" r="18" fill="#303240" />
        <circle cx="280" cy="400" r="18" fill="#303240" />
        
        {/* Neon Sign "SATOSHI CAFE" */}
        <rect x="520" y="80" width="240" height="80" rx="10" fill="#06060c" stroke="#00f0ff" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))' }} />
        <text x="640" y="130" textAnchor="middle" fill="#00f0ff" fontSize="24" fontFamily="Share Tech Mono" fontWeight="bold" style={{ filter: 'drop-shadow(0 0 5px rgba(0,240,255,0.8))' }}>⚡ LIGHTNING CAFE</text>
        
        {/* Background window */}
        <rect x="880" y="120" width="320" height="300" rx="12" fill="#04040a" stroke="rgba(255,255,255,0.05)" />
        {/* City outline in window */}
        <path d="M 900 420 L 900 320 L 940 300 L 980 340 L 980 280 L 1040 310 L 1100 240 L 1140 280 L 1140 420 Z" fill="#090912" />
        
        {/* Warm hanging lights */}
        <line x1="450" y1="0" x2="450" y2="180" stroke="#5d493a" strokeWidth="2" />
        <circle cx="450" cy="180" r="12" fill="#ffe29c" style={{ filter: 'drop-shadow(0 0 10px #ffe29c)' }} />
        
        <line x1="820" y1="0" x2="820" y2="180" stroke="#5d493a" strokeWidth="2" />
        <circle cx="820" cy="180" r="12" fill="#ffe29c" style={{ filter: 'drop-shadow(0 0 10px #ffe29c)' }} />
      </svg>
    );
  }

  if (name === 'la_crypta_door') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 1280 720" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Alleyway dark brick wall */}
        <rect width="1280" height="720" fill="#06060c" />
        {/* Brick patterns */}
        <path d="M 100 200 H 200 M 150 250 H 250 M 50 300 H 150 M 1000 150 H 1100 M 1050 200 H 1150" stroke="rgba(255,255,255,0.03)" strokeWidth="3" />
        
        {/* Futuristic door */}
        <rect x="440" y="160" width="400" height="560" fill="#141824" stroke="rgba(255, 0, 85, 0.4)" strokeWidth="4" rx="4" />
        
        {/* Door details */}
        <line x1="640" y1="160" x2="640" y2="720" stroke="#080a0f" strokeWidth="6" />
        <rect x="520" y="320" width="240" height="120" fill="#0b0e16" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="2" rx="8" />
        
        {/* Neon Light Tubes above door */}
        <line x1="400" y1="100" x2="880" y2="100" stroke="#ff0055" strokeWidth="8" strokeLinecap="round" style={{ filter: 'drop-shadow(0 0 12px #ff0055)' }} />
        <text x="640" y="70" textAnchor="middle" fill="#ff0055" fontSize="22" fontFamily="Share Tech Mono" fontWeight="bold" letterSpacing="4" style={{ filter: 'drop-shadow(0 0 8px #ff0055)' }}>LA CRYPTA</text>
        
        {/* Access Terminal panel */}
        <rect x="880" y="360" width="80" height="140" fill="#1f2336" stroke="rgba(0,240,255,0.4)" strokeWidth="2" rx="4" />
        <circle cx="920" cy="400" r="15" fill="#ff0055" style={{ filter: 'drop-shadow(0 0 5px #ff0055)' }} />
      </svg>
    );
  }

  if (name === 'la_crypta_interior') {
    return (
      <svg width="100%" height="100%" viewBox="0 0 1280 720" style={{ position: 'absolute', top: 0, left: 0 }}>
        {/* Pub bar interior */}
        <rect width="1280" height="720" fill="#0a050e" />
        
        {/* Neon ambient lines */}
        <path d="M 0 140 H 1280 M 0 200 H 1280" stroke="rgba(255, 0, 85, 0.2)" strokeWidth="3" />
        <path d="M 200 0 L 200 400 M 1080 0 L 1080 400" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="2" />
        
        {/* Cyber Bar Counter */}
        <rect x="0" y="440" width="1280" height="280" fill="#130919" />
        <rect x="0" y="440" width="1280" height="15" fill="#ff0055" style={{ filter: 'drop-shadow(0 0 10px #ff0055)' }} />
        
        {/* BACKGROUND EXTRA: Pirate Captain and Bear drinking beers */}
        <g opacity="0.35">
          {/* Captain Silhouette (Left side of background) */}
          <path d="M 220 440 L 220 320 Q 230 280 250 260 H 300 Q 320 280 330 320 L 330 440 Z" fill="#2d153b" />
          {/* Pirate Tricorne hat */}
          <path d="M 210 260 Q 275 220 340 260 L 275 240 Z" fill="#3f2150" />
          {/* Beer Mug in hand */}
          <rect x="310" y="340" width="25" height="35" rx="3" fill="#ffe29c" />
          <path d="M 335 345 H 345 V 370 H 335 Z" fill="#ffe29c" />
          
          {/* Bear Silhouette (Right side of background, same size/height) */}
          {/* Bear body */}
          <path d="M 370 440 L 370 320 Q 380 270 410 260 H 460 Q 490 270 500 320 L 500 440 Z" fill="#201a35" />
          {/* Bear ears */}
          <circle cx="395" cy="265" r="15" fill="#201a35" />
          <circle cx="475" cy="265" r="15" fill="#201a35" />
          {/* Beer Mug in hand */}
          <rect x="350" y="340" width="25" height="35" rx="3" fill="#ffe29c" />
          <path d="M 350 345 H 340 V 370 H 350 Z" fill="#ffe29c" />
          
          {/* Table between them */}
          <rect x="300" y="390" width="100" height="50" fill="#130919" stroke="rgba(255, 255, 255, 0.05)" />
          <text x="350" y="420" textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="12">CHATTING</text>
        </g>
        
        {/* Cyberpunk Arcade cabinet on right */}
        <rect x="940" y="180" width="180" height="260" fill="#1a0c24" stroke="rgba(0, 240, 255, 0.3)" strokeWidth="2" rx="4" />
        <rect x="960" y="210" width="140" height="90" fill="#000" stroke="rgba(255, 0, 85, 0.4)" strokeWidth="1" />
        <polygon points="960,330 1120,330 1130,360 950,360" fill="#0d0412" />
        {/* Glowing screen effect */}
        <text x="1030" y="260" textAnchor="middle" fill="#00f0ff" fontSize="16" fontFamily="Share Tech Mono" style={{ filter: 'drop-shadow(0 0 3px #00f0ff)' }}>ZAPITOS</text>

        {/* Floating Neon Signboard */}
        <rect x="520" y="50" width="240" height="70" rx="8" fill="#0d0412" stroke="#ff0055" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 10px #ff0055)' }} />
        <text x="640" y="92" textAnchor="middle" fill="#ff0055" fontSize="24" fontFamily="Share Tech Mono" fontWeight="bold" letterSpacing="2">LA HACKATON</text>
      </svg>
    );
  }

  return <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />;
};

// Character Avatar SVG Sprites
const CharacterSprite: React.FC<{ name: string; expression: string }> = ({ name, expression }) => {
  if (name === 'nico') {
    return (
      <svg width="280" height="420" viewBox="0 0 200 300" style={{ pointerEvents: 'none' }}>
        {/* Nico Anime Character */}
        {/* Hair Back */}
        <path d="M 50 140 Q 100 20 150 140 Z" fill="#202430" />
        {/* Head/Face */}
        <rect x="60" y="80" width="80" height="80" rx="30" fill="#ffe0cc" />
        
        {/* Hair Front bangs */}
        <path d="M 55 90 C 70 70, 85 90, 85 90 C 95 70, 110 95, 110 95 C 120 70, 145 90, 145 90" fill="#202430" stroke="#202430" strokeWidth="2" />
        
        {/* Eyes based on expression */}
        {expression === 'panico' ? (
          <>
            {/* Panic round eyes */}
            <circle cx="85" cy="115" r="10" fill="white" stroke="#202430" strokeWidth="2" />
            <circle cx="85" cy="115" r="3" fill="#202430" />
            <circle cx="115" cy="115" r="10" fill="white" stroke="#202430" strokeWidth="2" />
            <circle cx="115" cy="115" r="3" fill="#202430" />
            {/* Sweat drop */}
            <path d="M 130 95 Q 125 105 130 110 Q 135 105 130 95" fill="#00f0ff" />
          </>
        ) : expression === 'concentrado' ? (
          <>
            {/* Focused slanted eyes */}
            <path d="M 75 110 L 90 115" stroke="#202430" strokeWidth="3" />
            <path d="M 125 110 L 110 115" stroke="#202430" strokeWidth="3" />
            <ellipse cx="85" cy="120" rx="6" ry="4" fill="#304060" />
            <ellipse cx="115" cy="120" rx="6" ry="4" fill="#304060" />
          </>
        ) : (
          <>
            {/* Normal / Happy eyes */}
            <ellipse cx="85" cy="115" rx="6" ry="8" fill="#2d3345" />
            <ellipse cx="115" cy="115" rx="6" ry="8" fill="#2d3345" />
            <circle cx="87" cy="112" r="2" fill="white" />
            <circle cx="117" cy="112" r="2" fill="white" />
          </>
        )}

        {/* Mouth based on expression */}
        {expression === 'happy' ? (
          <path d="M 85 138 Q 100 152 115 138 Z" fill="#ff9999" stroke="#202430" strokeWidth="2" />
        ) : expression === 'panico' ? (
          <rect x="90" y="132" width="20" height="15" rx="5" fill="#ff6666" stroke="#202430" strokeWidth="2" />
        ) : (
          <path d="M 90 138 Q 100 142 110 138" stroke="#202430" strokeWidth="2" fill="none" />
        )}

        {/* Body Hoodie */}
        <path d="M 40 220 C 50 180, 150 180, 160 220 L 170 300 H 30 Z" fill="#4d5a80" />
        {/* Draw a subtle BTC Badge on Hoodie */}
        <circle cx="100" cy="225" r="14" fill="#f7931a" />
        <text x="100" y="230" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">B</text>
      </svg>
    );
  }

  if (name === 'shitcoin_bro') {
    return (
      <svg width="280" height="420" viewBox="0 0 200 300" style={{ pointerEvents: 'none' }}>
        {/* Shitcoin Bro */}
        <rect x="60" y="80" width="80" height="80" rx="25" fill="#ffe0cc" />
        {/* Slick blond hair */}
        <path d="M 50 90 Q 100 30 150 90 L 140 70 L 60 70 Z" fill="#ffcc00" />
        {/* Black Sunglasses */}
        <polygon points="65,105 100,105 95,120 70,120" fill="#111" />
        <polygon points="105,105 135,105 130,120 110,120" fill="#111" />
        <line x1="100" y1="108" x2="105" y2="108" stroke="#111" strokeWidth="2" />
        {/* Smug mouth */}
        <path d="M 92 142 Q 102 135 112 140" stroke="#202430" strokeWidth="2.5" fill="none" />
        {/* Flashy Golden Jacket */}
        <path d="M 40 200 C 50 170, 150 170, 160 200 L 170 300 H 30 Z" fill="#ffd700" />
        {/* Gold chains */}
        <path d="M 80 180 Q 100 205 120 180" fill="none" stroke="#ffaa00" strokeWidth="4" />
      </svg>
    );
  }

  if (name === 'satoshi') {
    return (
      <svg width="280" height="420" viewBox="0 0 200 300" style={{ pointerEvents: 'none' }}>
        {/* Satoshi Glowing Shadow Sprite */}
        <defs>
          <radialGradient id="satGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(247, 147, 26, 0.4)" />
            <stop offset="100%" stopColor="rgba(247, 147, 26, 0)" />
          </radialGradient>
        </defs>
        {/* Back Aura */}
        <circle cx="100" cy="150" r="100" fill="url(#satGlow)" />
        {/* Glitched Binary silhouette */}
        <path d="M 60 80 Q 100 40 140 80 L 150 170 C 130 160, 70 160, 50 170 Z" fill="#070913" stroke="#f7931a" strokeWidth="1" />
        <path d="M 40 220 C 50 180, 150 180, 160 220 L 175 300 H 25 Z" fill="#070913" stroke="#f7931a" strokeWidth="1.5" />
        {/* Glowing Matrix Eyes */}
        <circle cx="85" cy="95" r="3" fill="#f7931a" style={{ filter: 'drop-shadow(0 0 3px #f7931a)' }} />
        <circle cx="115" cy="95" r="3" fill="#f7931a" style={{ filter: 'drop-shadow(0 0 3px #f7931a)' }} />
      </svg>
    );
  }

  if (name === 'barista') {
    return (
      <svg width="280" height="420" viewBox="0 0 200 300" style={{ pointerEvents: 'none' }}>
        {/* Valeria Barista */}
        {/* Red hair bun */}
        <circle cx="100" cy="65" r="22" fill="#d9534f" />
        <rect x="60" y="80" width="80" height="80" rx="30" fill="#ffd1b3" />
        <path d="M 58 100 C 62 80, 138 80, 142 100" fill="#d9534f" />
        
        {/* Eyes */}
        <ellipse cx="85" cy="115" rx="5" ry="7" fill="#202430" />
        <ellipse cx="115" cy="115" rx="5" ry="7" fill="#202430" />
        {/* Smiley mouth */}
        <path d="M 90 135 Q 100 146 110 135" fill="none" stroke="#202430" strokeWidth="2" />
        
        {/* Apron Body */}
        <path d="M 40 200 C 55 175, 145 175, 160 200 L 170 300 H 30 Z" fill="#677353" />
        <rect x="75" y="200" width="50" height="100" fill="#fff" opacity="0.9" />
        {/* Cup icon on Apron */}
        <path d="M 90 220 H 105 V 232 H 90 Z M 105 222 H 110 V 228 H 105 Z" fill="#677353" />
      </svg>
    );
  }

  if (name === 'gorilla') {
    return (
      <svg width="340" height="460" viewBox="0 0 200 300" style={{ pointerEvents: 'none' }}>
        {/* Red Gorilla from La Crypta */}
        {/* Big chest/shoulders */}
        <path d="M 20 220 Q 100 130 180 220 L 190 300 H 10 Z" fill="#c41c3b" />
        <path d="M 50 200 C 50 170, 150 170, 150 200" fill="#a3142e" />
        
        {/* Head */}
        <circle cx="100" cy="110" r="50" fill="#c41c3b" />
        {/* Face plate (greyish dark red) */}
        <path d="M 70 120 Q 100 90 130 120 Q 130 150 100 155 Q 70 150 70 120 Z" fill="#8c1228" />
        
        {/* Big smiling mouth */}
        <path d="M 85 136 Q 100 148 115 136" fill="none" stroke="white" strokeWidth="3" />
        
        {/* Gorilla eyes */}
        <ellipse cx="90" cy="115" rx="6" ry="8" fill="#111" />
        <ellipse cx="110" cy="115" rx="6" ry="8" fill="#111" />
        <circle cx="92" cy="112" r="1.5" fill="white" />
        <circle cx="112" cy="112" r="1.5" fill="white" />
        
        {/* Bitcoin Cap */}
        <path d="M 60 75 Q 100 45 140 75 Z" fill="#111" />
        <path d="M 70 70 L 150 65 L 145 55 L 75 60 Z" fill="#f7931a" /> {/* orange bill */}
        <text x="100" y="70" textAnchor="middle" fill="#f7931a" fontSize="11" fontWeight="bold">₿</text>

        {/* Sturdy arms */}
        <path d="M 30 200 C 15 230, 25 280, 40 300 M 170 200 C 185 230, 175 280, 160 300" stroke="#c41c3b" strokeWidth="15" strokeLinecap="round" />
      </svg>
    );
  }

  return null;
};

export const SceneScreen: React.FC<SceneScreenProps> = ({ background, character, expression, isPanic }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
      {/* Background Layer */}
      <BackgroundVector name={background} />

      {/* Panic flash screen overlay */}
      <div className={`vn-overlay ${isPanic ? 'panic' : ''}`} />

      {/* Character Sprite Layer */}
      <div className="vn-sprites-container">
        {character && expression && (
          <div className="vn-sprite active talking">
            <CharacterSprite name={character} expression={expression} />
          </div>
        )}
      </div>
    </div>
  );
};
