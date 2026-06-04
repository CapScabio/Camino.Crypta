import { useState } from 'react';
import { NovelEngine } from './components/NovelEngine';
import { useAudio } from './hooks/useAudio';

function App() {
  const [screen, setScreen] = useState<'menu' | 'playing' | 'credits'>('menu');
  const audio = useAudio();

  const handleStartGame = () => {
    // Play start chime to initialize audio context securely on user gesture
    audio.playSuccess();
    setScreen('playing');
  };

  const handleCredits = () => {
    audio.playBeep(440, 0.08, 'sine');
    setScreen('credits');
  };

  const handleBackToMenu = () => {
    audio.playBeep(330, 0.08, 'sine');
    setScreen('menu');
  };

  return (
    <div className="vn-container">
      {screen === 'menu' && (
        <div className="vn-frame screen-panel title-screen">
          <div className="title-header">
            <h1 className="title-logo">CAMINO A LA CRYPTA</h1>
            <p className="title-sub">NOVELA VISUAL BITCOIN</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button className="menu-btn primary" onClick={handleStartGame}>
              ▶ COMENZAR LA RUTA
            </button>
            <button className="menu-btn" onClick={handleCredits}>
              📜 CRÉDITOS
            </button>
          </div>

          <div style={{
            marginTop: '60px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            lineHeight: '1.6'
          }}>
            HACKATÓN DE GAMING 2026 // LA CRYPTA<br />
            Presiona Comenzar para activar el audio sintetizado ⚡
          </div>
        </div>
      )}

      {screen === 'playing' && (
        <NovelEngine onBackToMenu={handleBackToMenu} />
      )}

      {screen === 'credits' && (
        <div className="vn-frame screen-panel title-screen">
          <div className="title-header" style={{ marginBottom: '24px' }}>
            <h1 className="title-logo" style={{ fontSize: '2.2rem' }}>CRÉDITOS</h1>
            <p className="title-sub">DETALLES DEL PROYECTO</p>
          </div>

          <div style={{
            width: '80%',
            maxWidth: '560px',
            background: 'var(--bg-panel)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--glow-cyan)',
            borderRadius: '12px',
            padding: '24px',
            fontSize: '0.95rem',
            lineHeight: '1.7',
            color: 'var(--text-light)',
            marginBottom: '30px'
          }}>
            <p style={{ marginBottom: '12px' }}>
              <strong>Desarrollo y Libreto:</strong> Creado por Santiago y Antigravity, el asistente virtual de Google DeepMind.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Mecánica del Juego:</strong> Novela visual con decisiones inmersivas, simulador de exchange de shitcoins en Canvas y pasarela Lightning simulada de micropagos instantáneos.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Estética:</strong> Estilo de arte de anime japonés moderno con interfaces cyberpunk semitransparentes.
            </p>
            <p>
              <strong>Sonido:</strong> Música lo-fi ambiental y efectos de audio generados en tiempo real de forma procedural a través del oscilador de la API Web Audio de HTML5.
            </p>
          </div>

          <button className="menu-btn" onClick={handleBackToMenu}>
            ◀ VOLVER AL MENÚ
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
