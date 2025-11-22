import React, { useMemo } from 'react';
import { FanSpeed } from '../types';

interface FanBladesProps {
  speed: FanSpeed;
}

export const FanBlades: React.FC<FanBladesProps> = ({ speed }) => {
  // Animation duration mapping
  const duration = useMemo(() => {
    switch (speed) {
      case FanSpeed.OFF: return '0s';
      case FanSpeed.LOW: return '1.5s';
      case FanSpeed.MEDIUM: return '0.6s';
      case FanSpeed.HIGH: return '0.25s';
      case FanSpeed.TURBO: return '0.12s';
      default: return '0s';
    }
  }, [speed]);

  const isSpinning = speed !== FanSpeed.OFF;
  
  // Dynamic motion blur
  const blurOpacity = speed >= FanSpeed.HIGH ? 0.4 : 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Motion Blur Disc (Simulates rapid movement) */}
      <div 
        className="absolute w-[95%] h-[95%] rounded-full bg-slate-900 mix-blend-multiply filter blur-xl transition-opacity duration-500"
        style={{ opacity: blurOpacity }}
      />

      {/* Rotating Assembly */}
      <div 
        className="w-full h-full relative"
        style={{
          animation: isSpinning ? `spin ${duration} linear infinite` : 'none',
        }}
      >
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
             {/* Deep plastic gradient */}
             <linearGradient id="bladeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" /> {/* Slate-700 */}
                <stop offset="40%" stopColor="#1e293b" /> {/* Slate-800 */}
                <stop offset="100%" stopColor="#0f172a" /> {/* Slate-900 */}
             </linearGradient>
             
             <filter id="blade-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.5"/>
             </filter>
          </defs>
          
          <g transform="translate(100, 100)">
            {/* 5 Aerodynamic Blades */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <g key={i} transform={`rotate(${angle})`}>
                {/* Blade Body */}
                <path
                  d="M0,0 Q25,-45 85,-65 C108,-72 105,-25 92,-8 C75,15 25,18 0,0 Z"
                  fill="url(#bladeGrad)"
                  stroke="#475569"
                  strokeWidth="0.5"
                  filter="url(#blade-shadow)"
                />
                {/* Specular Ridge (Plastic reflection) */}
                <path
                   d="M10,-10 Q35,-35 80,-45"
                   fill="none"
                   stroke="rgba(255,255,255,0.08)"
                   strokeWidth="3"
                   strokeLinecap="round"
                />
              </g>
            ))}
            
            {/* Center Hub Cap */}
            <circle cx="0" cy="0" r="22" fill="#1e293b" stroke="#334155" strokeWidth="1"/>
            {/* Chrome Nut */}
            <circle cx="0" cy="0" r="10" fill="url(#bladeGrad)" />
            <circle cx="0" cy="0" r="4" fill="#e2e8f0" />
          </g>
        </svg>
      </div>
    </div>
  );
};