import React from 'react';
import { FanSpeed } from '../types';

interface FanControlsProps {
  currentSpeed: FanSpeed;
  setSpeed: (speed: FanSpeed) => void;
  toggleOscillation: () => void;
  isOscillating: boolean;
}

export const FanControls: React.FC<FanControlsProps> = ({ currentSpeed, setSpeed, toggleOscillation, isOscillating }) => {
  
  const speeds = [
    { label: 'OFF', value: FanSpeed.OFF, color: 'text-gray-400' },
    { label: '1', value: FanSpeed.LOW, color: 'text-green-400' },
    { label: '2', value: FanSpeed.MEDIUM, color: 'text-blue-400' },
    { label: '3', value: FanSpeed.HIGH, color: 'text-orange-400' },
    { label: 'MAX', value: FanSpeed.TURBO, color: 'text-red-500' },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.5)] border border-gray-700 w-full max-w-md mx-auto mt-8 relative overflow-hidden">
      {/* Metallic finish overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.03] to-transparent pointer-events-none" />
      
      <div className="flex flex-col gap-6 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-gray-400 text-xs tracking-[0.2em] uppercase font-bold">Control Panel</h2>
          <div className={`h-2 w-2 rounded-full ${currentSpeed > 0 ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-gray-600'}`} />
        </div>

        {/* Speed Buttons */}
        <div className="grid grid-cols-5 gap-3">
          {speeds.map((s) => (
            <button
              key={s.value}
              onClick={() => setSpeed(s.value)}
              className={`
                group relative h-14 rounded-lg flex items-center justify-center transition-all duration-200
                ${currentSpeed === s.value 
                  ? 'bg-gradient-to-b from-gray-600 to-gray-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] translate-y-[1px]' 
                  : 'bg-gradient-to-b from-gray-700 to-gray-800 shadow-[0_4px_6px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:-translate-y-[1px] hover:bg-gray-700'}
              `}
            >
              <span className={`font-bold text-sm ${currentSpeed === s.value ? s.color + ' drop-shadow-[0_0_5px_currentColor]' : 'text-gray-500 group-hover:text-gray-300'}`}>
                {s.label}
              </span>
              {/* LED Indicator for active button */}
              {currentSpeed === s.value && (
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-1 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,1)]" />
              )}
            </button>
          ))}
        </div>

        {/* Oscillation Toggle */}
        <div className="flex justify-center mt-2">
            <button 
                onClick={toggleOscillation}
                className={`
                    px-8 py-3 rounded-full text-sm font-semibold tracking-wider transition-all duration-300
                    border border-gray-600
                    ${isOscillating 
                        ? 'bg-blue-600/20 text-blue-300 border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.2)]' 
                        : 'bg-transparent text-gray-500 hover:text-gray-300 hover:border-gray-500'}
                `}
            >
                OSCILLATION {isOscillating ? 'ON' : 'OFF'}
            </button>
        </div>
      </div>
    </div>
  );
};
