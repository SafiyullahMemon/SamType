import React from 'react';

const THEMES = ['dark', 'light', 'cyberpunk', 'matcha', 'dracula', 'nord', 'synthwave', 'terminal'];

export default function Header({ theme, setTheme }) {
  return (
    <header className="flex justify-between items-center py-4">
      <h1 className="text-4xl font-bold flex items-center gap-3 text-[var(--text-primary)] hover:scale-105 transition-transform cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 fill-[var(--text-secondary)]">
          <path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z"></path>
        </svg>
        SamType
      </h1>
      <div>
        <select 
          className="bg-[var(--bg-secondary)] text-[var(--text-primary)] px-4 py-2 rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-[var(--accent)] font-mono transition-colors shadow-sm"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          {THEMES.map(t => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      </div>
    </header>
  );
}
