import React, { useEffect, useRef, useState } from 'react';
import { useAudio } from '../hooks/useAudio';

interface ExchangeSimProps {
  onComplete: (success: boolean) => void;
}

export const ExchangeSim: React.FC<ExchangeSimProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [price] = useState(0.000001);
  const [sats] = useState(0);
  const audio = useAudio();

  useEffect(() => {
    // Play error audio instantly on mount
    audio.playError();
    
    // Draw the static crashed chart
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const width = canvas.width;
        const height = canvas.height;
        const padding = 30;

        // Grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 1; i < 5; i++) {
          const y = (height / 5) * i;
          ctx.beginPath();
          ctx.moveTo(padding, y);
          ctx.lineTo(width - padding, y);
          ctx.stroke();
        }

        // Draw instant crash line
        ctx.strokeStyle = '#ff0055';
        ctx.shadowColor = 'rgba(255, 0, 85, 0.6)';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(padding, padding + 20);
        ctx.lineTo(width / 4, padding + 15);
        ctx.lineTo(width / 3, height - padding);
        ctx.lineTo(width - padding, height - padding);
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
  }, []);

  const handleContinue = () => {
    audio.playSuccess();
    onComplete(false); // complete, Nico loses everything
  };

  return (
    <div className="exch-container">
      <div className="exch-header">
        <h2 className="exch-title">BIN-MEX TERMINAL v4.26</h2>
        <div className="exch-alert" style={{ background: 'rgba(255, 0, 85, 0.4)' }}>❌ LIQUIDADO</div>
      </div>

      <div className="exch-body">
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="exch-chart-area" style={{ height: '280px' }}>
            <div className="exch-ticker-info">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ELONPEPE / SATS (50x LONG)</span>
              <span className="exch-price" style={{ color: 'var(--accent-red)' }}>
                ${price.toFixed(6)}
              </span>
            </div>
            <canvas ref={canvasRef} width="600" height="240" style={{ width: '100%', height: '100%' }} />
          </div>
          
          <div style={{
            background: 'rgba(255,0,85,0.15)',
            border: '1px solid var(--accent-red)',
            color: 'var(--accent-red)',
            padding: '10px 15px',
            borderRadius: '6px',
            fontSize: '0.9rem',
            fontWeight: 'bold',
            fontFamily: 'var(--font-mono)',
            textAlign: 'center',
            animation: 'blinkRed 0.6s infinite alternate'
          }}>
            ❌ MARGIN LIQUIDATION: RPC ERROR CODES 503 & 403 - EXCHANGE FUNDS REVERTED.
          </div>
        </div>

        <div className="exch-stats">
          <div className="exch-stat-card">
            <span className="exch-stat-label">Margen Disponible</span>
            <div className="exch-stat-val" style={{ color: 'var(--accent-red)' }}>
              {sats.toLocaleString()} SATS
            </div>
          </div>

          <div className="exch-stat-card">
            <span className="exch-stat-label">Precio de Liquidación</span>
            <div className="exch-stat-val" style={{ color: 'var(--accent-btc)' }}>
              $0.003750
            </div>
          </div>

          <div className="exch-stat-card">
            <span className="exch-stat-label">Apalancamiento</span>
            <div className="exch-stat-val" style={{ color: 'var(--accent-red)' }}>
              50x (Cross)
            </div>
          </div>

          <button className="exch-btn" style={{ background: 'var(--accent-red)' }} onClick={handleContinue}>
            CONTINUAR (LIQUIDADO)
          </button>
        </div>
      </div>
    </div>
  );
};
