import React from 'react';

export default function Results({ wpm, accuracy }) {
  return (
    <div className="flex justify-around items-center bg-[var(--bg-secondary)] p-8 rounded-xl shadow-xl mt-4 text-2xl font-mono animate-fade-in transition-all duration-500 transform scale-100 border border-[var(--accent)]/20">
      <div className="flex flex-col items-center gap-3">
        <span className="text-[var(--text-secondary)] text-lg uppercase tracking-widest font-bold">WPM</span>
        <span className="text-[var(--accent)] text-6xl font-black drop-shadow-[0_0_15px_var(--accent)]">{Math.round(wpm)}</span>
      </div>
      <div className="flex flex-col items-center gap-3">
        <span className="text-[var(--text-secondary)] text-lg uppercase tracking-widest font-bold">Accuracy</span>
        <span className="text-[var(--text-primary)] text-6xl font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{Math.round(accuracy)}%</span>
      </div>
    </div>
  );
}
