import React, { useEffect, useRef, useState } from 'react';
import { useAudio } from '../hooks/useAudio';

interface ExchangeSimProps {
  onComplete: (success: boolean) => void;
}

export const ExchangeSim: React.FC<ExchangeSimProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [price, setPrice] = useState(0.042);
  const [status, setStatus] = useState<'normal' | 'panic' | 'liquidated'>('normal');
  const [sats, setSats] = useState(50000);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const audio = useAudio();
  const pricesRef = useRef<number[]>([0.038, 0.039, 0.041, 0.042]);

  useEffect(() => {
    let tickCount = 0;
    const interval = setInterval(() => {
      tickCount++;
      
      let nextPrice = price;
      if (tickCount < 5) {
        // Flat/slightly up
        nextPrice = price + (Math.random() - 0.3) * 0.005;
        if (nextPrice <= 0) nextPrice = 0.001;
      } else if (tickCount < 18) {
        // Crash
        setStatus('panic');
        if (tickCount % 3 === 0) audio.playTension();
        nextPrice = price * (0.5 + Math.random() * 0.2); // plunge
        setSats(prev => Math.max(0, Math.floor(prev * 0.4)));
      } else {
        // Dead
        nextPrice = 0.000001;
        setSats(0);
        setStatus('liquidated');
        audio.playError();
        clearInterval(interval);
      }

      setPrice(nextPrice);
      pricesRef.current.push(nextPrice);
      
      // Keep list of points readable
      if (pricesRef.current.length > 30) {
        pricesRef.current.shift();
      }

      drawChart();
    }, 800);

    return () => clearInterval(interval);
  }, [price]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const padding = 30;

    // Draw Grid Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 5; i++) {
      const y = (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    const prices = pricesRef.current;
    if (prices.length < 2) return;

    // Chart Line Styling
    ctx.strokeStyle = status === 'normal' ? '#00f0ff' : '#ff0055';
    ctx.shadowColor = status === 'normal' ? 'rgba(0, 240, 255, 0.4)' : 'rgba(255, 0, 85, 0.6)';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 3;

    // Find min and max
    const maxVal = 0.05;
    const minVal = 0.000001;

    ctx.beginPath();
    prices.forEach((val, index) => {
      const x = padding + ((width - padding * 2) / (prices.length - 1)) * index;
      // Map val to height
      const ratio = (val - minVal) / (maxVal - minVal);
      const y = height - padding - ratio * (height - padding * 2);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    ctx.stroke();
    ctx.shadowBlur = 0; // reset
  };

  useEffect(() => {
    // Initial draw
    drawChart();
  }, []);

  const handlePanicSell = () => {
    audio.playBeep(400, 0.1, 'square');
    if (status === 'liquidated') {
      setErrorMsg('ERROR: TU CUENTA HA SIDO LIQUIDADA.');
    } else {
      // Simulate congestion / rugpull slippage failure
      setErrorMsg('ERROR: FONDO DE LIQUIDEZ INSUFICIENTE. TRANSACCIÓN REVERTIDA POR EL CONTRATO.');
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleContinue = () => {
    audio.playSuccess();
    onComplete(false); // complete, Nico has lost everything
  };

  return (
    <div className="exch-container">
      <div className="exch-header">
        <h2 className="exch-title">BIN-MEX TERMINAL v4.26</h2>
        {status === 'panic' && <div className="exch-alert">⚠️ VOLATILIDAD ALTA - MARGIN CALL</div>}
        {status === 'liquidated' && <div className="exch-alert" style={{ background: 'rgba(255, 0, 85, 0.4)' }}>❌ LIQUIDADO</div>}
      </div>

      <div className="exch-body">
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="exch-chart-area" style={{ height: '280px' }}>
            <div className="exch-ticker-info">
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>LUNASAFEDOGE / SATS (100x LONG)</span>
              <span className="exch-price" style={{ color: status === 'normal' ? 'var(--accent-cyan)' : 'var(--accent-red)' }}>
                ${price.toFixed(6)}
              </span>
            </div>
            <canvas ref={canvasRef} width="600" height="240" style={{ width: '100%', height: '100%' }} />
          </div>
          
          {errorMsg && (
            <div style={{
              background: 'rgba(255,0,85,0.15)',
              border: '1px solid var(--accent-red)',
              color: 'var(--accent-red)',
              padding: '10px 15px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              fontWeight: 'bold',
              fontFamily: 'var(--font-mono)',
              textAlign: 'center'
            }}>
              {errorMsg}
            </div>
          )}
        </div>

        <div className="exch-stats">
          <div className="exch-stat-card">
            <span className="exch-stat-label">Margen Disponible</span>
            <div className="exch-stat-val" style={{ color: sats === 0 ? 'var(--accent-red)' : 'var(--text-light)' }}>
              {sats.toLocaleString()} SATS
            </div>
          </div>

          <div className="exch-stat-card">
            <span className="exch-stat-label">Precio de Liquidación</span>
            <div className="exch-stat-val" style={{ color: 'var(--accent-btc)' }}>
              $0.037500
            </div>
          </div>

          <div className="exch-stat-card">
            <span className="exch-stat-label">Apalancamiento</span>
            <div className="exch-stat-val" style={{ color: 'var(--accent-red)' }}>
              100x (Cross)
            </div>
          </div>

          {status !== 'liquidated' ? (
            <button className="exch-btn" onClick={handlePanicSell}>
              🚨 VENDER (PANIC SELL)
            </button>
          ) : (
            <button className="exch-btn" style={{ background: '#303a52', color: 'var(--text-muted)' }} onClick={handleContinue}>
              CONTINUAR
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
