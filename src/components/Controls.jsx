import React, { useState } from 'react';
import { AtSign, Hash, Clock, Type, Quote, Mountain, Wrench } from 'lucide-react';

export default function Controls({ 
  mode, setMode, gameTime, wordCount, setWordCount, onTimeChange,
  punctuation, onPunctuationToggle, numbers, onNumbersToggle,
  quoteLength, onQuoteLengthChange, customValue, onCustomValueChange
}) {
  const TIMES = [15, 30, 60, 120];
  const WORDS_OPTIONS = [10, 25, 50, 100];
  const QUOTE_LENGTHS = ['short', 'medium', 'long', 'thicc'];
  const [customInput, setCustomInput] = useState(String(customValue));

  const handleCustomSubmit = (e) => {
    if (e.key === 'Enter') {
      const val = parseInt(customInput);
      if (val > 0 && val <= 300) {
        onCustomValueChange(val);
      }
    }
  };

  return (
    <div className="flex justify-center text-[12px] text-[var(--text-secondary)] font-mono">
      <div className="flex items-center gap-4">
        
        {/* Modifiers */}
        <div className="flex items-center gap-4 bg-[var(--bg-secondary)]/50 rounded-lg px-4 py-1.5 transition-colors">
          <button 
            onClick={onPunctuationToggle}
            className={`flex items-center gap-2 transition-colors ${punctuation ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
          >
            <AtSign className="w-3.5 h-3.5" /> punctuation
          </button>
          <button 
            onClick={onNumbersToggle}
            className={`flex items-center gap-2 transition-colors ${numbers ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
          >
            <Hash className="w-3.5 h-3.5" /> numbers
          </button>
        </div>

        {/* Modes */}
        <div className="flex items-center gap-5 bg-[var(--bg-secondary)]/50 rounded-lg px-4 py-1.5 transition-colors">
          {[
            { key: 'time', icon: Clock, label: 'time' },
            { key: 'words', icon: Type, label: 'words' },
            { key: 'quote', icon: Quote, label: 'quote' },
            { key: 'zen', icon: Mountain, label: 'zen' },
            { key: 'custom', icon: Wrench, label: 'custom' },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              className={`flex items-center gap-2 transition-colors ${mode === key ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
            >
              <Icon className="w-3.5 h-3.5" /> {label}
            </button>
          ))}
        </div>

        {/* Values - changes based on active mode */}
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

          {mode === 'words' && WORDS_OPTIONS.map(w => (
            <button
              key={w}
              onClick={() => setWordCount(w)}
              className={`transition-colors ${wordCount === w ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
            >
              {w}
            </button>
          ))}

          {mode === 'quote' && QUOTE_LENGTHS.map(len => (
            <button
              key={len}
              onClick={() => onQuoteLengthChange(len)}
              className={`transition-colors ${quoteLength === len ? 'text-[var(--accent)]' : 'hover:text-[var(--text-primary)]'}`}
            >
              {len}
            </button>
          ))}

          {mode === 'zen' && (
            <span className="text-[var(--text-secondary)] italic">just type</span>
          )}

          {mode === 'custom' && (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={handleCustomSubmit}
                onBlur={() => {
                  const val = parseInt(customInput);
                  if (val > 0 && val <= 300) {
                    onCustomValueChange(val);
                  }
                }}
                className="w-12 bg-transparent border-b border-[var(--text-secondary)] text-[var(--accent)] text-center outline-none focus:border-[var(--accent)] transition-colors"
                min="1"
                max="300"
              />
              <span>seconds</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
