import React, { useState, useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';

interface WalletSimProps {
  onComplete: (success: boolean) => void;
}

export const WalletSim: React.FC<WalletSimProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'scan' | 'paying' | 'success'>('scan');
  const [balance, setBalance] = useState(120000);
  const audio = useAudio();

  useEffect(() => {
    // Prompt sound
    audio.playBeep(523.25, 0.1); // C5
  }, []);

  const handlePay = () => {
    audio.playBeep(329.63, 0.08); // E4
    setStep('paying');
    
    // Simulate transaction delay
    let count = 0;
    const interval = setInterval(() => {
      count++;
      audio.playBeep(440 + count * 100, 0.05, 'triangle');
      if (count >= 3) {
        clearInterval(interval);
        setBalance(prev => prev - 8001); // 8000 sats + 1 sat fee
        setStep('success');
        audio.playSuccess();
      }
    }, 500);
  };

  const handleFinish = () => {
    onComplete(true);
  };

  return (
    <div className="wallet-container">
      <div className="phone-shell">
        <div className="phone-screen">
          <div className="phone-header">
            <span>ZapWallet ⚡</span>
            <span>17:45 🔋</span>
          </div>

          <div className="wallet-balance-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Saldo Disponible</span>
            <div className="wallet-balance-val">{balance.toLocaleString()} sats</div>
          </div>

          {step === 'scan' && (
            <>
              <div className="wallet-scan-box">
                <div className="wallet-scan-line" />
                {/* SVG representing a simple QR code */}
                <svg width="100" height="100" viewBox="0 0 100 100" style={{ fill: 'var(--text-light)', opacity: 0.85 }}>
                  <path d="M0,0 h30 v10 h-20 v20 h-10 z M70,0 h30 v30 h-10 v-20 h-20 z M0,70 h10 v20 h20 v10 h-30 z M100,100 h-30 v-10 h20 v-20 h10 z" />
                  <rect x="15" y="15" width="20" height="20" />
                  <rect x="65" y="15" width="20" height="20" />
                  <rect x="15" y="65" width="20" height="20" />
                  <rect x="45" y="45" width="10" height="10" />
                  <rect x="65" y="65" width="10" height="10" />
                  <rect x="75" y="75" width="10" height="10" />
                </svg>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '16px', fontFamily: 'var(--font-mono)' }}>
                  Factura de Valeria
                </span>
              </div>

              <div className="wallet-invoice-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Monto:</span>
                  <span style={{ fontWeight: 'bold', color: 'var(--text-light)' }}>8,000 sats</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Destinatario:</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>valeria_cafe@lnurl</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Comisión Máxima:</span>
                  <span style={{ color: 'var(--accent-green)' }}>1 sat</span>
                </div>
              </div>

              <button 
                className="menu-btn primary" 
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem', margin: 0 }}
                onClick={handlePay}
              >
                ⚡ PAGAR INSTANTÁNEO
              </button>
            </>
          )}

          {step === 'paying' && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1, gap: '20px' }}>
              <div className="loader" style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(0, 240, 255, 0.1)',
                borderTop: '4px solid var(--accent-cyan)',
                borderRadius: '50%',
                animation: 'spin 1s infinite linear'
              }} />
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>
                Enrutando pago por la red...
              </span>
            </div>
          )}

          {step === 'success' && (
            <div className="wallet-success-screen">
              <div className="wallet-success-circle">✓</div>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--accent-green)', fontWeight: '800', marginBottom: '8px' }}>
                ¡Pago Confirmado!
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.4' }}>
                Se enviaron 8,000 sats a <span style={{ color: 'var(--text-light)' }}>valeria_cafe@lnurl</span> instantáneamente.
              </p>
              
              <div style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                marginBottom: '24px',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Tarifa de Red:</span>
                  <span style={{ color: 'var(--accent-green)' }}>1 satoshi</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estado de Ruta:</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>Canal Abierto</span>
                </div>
              </div>

              <button 
                className="menu-btn" 
                style={{ width: '100%', border: '1px solid var(--accent-green)', margin: 0 }}
                onClick={handleFinish}
              >
                FINALIZAR
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
