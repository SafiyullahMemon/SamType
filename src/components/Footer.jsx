import React from 'react';
import { Mail, Heart, GitBranch, MessageSquare, MessageCircle, FileText, Shield, Lock, Palette } from 'lucide-react';

const THEMES = ['dark', 'light', 'cyberpunk', 'matcha', 'dracula', 'nord', 'synthwave', 'terminal'];

export default function Footer({ theme, setTheme }) {
  return (
    <footer className="flex flex-col gap-5 text-xs text-[var(--text-secondary)] pb-2 font-mono">
      <div className="flex justify-center gap-6 text-[10px]">
        <span className="flex items-center gap-1.5">
          <span className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">tab</span> + <span className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">enter</span> - restart test
        </span>
        <span className="flex items-center gap-1.5">
          <span className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">esc</span> or <span className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">ctrl</span> + <span className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">shift</span> + <span className="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-[var(--text-primary)]">p</span> - command line
        </span>
      </div>
      
      <div className="flex justify-end items-center text-[11px]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-[var(--text-primary)] transition-colors group relative">
            <Palette className="w-[14px] h-[14px]" />
            <select 
              className="appearance-none bg-transparent outline-none cursor-pointer text-inherit hover:text-[var(--text-primary)] pr-2"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              {THEMES.map(t => (
                <option key={t} value={t} className="bg-[var(--bg-secondary)]">{t}</option>
              ))}
            </select>
          </div>
          <span className="hover:text-[var(--text-primary)] transition-colors cursor-pointer">v1.0.0</span>
        </div>
      </div>
    </footer>
  );
}
