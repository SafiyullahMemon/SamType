import React from 'react';

export default function Controls({ gameTime, timeLeft, status, onTimeChange, onNewGame }) {
  const TIMES = [15, 30, 45, 60];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-[var(--bg-secondary)] p-4 rounded-xl shadow-lg transition-colors gap-4">
      <div className="text-[var(--accent)] text-2xl font-bold font-mono w-24 text-center sm:text-left">
        {status === 'idle' ? gameTime : timeLeft}s
      </div>
      
      <div className="flex gap-2">
        {TIMES.map(t => (
          <button
            key={t}
            onClick={() => onTimeChange(t)}
            className={`px-4 py-2 rounded-lg font-bold transition-all duration-200 hover:scale-105 ${
              gameTime === t 
                ? 'bg-[var(--accent)] text-[var(--bg-color)]' 
                : 'text-[var(--text-primary)] hover:bg-[var(--bg-color)] hover:text-[var(--accent)]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <button
        onClick={onNewGame}
        className="px-6 py-2 rounded-lg font-bold bg-[var(--text-primary)] text-[var(--bg-color)] hover:scale-105 hover:bg-[var(--accent)] transition-all duration-200 shadow-md flex items-center justify-center gap-2 outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]"
      >
        <span>↻</span> New Game
      </button>
    </div>
  );
}
