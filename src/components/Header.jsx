import React from 'react';
import { Keyboard, Crown, Info, Settings, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 text-[var(--text-secondary)]">
      <div className="flex items-center gap-6">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-[var(--text-primary)] cursor-pointer group">
          <div className="relative flex flex-col items-center justify-center bg-transparent border-2 border-[var(--text-primary)] w-10 h-8 rounded text-[var(--text-primary)] group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-color)] transition-colors">
             <span className="font-bold text-[10px] leading-none mt-0.5">sam</span>
             <span className="font-bold text-[10px] leading-none mb-0.5">type</span>
          </div>
          samtype
        </h1>
        
        <div className="flex items-center gap-5 mt-1 ml-4">
          <Keyboard className="w-[18px] h-[18px] cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
          <Crown className="w-[18px] h-[18px] cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
          <Info className="w-[18px] h-[18px] cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
          <Settings className="w-[18px] h-[18px] cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
        </div>
      </div>

      <div className="flex items-center gap-5 mt-1">
        <Bell className="w-[18px] h-[18px] cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
        <User className="w-[18px] h-[18px] cursor-pointer hover:text-[var(--text-primary)] transition-colors" />
      </div>
    </header>
  );
}
