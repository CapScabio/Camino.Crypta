import { useState } from 'react';
import { NovelEngine } from './components/NovelEngine';
import { useAudio } from './hooks/useAudio';

function App() {
  const [screen, setScreen] = useState<'menu' | 'playing'>('menu');
  const audio = useAudio();

  const handleStartGame = () => {
    // Play start chime to initialize audio context securely on user gesture
    audio.playSuccess();
    setScreen('playing');
  };

  const handleBackToMenu = () => {
    audio.playBeep(330, 0.08, 'sine');
    setScreen('menu');
  };

  return (
    <div className="vn-container">
      {screen === 'menu' && (
        <div className="vn-frame screen-panel title-screen" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '40px',
          background: 'radial-gradient(circle, rgba(16,10,30,0.6) 0%, rgba(5,7,15,0.98) 100%)'
        }}>
          {/* Logo de La Crypta en el Medio */}
          <div style={{
            marginBottom: '30px',
            filter: 'drop-shadow(0 0 15px rgba(255, 0, 85, 0.75))',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Elegant glowing cyberpunk skull/key emblem for La Crypta */}
            <svg width="120" height="120" viewBox="0 0 100 100" style={{ fill: 'none' }}>
              <circle cx="50" cy="50" r="45" stroke="#ff0055" strokeWidth="3" strokeDasharray="6 4" />
              {/* Outer hexagonal shape */}
              <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="#ff0055" strokeWidth="2.5" />
              {/* Bitcoin B icon in the center */}
              <path d="M 43 32 H 55 C 60 32, 63 35, 63 38 C 63 41, 60 43, 55 43 H 43 Z M 43 43 H 57 C 62 43, 65 46, 65 50 C 65 54, 62 57, 57 57 H 43 Z" fill="#ff0055" />
              <path d="M 47 25 V 65 M 53 25 V 65" stroke="#ff0055" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-red)',
              fontSize: '1.8rem',
              letterSpacing: '6px',
              marginTop: '15px',
              textShadow: '0 0 10px rgba(255, 0, 85, 0.8)'
            }}>
              LA CRYPTA
            </h2>
          </div>

          <div className="title-header" style={{ marginBottom: '32px' }}>
            <h1 className="title-logo" style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-btc) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 20px rgba(0, 240, 255, 0.25)',
              margin: '0 0 6px 0',
              letterSpacing: '1px'
            }}>
              CAMINO A LA CRYPTA
            </h1>
            <p className="title-sub" style={{
              fontSize: '0.9rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              letterSpacing: '3px'
            }}>
              NOVELA VISUAL BITCOIN
            </p>
          </div>

          <button 
            className="menu-btn primary" 
            onClick={handleStartGame}
            style={{
              padding: '16px 40px',
              fontSize: '1.1rem',
              borderRadius: '8px',
              width: '280px',
              boxShadow: 'var(--glow-btc)'
            }}
          >
            ▶ COMENZAR LA RUTA
          </button>

          <div style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '1px'
          }}>
            Hecho por el Capitan del Escabio, Salud y Libertad 🍻⚡
          </div>
        </div>
      )}

      {screen === 'playing' && (
        <NovelEngine onBackToMenu={handleBackToMenu} />
      )}
    </div>
  );
}

export default App;
