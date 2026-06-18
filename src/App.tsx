import { useState } from 'react';
import { NovelEngine } from './components/NovelEngine';
import { useAudio } from './hooks/useAudio';

function App() {
  const [screen, setScreen] = useState<'menu' | 'setup' | 'playing'>('menu');
  const [playerName, setPlayerName] = useState('Nico');
  const [gender, setGender] = useState<'hombre' | 'mujer'>('hombre');
  const [npub, setNpub] = useState('');
  const [nsec, setNsec] = useState('');
  const audio = useAudio();

  const handleStartGame = () => {
    if (!npub) {
      audio.playError();
      alert('Debes conectarte con Nostr (extensión o llave generada) para guardar tu partida y badges.');
      return;
    }
    // Play start chime to initialize audio context securely on user gesture
    audio.playSuccess();
    setScreen('playing');
  };

  const handleGoToSetup = () => {
    audio.playBeep(440, 0.08, 'sine');
    setScreen('setup');
  };

  const handleBackToMenu = () => {
    audio.playBeep(330, 0.08, 'sine');
    setScreen('menu');
  };

  const handleNIP07Connect = async () => {
    if ((window as any).nostr) {
      try {
        const hexPub = await (window as any).nostr.getPublicKey();
        const npubSim = `npub1${hexPub.slice(0, 8)}...${hexPub.slice(-8)}`;
        setNpub(npubSim);
        setNsec('Extensión NIP-07 protegida');
        audio.playSuccess();
      } catch (e) {
        console.error(e);
        audio.playError();
      }
    } else {
      audio.playError();
      alert('No se detectó ninguna extensión de Nostr (como Alby, Nos2x, etc.). Por favor, genera llaves efímeras para continuar.');
    }
  };

  const handleGenerateKeys = () => {
    const chars = '0123456789abcdef';
    let hexPriv = '';
    let hexPub = '';
    for (let i = 0; i < 64; i++) {
      hexPriv += chars[Math.floor(Math.random() * 16)];
      hexPub += chars[Math.floor(Math.random() * 16)];
    }
    const simulatedNpub = `npub1${hexPub.slice(0, 8)}...${hexPub.slice(-8)}`;
    const simulatedNsec = `nsec1${hexPriv.slice(0, 8)}...${hexPriv.slice(-8)}`;
    setNpub(simulatedNpub);
    setNsec(simulatedNsec);
    audio.playSuccess();
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
          padding: '40px'
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
            onClick={handleGoToSetup}
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

      {screen === 'setup' && (
        <div className="vn-frame screen-panel" style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 40px',
          background: 'radial-gradient(circle, rgba(16,10,30,0.85) 0%, rgba(5,7,15,0.99) 100%)',
          overflowY: 'auto'
        }}>
          <h2 style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-cyan)',
            fontSize: '1.6rem',
            marginBottom: '20px',
            textShadow: '0 0 10px rgba(0, 240, 255, 0.8)',
            letterSpacing: '2px'
          }}>
            CONFIGURA TU PERSONAJE
          </h2>

          <div style={{
            width: '100%',
            maxWidth: '500px',
            background: 'rgba(10, 18, 38, 0.85)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: 'var(--glow-cyan)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '25px'
          }}>
            {/* Input Nombre */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Nombre del Protagonista
              </label>
              <input 
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value.slice(0, 20))}
                placeholder="Ingresa tu nombre..."
                style={{
                  background: 'rgba(5, 7, 15, 0.9)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '10px 14px',
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none',
                  transition: 'border-color 0.25s',
                  width: '100%'
                }}
              />
            </div>

            {/* Selector de Sexo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Selecciona tu Sexo
              </label>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                {/* Option Hombre */}
                <div 
                  onClick={() => setGender('hombre')}
                  style={{
                    flex: 1,
                    background: gender === 'hombre' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(5, 7, 15, 0.6)',
                    border: gender === 'hombre' ? '2px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '12px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.25s ease',
                    boxShadow: gender === 'hombre' ? 'var(--glow-cyan)' : 'none'
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: gender === 'hombre' ? '2px solid var(--accent-cyan)' : '1.5px solid rgba(255,255,255,0.2)',
                    backgroundColor: '#04060f',
                    transition: 'all 0.25s ease'
                  }}>
                    <img src="/avatar_nico.png" alt="Hombre" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    color: gender === 'hombre' ? 'var(--accent-cyan)' : 'var(--text-light)'
                  }}>
                    HOMBRE
                  </span>
                </div>

                {/* Option Mujer */}
                <div 
                  onClick={() => setGender('mujer')}
                  style={{
                    flex: 1,
                    background: gender === 'mujer' ? 'rgba(0, 240, 255, 0.15)' : 'rgba(5, 7, 15, 0.6)',
                    border: gender === 'mujer' ? '2px solid var(--accent-cyan)' : '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '12px 8px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.25s ease',
                    boxShadow: gender === 'mujer' ? 'var(--glow-cyan)' : 'none'
                  }}
                >
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: gender === 'mujer' ? '2px solid var(--accent-cyan)' : '1.5px solid rgba(255,255,255,0.2)',
                    backgroundColor: '#04060f',
                    transition: 'all 0.25s ease'
                  }}>
                    <img src="/avatar_nico_female.png" alt="Mujer" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    color: gender === 'mujer' ? 'var(--accent-cyan)' : 'var(--text-light)'
                  }}>
                    MUJER
                  </span>
                </div>
              </div>
            </div>

            {/* Nostr Login Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                textTransform: 'uppercase'
              }}>
                Identidad Digital (Nostr)
              </label>

              <div style={{
                background: 'rgba(5, 7, 15, 0.9)',
                border: '1px solid var(--border-color)',
                borderRadius: '6px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {npub ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '1.2rem' }}>🔑</span>
                      <span style={{
                        color: 'var(--accent-green)',
                        fontSize: '0.85rem',
                        fontFamily: 'var(--font-mono)',
                        wordBreak: 'break-all'
                      }}>
                        Conectado: {npub}
                      </span>
                    </div>
                    {nsec && nsec !== 'Extensión NIP-07 protegida' && (
                      <div style={{
                        color: 'rgba(255, 255, 255, 0.4)',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        wordBreak: 'break-all'
                      }}>
                        Clave privada (simulada): {nsec}
                      </div>
                    )}
                    <button
                      onClick={() => { setNpub(''); setNsec(''); }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-red)',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                        textAlign: 'left',
                        padding: 0,
                        marginTop: '4px',
                        textDecoration: 'underline'
                      }}
                    >
                      [Desconectar clave]
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button
                      onClick={handleNIP07Connect}
                      className="menu-btn"
                      style={{
                        width: '100%',
                        fontSize: '0.85rem',
                        borderColor: 'var(--accent-cyan)',
                        background: 'rgba(0, 240, 255, 0.05)',
                        margin: 0,
                        padding: '10px'
                      }}
                    >
                      💜 Conectar con Extensión (NIP-07)
                    </button>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      — O TAMBIÉN —
                    </div>

                    <button
                      onClick={handleGenerateKeys}
                      className="menu-btn"
                      style={{
                        width: '100%',
                        fontSize: '0.85rem',
                        borderColor: 'var(--accent-btc)',
                        background: 'rgba(247, 147, 26, 0.05)',
                        margin: 0,
                        padding: '10px'
                      }}
                    >
                      ⚡ Generar Identidad Rápida (Efímera)
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              className="menu-btn" 
              onClick={() => setScreen('menu')}
              style={{
                width: '160px',
                borderColor: 'var(--accent-red)',
                color: 'var(--accent-red)',
                background: 'rgba(255, 0, 85, 0.05)',
                margin: 0
              }}
            >
              VOLVER
            </button>
            <button 
              className="menu-btn primary" 
              onClick={handleStartGame}
              disabled={!playerName.trim() || !npub}
              style={{
                width: '240px',
                boxShadow: 'var(--glow-btc)',
                margin: 0,
                opacity: (playerName.trim() && npub) ? 1 : 0.5,
                cursor: (playerName.trim() && npub) ? 'pointer' : 'not-allowed'
              }}
            >
              INICIAR AVENTURA ⚡
            </button>
          </div>
        </div>
      )}

      {screen === 'playing' && (
        <NovelEngine 
          onBackToMenu={handleBackToMenu} 
          playerName={playerName.trim() || 'Nico'} 
          gender={gender} 
          npub={npub}
          nsec={nsec}
        />
      )}
    </div>
  );
}

export default App;
