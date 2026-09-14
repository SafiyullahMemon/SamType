import React, { useState, useEffect, useRef } from 'react';

export default function TypingArea({ words, status, setStatus, timeLeft, setTimeLeft, gameTime, onGameEnd }) {
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (status === 'idle') {
      setTypedWords([]);
      setCurrentWordIndex(0);
      setCurrentInput('');
      clearInterval(timerRef.current);
      if (containerRef.current) {
        containerRef.current.style.marginTop = '0px';
      }
    }
  }, [status, words]);

  useEffect(() => {
    if (status === 'typing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const endGame = () => {
    let correctChars = 0;
    let totalChars = 0;
    
    // Calculate based on typed words, including the current one if partially typed
    const wordsToProcess = [...typedWords];
    if (currentInput.length > 0) {
      wordsToProcess.push(currentInput);
    }

    wordsToProcess.forEach((typed, i) => {
      const actual = words[i];
      if (!actual) return;
      const len = Math.max(typed.length, actual.length);
      for (let j = 0; j < len; j++) {
        totalChars++;
        if (typed[j] === actual[j]) {
          correctChars++;
        }
      }
      // Add space character for completed words
      if (i < typedWords.length) {
         totalChars++;
         if (typed === actual) correctChars++;
      }
    });

    const wpm = (correctChars / 5) / (gameTime / 60);
    const accuracy = totalChars > 0 ? (correctChars / totalChars) * 100 : 0;
    
    onGameEnd(wpm, accuracy);
  };

  const handleKeyDown = (e) => {
    if (status === 'finished') return;
    
    // Ignore modifier keys
    if (e.key.length !== 1 && e.key !== 'Backspace' && e.key !== ' ') return;
    
    if (status === 'idle' && e.key.length === 1) {
      setStatus('typing');
    }

    // Prevent scrolling for spacebar
    if (e.key === ' ') {
      e.preventDefault();
      if (currentInput.length > 0 || e.key === ' ') { // Allow space even if current input is empty to move forward
        setTypedWords([...typedWords, currentInput]);
        setCurrentWordIndex(currentWordIndex + 1);
        setCurrentInput('');
      }
      return;
    }

    if (e.key === 'Backspace') {
      if (currentInput.length > 0) {
        setCurrentInput(currentInput.slice(0, -1));
      } else if (currentWordIndex > 0) {
        // Go back to previous word
        const prevWord = typedWords[currentWordIndex - 1];
        setCurrentInput(prevWord);
        setTypedWords(typedWords.slice(0, -1));
        setCurrentWordIndex(currentWordIndex - 1);
      }
      return;
    }

    if (e.key.length === 1) {
      setCurrentInput(prev => prev + e.key);
    }
  };

  // Scroll active line into view smoothly using negative margin
  useEffect(() => {
    const activeWord = containerRef.current?.querySelector('.word-active');
    if (activeWord && containerRef.current) {
      const wrapperRect = containerRef.current.parentElement.getBoundingClientRect();
      const wordRect = activeWord.getBoundingClientRect();
      
      // If the active word drops below the 2nd line
      if (wordRect.top > wrapperRect.top + 90) {
        const currentMargin = parseInt(containerRef.current.style.marginTop || '0');
        containerRef.current.style.marginTop = `${currentMargin - 50}px`;
      } 
      // If the active word goes above the visible area (e.g. backspacing a lot)
      else if (wordRect.top < wrapperRect.top && currentWordIndex > 0) {
        const currentMargin = parseInt(containerRef.current.style.marginTop || '0');
        containerRef.current.style.marginTop = `${currentMargin + 50}px`;
      }
    }
  }, [currentWordIndex, currentInput]);


  const renderWord = (word, index) => {
    const isCurrent = index === currentWordIndex;
    const isTyped = index < currentWordIndex;
    const typedVal = isCurrent ? currentInput : (isTyped ? typedWords[index] : '');
    
    const chars = [];
    const len = Math.max(word.length, typedVal.length);
    
    for (let i = 0; i < len; i++) {
      let charClass = "text-[var(--text-secondary)]";
      const actualChar = word[i] || '';
      const typedChar = typedVal[i] || '';
      const isCaretHere = isCurrent && i === typedVal.length;

      if (typedChar) {
        if (typedChar === actualChar) {
          charClass = "text-[var(--text-primary)]";
        } else {
          charClass = actualChar ? "text-[var(--error)]" : "text-[var(--extra)] text-red-500 drop-shadow-md"; 
        }
      }

      chars.push(
        <span key={i} className={`relative transition-colors duration-100 ${charClass}`}>
          {isCaretHere && isFocused && status !== 'finished' && (
             <span className="absolute left-[-1px] top-[10%] w-[2px] h-[80%] bg-[var(--accent)] caret-blink rounded z-20 shadow-[0_0_8px_var(--accent)]"></span>
          )}
          {actualChar || typedChar}
        </span>
      );
    }

    // Caret at the end of the word if we typed all chars or more
    const isCaretAtEnd = isCurrent && typedVal.length >= word.length && isFocused && status !== 'finished';

    return (
      <div key={index} className={`inline-block mx-[6px] text-[28px] font-mono tracking-wide ${isCurrent ? 'word-active' : ''}`}>
        {chars}
        {isCaretAtEnd && (
          <span className="relative">
             <span className="absolute left-[-1px] top-[10%] w-[2px] h-[80%] bg-[var(--accent)] caret-blink rounded z-20 shadow-[0_0_8px_var(--accent)]"></span>
          </span>
        )}
      </div>
    );
  };

  return (
    <div 
      className="relative w-full h-[160px] rounded-xl outline-none bg-[var(--bg-secondary)]/20 shadow-inner overflow-hidden border border-[var(--bg-secondary)]"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onClick={(e) => {
         e.currentTarget.focus();
         setIsFocused(true);
      }}
    >
      {!isFocused && status !== 'finished' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--bg-color)]/60 backdrop-blur-[4px] cursor-pointer transition-all duration-300">
          <span className="text-[var(--text-primary)] text-xl flex items-center gap-2 font-medium tracking-wide">
             Click or press any key to focus
          </span>
        </div>
      )}
      
      <div className={`w-full h-full select-none pt-2 px-6 ${!isFocused && status !== 'finished' ? 'opacity-40 grayscale-[50%]' : ''} ${status === 'finished' ? 'opacity-30' : ''}`}>
        <div 
          ref={containerRef}
          className="text-justify text-justify-inter-word leading-[50px] transition-all duration-300 ease-out"
          style={{ marginTop: '0px' }}
        >
          {words.map((word, index) => renderWord(word, index))}
        </div>
      </div>
    </div>
  );
}
