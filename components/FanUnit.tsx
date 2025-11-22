import React from 'react';
import { FanSpeed } from '../types';
import { FanBlades } from './FanBlades';

interface FanUnitProps {
  speed: FanSpeed;
  isOscillating: boolean;
}

export const FanUnit: React.FC<FanUnitProps> = ({ speed, isOscillating }) => {
  return (
    <div className="relative h-[600px] w-full flex flex-col items-center justify-end pb-6 perspective-[1200px]">
      
      {/* Oscillating Upper Assembly (Head + Neck) */}
      <div 
        className="flex flex-col items-center origin-[50%_100%] transition-transform ease-in-out will-change-transform relative z-20"
        style={{
            // Pivot point is the bottom of this container (where neck meets stand)
            animation: isOscillating ? 'oscillate 6s ease-in-out infinite alternate' : 'none',
            transformStyle: 'preserve-3d'
        }}
      >
        <style>{`
            @keyframes oscillate {
                from { transform: rotateY(-40deg); }
                to { transform: rotateY(40deg); }
            }
        `}</style>

        {/* Fan Head */}
        <div className="relative w-[340px] h-[340px] rounded-full bg-gradient-to-tr from-gray-800/40 to-gray-700/40 backdrop-blur-[2px] shadow-2xl fan-shadow flex items-center justify-center border-[8px] border-gray-300 ring-1 ring-gray-400/50">
            
            {/* Rear Cage Pattern (Background Grid) */}
            <div className="absolute inset-0 rounded-full opacity-40 overflow-hidden z-0">
                 <div className="w-full h-full bg-[radial-gradient(circle,transparent_20%,#000_90%)]" />
                 <svg width="100%" height="100%">
                    <pattern id="grid" width="14" height="14" patternUnits="userSpaceOnUse">
                        <path d="M 14 0 L 0 0 0 14" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-500"/>
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Rotating Blades */}
            <div className="absolute inset-0 z-10 p-6">
                <FanBlades speed={speed} />
            </div>

            {/* Front Cage & Bezel */}
            <div className="absolute inset-0 rounded-full z-20 pointer-events-none">
                {/* Metallic Bezel Reflection */}
                <div className="absolute inset-[-8px] rounded-full border-[8px] border-white/5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] pointer-events-none"></div>
                
                {/* Wire Cage SVG - Perfectly Aligned */}
                <svg viewBox="0 0 340 340" className="w-full h-full absolute inset-0 drop-shadow-lg">
                    <defs>
                        <linearGradient id="cageGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#e2e8f0" /> {/* light top */}
                            <stop offset="50%" stopColor="#94a3b8" /> {/* mid */}
                            <stop offset="100%" stopColor="#475569" /> {/* dark bottom */}
                        </linearGradient>
                    </defs>
                    
                    <g transform="translate(170, 170)">
                        {/* Radial Spokes - Perfectly centered from 0,0 */}
                        {[...Array(32)].map((_, i) => (
                            <line 
                                key={i}
                                x1="0" y1="0" x2="164" y2="0" 
                                transform={`rotate(${i * (360/32)})`} 
                                stroke="url(#cageGradient)" 
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                opacity="0.9"
                            />
                        ))}
                         {/* Concentric Rings - Perfectly centered circles */}
                         {[45, 85, 125, 164].map((r, i) => (
                             <circle 
                                key={i} 
                                r={r} 
                                fill="none" 
                                stroke="url(#cageGradient)" 
                                strokeWidth={i === 3 ? 5 : 1.5} // Thicker outer rim
                                opacity="0.95"
                             />
                         ))}
                    </g>
                </svg>

                {/* Center Logo Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-300 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.9)] flex items-center justify-center border border-gray-200 z-30">
                    <div className="w-20 h-20 rounded-full border border-gray-300 flex items-center justify-center bg-gradient-to-tr from-gray-50 to-white shadow-inner">
                        <span className="text-[0.65rem] font-black tracking-[0.2em] text-gray-700 uppercase scale-x-110">AeroLux</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Neck Joint - Connects Head to Stand */}
        <div className="w-16 h-20 bg-gradient-to-b from-gray-600 to-gray-800 mt-[-4px] rounded-b-2xl shadow-[inset_0_-2px_6px_rgba(0,0,0,0.6)] z-10 flex items-center justify-center relative">
            {/* Pivot Screw visual */}
             <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 shadow-md border border-gray-400"></div>
        </div>
      </div>
      
      {/* Static Stand & Base Assembly */}
      <div className="flex flex-col items-center relative z-10 mt-[-12px]">
          {/* Main Pole */}
          <div className="w-12 h-64 bg-gradient-to-r from-gray-500 via-gray-200 to-gray-500 shadow-[0_10px_30px_rgba(0,0,0,0.6)] relative overflow-hidden">
              {/* Chrome reflection effect */}
              <div className="absolute top-0 bottom-0 left-[35%] w-2 bg-white opacity-70 blur-[2px]"></div>
              
              {/* Height adjustment collar */}
              <div className="absolute top-8 w-full h-8 bg-gray-800 border-t border-b border-gray-600 flex items-center justify-center">
                  <div className="w-1 h-4 bg-gray-600 rounded-full"></div>
              </div>
          </div>

          {/* Base */}
          <div className="w-80 h-14 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[50%] shadow-[0_25px_50px_rgba(0,0,0,0.7),inset_0_2px_15px_rgba(255,255,255,0.6)] mt-[-8px] relative z-10 border-t border-white/40">
             {/* Base Weight/Shape */}
             <div className="absolute top-[-12px] left-1/2 -translate-x-1/2 w-20 h-6 bg-gray-300 blur-md rounded-full opacity-40"></div>
          </div>
      </div>

    </div>
  );
};
