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

// High-fidelity Anime SVG Characters
const CharacterSprite: React.FC<{ name: string; expression: string }> = ({ name, expression }) => {
  if (name === 'nico') {
    return (
      <svg width="290" height="440" viewBox="0 0 240 320" style={{ pointerEvents: 'none' }}>
        <defs>
          {/* Hair Gradients */}
          <linearGradient id="nicoHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#252a3a" />
            <stop offset="60%" stopColor="#12151e" />
            <stop offset="100%" stopColor="#00f0ff" /> {/* Cyan highlights */}
          </linearGradient>
          {/* Eye Gradients */}
          <linearGradient id="nicoEye" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#005577" />
            <stop offset="100%" stopColor="#00f0ff" />
          </linearGradient>
          {/* Hoodie Gradients */}
          <linearGradient id="nicoHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b4870" />
            <stop offset="100%" stopColor="#1e253c" />
          </linearGradient>
          <filter id="shadowFilter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        <g filter="url(#shadowFilter)">
          {/* Neck */}
          <path d="M 105 150 L 105 180 L 135 180 L 135 150 Z" fill="#ebd2c4" />
          <path d="M 105 150 L 120 170 L 135 150 Z" fill="#d4b7a7" /> {/* Neck Shadow */}

          {/* Head & Face */}
          <path d="M 80 110 Q 70 145 100 160 Q 120 168 140 160 Q 170 145 160 110 Q 155 70 120 70 Q 85 70 80 110 Z" fill="#fce5d8" />

          {/* Blushing */}
          {expression === 'happy' && (
            <>
              <ellipse cx="98" cy="132" rx="10" ry="4" fill="#ffb3b3" opacity="0.6" />
              <ellipse cx="142" cy="132" rx="10" ry="4" fill="#ffb3b3" opacity="0.6" />
            </>
          )}

          {/* Anime Eyes */}
          {expression === 'panico' ? (
            <>
              {/* Panicked wide eyes */}
              <ellipse cx="98" cy="120" rx="12" ry="12" fill="#fff" stroke="#12151e" strokeWidth="2.5" />
              <circle cx="98" cy="120" r="4" fill="#ff0055" />
              <ellipse cx="142" cy="120" rx="12" ry="12" fill="#fff" stroke="#12151e" strokeWidth="2.5" />
              <circle cx="142" cy="120" r="4" fill="#ff0055" />
              {/* Sweating drop */}
              <path d="M 160 90 C 158 98 152 105 155 108 C 158 105 162 98 160 90 Z" fill="#00f0ff" />
              <path d="M 72 95 C 70 103 64 110 67 113 C 70 110 74 103 72 95 Z" fill="#00f0ff" />
            </>
          ) : expression === 'concentrado' ? (
            <>
              {/* Slanted focused eyes */}
              <path d="M 85 112 Q 98 105 110 115" stroke="#12151e" strokeWidth="3" fill="none" strokeLinecap="round" />
              <path d="M 155 112 Q 142 105 130 115" stroke="#12151e" strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx="98" cy="122" rx="7" ry="5" fill="url(#nicoEye)" />
              <ellipse cx="142" cy="122" rx="7" ry="5" fill="url(#nicoEye)" />
              <circle cx="96" cy="120" r="2" fill="#fff" />
              <circle cx="140" cy="120" r="2" fill="#fff" />
            </>
          ) : (
            <>
              {/* Normal/Happy cool anime eyes */}
              <path d="M 85 115 Q 98 108 112 118" stroke="#12151e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M 155 115 Q 142 108 128 118" stroke="#12151e" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <ellipse cx="98" cy="124" rx="8" ry="10" fill="url(#nicoEye)" />
              <ellipse cx="142" cy="124" rx="8" ry="10" fill="url(#nicoEye)" />
              <circle cx="96" cy="120" r="2.5" fill="#fff" />
              <circle cx="140" cy="120" r="2.5" fill="#fff" />
              <circle cx="101" cy="127" r="1" fill="#fff" opacity="0.7" />
              <circle cx="145" cy="127" r="1" fill="#fff" opacity="0.7" />
            </>
          )}

          {/* Eyebrows */}
          {expression === 'panico' ? (
            <>
              <path d="M 84 100 Q 98 90 110 102" stroke="#12151e" strokeWidth="2.5" fill="none" />
              <path d="M 156 100 Q 142 90 130 102" stroke="#12151e" strokeWidth="2.5" fill="none" />
            </>
          ) : (
            <>
              <path d="M 86 104 Q 98 98 110 106" stroke="#12151e" strokeWidth="2.5" fill="none" />
              <path d="M 154 104 Q 142 98 130 106" stroke="#12151e" strokeWidth="2.5" fill="none" />
            </>
          )}

          {/* Mouth */}
          {expression === 'happy' ? (
            <path d="M 110 144 Q 120 156 130 144 Z" fill="#ff8080" stroke="#12151e" strokeWidth="2" />
          ) : expression === 'panico' ? (
            <path d="M 112 140 Q 120 154 128 140 Q 120 138 112 140" fill="#cc3333" stroke="#12151e" strokeWidth="2" />
          ) : (
            <path d="M 112 142 Q 120 148 128 142" stroke="#12151e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          )}

          {/* Nose */}
          <path d="M 118 130 L 122 134 M 122 134 H 118" stroke="#d4b7a7" strokeWidth="2" fill="none" />

          {/* Spiky Anime Hair */}
          <path d="M 70 120 C 60 100, 68 85, 78 80 C 70 70, 85 58, 100 62 C 110 40, 138 45, 145 60 C 158 52, 172 68, 168 82 C 180 92, 172 118, 162 122 C 158 110, 154 100, 150 96 C 145 108, 135 110, 130 92 C 124 104, 114 112, 110 95 C 104 110, 92 114, 88 92 C 84 105, 76 112, 70 120 Z" fill="url(#nicoHair)" stroke="#12151e" strokeWidth="2" />

          {/* Cyberpunk Hoodie/Jacket */}
          <path d="M 50 210 C 70 185, 170 185, 190 210 L 210 320 H 30 Z" fill="url(#nicoHoodie)" />
          {/* Inner Shirt */}
          <path d="M 105 180 L 120 205 L 135 180 Z" fill="#12151e" />
          {/* Orange Neon piping / Collar */}
          <path d="M 100 180 C 100 180, 110 215, 120 215 C 130 215, 140 180, 140 180" stroke="var(--accent-btc)" strokeWidth="3.5" fill="none" style={{ filter: 'drop-shadow(0 0 4px var(--accent-btc))' }} />
          {/* Glowing Bitcoin emblem on the left chest */}
          <circle cx="85" cy="240" r="15" fill="#12151e" stroke="var(--accent-btc)" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 5px var(--accent-btc))' }} />
          <path d="M 85 230 V 250 M 80 234 H 90 M 80 240 H 91 M 80 246 H 90" stroke="var(--accent-btc)" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (name === 'shitcoin_bro') {
    return (
      <svg width="290" height="440" viewBox="0 0 240 320" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="broJacket" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#cca300" />
            <stop offset="100%" stopColor="#ffd700" />
          </linearGradient>
          <linearGradient id="broHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffea80" />
            <stop offset="100%" stopColor="#d4af37" />
          </linearGradient>
          <filter id="broGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        <g filter="url(#broGlow)">
          {/* Neck */}
          <path d="M 105 150 L 105 185 L 135 185 L 135 150 Z" fill="#ebd2c4" />
          <path d="M 105 150 L 120 170 L 135 150 Z" fill="#d4b7a7" />

          {/* Head & Face */}
          <path d="M 80 110 Q 70 145 100 160 Q 120 168 140 160 Q 170 145 160 110 Q 155 75 120 75 Q 85 75 80 110 Z" fill="#fce5d8" />

          {/* Smug mouth */}
          <path d="M 108 140 Q 122 134 130 142" stroke="#12151e" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Sunglasses (Reflective black and gold aviators) */}
          <polygon points="78,110 112,110 108,126 84,126" fill="#181818" stroke="#d4af37" strokeWidth="2.5" />
          <polygon points="122,110 156,110 150,126 126,126" fill="#181818" stroke="#d4af37" strokeWidth="2.5" />
          <line x1="112" y1="113" x2="122" y2="113" stroke="#d4af37" strokeWidth="3" />
          {/* Highlights on glasses */}
          <line x1="84" y1="114" x2="96" y2="124" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          <line x1="128" y1="114" x2="140" y2="124" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />

          {/* Slick Anime Hair */}
          <path d="M 74 102 C 60 70, 75 40, 100 45 C 115 25, 142 35, 148 55 C 162 45, 175 60, 168 85 C 172 100, 164 112, 156 114 C 158 90, 152 80, 140 76 C 145 92, 134 94, 128 80 C 122 92, 114 96, 110 82 C 104 96, 94 100, 88 82 C 84 94, 78 100, 74 102 Z" fill="url(#broHair)" stroke="#9e8311" strokeWidth="1.8" />

          {/* Golden Jacket */}
          <path d="M 45 200 C 65 175, 165 175, 185 200 L 205 320 H 25 Z" fill="url(#broJacket)" stroke="#cca300" strokeWidth="1.5" />
          {/* Black shirt inside */}
          <path d="M 105 185 L 120 220 L 135 185 Z" fill="#181818" />
          {/* Big thick gold chain */}
          <path d="M 90 190 Q 120 230 150 190" fill="none" stroke="#d4af37" strokeWidth="4.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }} />
        </g>
      </svg>
    );
  }

  if (name === 'satoshi') {
    return (
      <svg width="290" height="440" viewBox="0 0 240 320" style={{ pointerEvents: 'none' }}>
        <defs>
          <radialGradient id="satAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(247, 147, 26, 0.45)" />
            <stop offset="100%" stopColor="rgba(247, 147, 26, 0)" />
          </radialGradient>
          <linearGradient id="satSilicon" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#121829" />
            <stop offset="100%" stopColor="#080b14" />
          </linearGradient>
        </defs>

        {/* Aura */}
        <circle cx="120" cy="150" r="110" fill="url(#satAura)" />

        {/* Shrouded Hood Silhouette */}
        <path d="M 50 220 C 70 175, 170 175, 190 220 L 205 320 H 25 Z" fill="url(#satSilicon)" stroke="#f7931a" strokeWidth="1.5" />
        <path d="M 75 110 Q 70 60, 120 40 Q 170 60, 165 110 Q 170 150, 150 170 C 130 162, 110 162, 90 170 Q 70 150, 75 110 Z" fill="url(#satSilicon)" stroke="#f7931a" strokeWidth="2" />

        {/* Glowing Orange Key Code Eyes */}
        <circle cx="102" cy="112" r="4" fill="#f7931a" style={{ filter: 'drop-shadow(0 0 6px #f7931a)' }} />
        <circle cx="138" cy="112" r="4" fill="#f7931a" style={{ filter: 'drop-shadow(0 0 6px #f7931a)' }} />

        {/* Binary Matrix Code lines floating down Satoshi */}
        <g fill="rgba(247, 147, 26, 0.3)" fontSize="9" fontFamily="Share Tech Mono">
          <text x="85" y="80">1 0 1</text>
          <text x="145" y="90">0 1</text>
          <text x="90" y="140">SHA256</text>
          <text x="135" y="135">21M</text>
          <text x="60" y="240">01000010 01001001 01010100</text>
          <text x="60" y="260">01000011 01001111 01001001 01001110</text>
        </g>
      </svg>
    );
  }

  if (name === 'barista') {
    return (
      <svg width="290" height="440" viewBox="0 0 240 320" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="valHair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff859f" />
            <stop offset="100%" stopColor="#ff4d6d" />
          </linearGradient>
          <linearGradient id="valEye" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9e5a1b" />
            <stop offset="100%" stopColor="#ffae19" />
          </linearGradient>
          <filter id="valShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
          </filter>
        </defs>

        <g filter="url(#valShadow)">
          {/* Hair back Bun */}
          <circle cx="120" cy="55" r="24" fill="url(#valHair)" stroke="#12151e" strokeWidth="2" />
          {/* Hair pins */}
          <path d="M 85 45 L 105 65" stroke="var(--accent-btc)" strokeWidth="3" />
          <path d="M 155 45 L 135 65" stroke="var(--accent-btc)" strokeWidth="3" />

          {/* Neck */}
          <path d="M 105 150 L 105 180 L 135 180 L 135 150 Z" fill="#ffd1b3" />
          <path d="M 105 150 L 120 168 L 135 150 Z" fill="#e0b196" />

          {/* Head & Face */}
          <path d="M 80 110 Q 70 145 100 160 Q 120 168 140 160 Q 170 145 160 110 Q 155 70 120 70 Q 85 70 80 110 Z" fill="#ffe2cc" />

          {/* Blushing cheeks */}
          <ellipse cx="96" cy="132" rx="9" ry="3" fill="#ff99aa" opacity="0.6" />
          <ellipse cx="144" cy="132" rx="9" ry="3" fill="#ff99aa" opacity="0.6" />

          {/* Eyes */}
          <path d="M 85 113 Q 98 106 112 116" stroke="#12151e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 155 113 Q 142 106 128 116" stroke="#12151e" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="98" cy="122" rx="8" ry="9" fill="url(#valEye)" />
          <ellipse cx="142" cy="122" rx="8" ry="9" fill="url(#valEye)" />
          <circle cx="96" cy="119" r="2.2" fill="#fff" />
          <circle cx="140" cy="119" r="2.2" fill="#fff" />

          {/* Eyebrows */}
          <path d="M 86 102 Q 98 97 108 104" stroke="#12151e" strokeWidth="2" fill="none" />
          <path d="M 154 102 Q 142 97 132 104" stroke="#12151e" strokeWidth="2" fill="none" />

          {/* Mouth */}
          <path d="M 110 142 Q 120 153 130 142" fill="none" stroke="#12151e" strokeWidth="2.5" strokeLinecap="round" />

          {/* Hair Front Bangs */}
          <path d="M 76 115 C 68 85, 75 72, 85 72 C 100 72, 110 92, 110 92 C 120 72, 130 92, 130 92 C 140 72, 165 85, 164 115 C 160 100, 155 88, 142 86 C 146 100, 136 102, 130 90 C 124 100, 116 104, 112 92 C 106 104, 96 106, 92 90 C 88 100, 82 106, 76 115 Z" fill="url(#valHair)" stroke="#12151e" strokeWidth="1.5" />

          {/* Green Apron Body */}
          <path d="M 50 210 C 65 180, 155 180, 170 210 L 190 320 H 30 Z" fill="#4b5d3a" />
          {/* White shirt sleeves */}
          <path d="M 40 210 L 60 190 L 70 220 Z M 180 210 L 160 190 L 150 220 Z" fill="#fff" />
          {/* White Apron Front bib */}
          <path d="M 85 205 L 155 205 L 165 320 H 75 Z" fill="#fff" opacity="0.95" />
          {/* Coffee cup graphic */}
          <path d="M 108 240 H 128 V 256 H 108 Z M 128 243 H 133 V 252 H 128 Z" fill="#4b5d3a" />
        </g>
      </svg>
    );
  }

  if (name === 'gorilla') {
    return (
      <svg width="340" height="460" viewBox="0 0 240 320" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="gorillaSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#db2c49" />
            <stop offset="100%" stopColor="#96132a" />
          </linearGradient>
          <filter id="gorillaShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.5" />
          </filter>
        </defs>

        <g filter="url(#gorillaShadow)">
          {/* Giant shoulders */}
          <path d="M 20 220 C 40 140, 200 140, 220 220 L 235 320 H 5 Z" fill="url(#gorillaSkin)" />
          {/* Inner chest block (lighter shade) */}
          <path d="M 60 210 Q 120 170 180 210 Q 170 280 120 290 Q 70 280 60 210 Z" fill="#750c1f" opacity="0.6" />

          {/* Gorilla Head */}
          <circle cx="120" cy="115" r="52" fill="url(#gorillaSkin)" />
          {/* Face Plate */}
          <path d="M 85 125 Q 120 95 155 125 Q 155 160 120 165 Q 85 160 85 125 Z" fill="#660b1c" />

          {/* Winking happy eyes */}
          <ellipse cx="105" cy="118" rx="7" ry="9" fill="#111" />
          <circle cx="107" cy="114" r="2.5" fill="white" />
          {/* Wink eye */}
          <path d="M 128 118 Q 138 110 142 120" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />

          {/* Smiling mouth */}
          <path d="M 100 140 Q 120 156 140 140" fill="none" stroke="#fff" strokeWidth="4.5" strokeLinecap="round" />

          {/* Backwards Bitcoin Cap */}
          <path d="M 75 78 Q 120 48 165 78 Z" fill="#181818" />
          <path d="M 85 70 L 165 70 Q 170 80 155 80 L 80 80 Z" fill="var(--accent-btc)" />
          <text x="120" y="74" textAnchor="middle" fill="var(--accent-btc)" fontSize="14" fontWeight="bold" fontFamily="Share Tech Mono">₿</text>
        </g>
      </svg>
    );
  }

  return null;
};

export const SceneScreen: React.FC<SceneScreenProps> = ({ background, character, expression, isPanic }) => {
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
