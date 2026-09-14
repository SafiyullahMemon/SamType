import React from 'react';
import { AtSign, Hash, Clock, Type, Quote, Mountain, Wrench } from 'lucide-react';

export default function Controls({ mode, setMode, gameTime, wordCount, setWordCount, onTimeChange }) {
  const TIMES = [15, 30, 60, 120];
  const WORDS = [10, 25, 50, 100];

  return (
    <div className="flex justify-center text-[12px] text-[var(--text-secondary)] font-mono">
      <div className="flex items-center gap-4">
        
        {/* Modifiers */}
        <div className="flex items-center gap-4 bg-[var(--bg-secondary)]/50 rounded-lg px-4 py-1.5 transition-colors">
          <button className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
            <AtSign className="w-3.5 h-3.5" /> punctuation
          </button>
          <button className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
            <Hash className="w-3.5 h-3.5" /> numbers
          </button>
        </div>

        {/* Modes */}
        <div className="flex items-center gap-5 bg-[var(--bg-secondary)]/50 rounded-lg px-4 py-1.5 transition-colors">
          <button 
            onClick={() => setMode('time')}
            className={`flex items-center gap-2 transition-colors ${mode === 'time' ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
          >
            <Clock className="w-3.5 h-3.5" /> time
          </button>
          <button 
            onClick={() => setMode('words')}
            className={`flex items-center gap-2 transition-colors ${mode === 'words' ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
          >
            <Type className="w-3.5 h-3.5" /> words
          </button>
          <button className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
            <Quote className="w-3.5 h-3.5" /> quote
          </button>
          <button className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
            <Mountain className="w-3.5 h-3.5" /> zen
          </button>
          <button className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors">
            <Wrench className="w-3.5 h-3.5" /> custom
          </button>
        </div>

        {/* Values */}
        <div className="flex items-center gap-4 bg-[var(--bg-secondary)]/50 rounded-lg px-4 py-1.5 transition-colors">
          {mode === 'time' && TIMES.map(t => (
            <button
              key={t}
              onClick={() => onTimeChange(t)}
              className={`transition-colors ${gameTime === t ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
            >
              {t}
            </button>
          ))}
          {mode === 'words' && WORDS.map(w => (
            <button
              key={w}
              onClick={() => setWordCount(w)}
              className={`transition-colors ${wordCount === w ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
            >
              {w}
            </button>
          ))}
          <button className="hover:text-[var(--text-primary)] transition-colors ml-2">
            <Wrench className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
