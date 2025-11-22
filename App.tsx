import React, { useState, useEffect } from 'react';
import { FanUnit } from './components/FanUnit';
import { FanControls } from './components/FanControls';
import { FanSpeed } from './types';
import { audioService } from './services/audioService';

const App: React.FC = () => {
  const [speed, setSpeed] = useState<FanSpeed>(FanSpeed.OFF);
  const [isOscillating, setIsOscillating] = useState(false);

  const handleSpeedChange = (newSpeed: FanSpeed) => {
    setSpeed(newSpeed);
    audioService.setSpeed(newSpeed);
    
    // Auto turn off oscillation if fan is off (optional, but realistic)
    if (newSpeed === FanSpeed.OFF) {
        setIsOscillating(false);
    }
  };

  const handleToggleOscillation = () => {
      // Only allow oscillation if fan is on, or allow it mechanically but it won't do much if motor is off?
      // For UX, let's allow toggling but it only visually moves if we wanted to simulate internal gears. 
      // But typically oscillation is powered by the motor.
      if (speed !== FanSpeed.OFF) {
          setIsOscillating(!isOscillating);
      }
  };

  // Add some ambient particles to visualize airflow when fan is on
  const particles = React.useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${1 + Math.random() * 2}s`
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-[#1a1a1a] z-0 pointer-events-none" />
      
      {/* Air Particles (Visual Feedback for wind) */}
      {speed !== FanSpeed.OFF && (
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none overflow-hidden">
           {particles.map(p => (
             <div 
               key={p.id}
               className="absolute h-[1px] bg-white rounded-full animate-wind"
               style={{
                 top: p.top,
                 left: '-10%',
                 width: `${50 + Math.random() * 100}px`,
                 animationDuration: speed === FanSpeed.LOW ? '2s' : speed === FanSpeed.MEDIUM ? '1s' : '0.4s',
                 animationDelay: p.delay,
                 opacity: speed === FanSpeed.TURBO ? 0.8 : 0.4
               }}
             />
           ))}
        </div>
      )}
      
      <style>{`
        @keyframes wind {
          0% { transform: translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(120vw) translateY(${Math.random() * 20 - 10}px); opacity: 0; }
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        
        {/* Header */}
        <div className="mb-10 text-center">
            <h1 className="text-3xl font-extralight tracking-[0.5em] text-white/80 uppercase">AeroLux</h1>
            <p className="text-xs text-white/30 tracking-widest mt-2 uppercase">Air Circulation System</p>
        </div>

        {/* The Fan */}
        <FanUnit speed={speed} isOscillating={isOscillating} />

        {/* The Controls */}
        <FanControls 
            currentSpeed={speed} 
            setSpeed={handleSpeedChange} 
            isOscillating={isOscillating}
            toggleOscillation={handleToggleOscillation}
        />

        {/* Footer/Help */}
        <p className="mt-8 text-white/20 text-xs text-center max-w-xs leading-relaxed">
          Select a speed to activate the motor. <br/>
          Experience procedural audio feedback and realistic physics.
        </p>
      </div>
    </div>
  );
};

export default App;