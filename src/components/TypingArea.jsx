import React, { useState, useEffect, useRef } from 'react';
import { Globe, RotateCcw } from 'lucide-react';

export default function TypingArea({ words, status, setStatus, timeLeft, setTimeLeft, gameTime, onGameEnd, onRestart }) {
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  
  const [history, setHistory] = useState([]);
  const [errorsThisSecond, setErrorsThisSecond] = useState(0);
  
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const stateRef = useRef({ typedWords: [], currentInput: '', words: [], errorsThisSecond: 0 });

  useEffect(() => {
    stateRef.current = { typedWords, currentInput, words, errorsThisSecond };
  }, [typedWords, currentInput, words, errorsThisSecond]);

  useEffect(() => {
    if (status === 'idle') {
      setTypedWords([]);
      setCurrentWordIndex(0);
      setCurrentInput('');
      setHistory([]);
      setErrorsThisSecond(0);
      clearInterval(timerRef.current);
      if (containerRef.current) {
        containerRef.current.style.marginTop = '0px';
      }
    }
  }, [status, words]);

  const calculateCurrentStats = (state) => {
    let correct = 0;
    let incorrect = 0;
    let extra = 0;
    let missed = 0;
    
    const wordsToProcess = [...state.typedWords];
    if (state.currentInput.length > 0) {
      wordsToProcess.push(state.currentInput);
    }

    wordsToProcess.forEach((typed, i) => {
      const actual = state.words[i];
      if (!actual) return;
      
      const len = Math.max(typed.length, actual.length);
      for (let j = 0; j < len; j++) {
        const actualChar = actual[j];
        const typedChar = typed[j];
        
        if (typedChar) {
          if (typedChar === actualChar) {
            correct++;
          } else {
            if (actualChar) incorrect++;
            else extra++;
          }
        } else if (actualChar) {
          if (i < state.typedWords.length) missed++;
        }
      }
      if (i < state.typedWords.length) {
         correct++; 
      }
    });
    
    const totalTyped = correct + incorrect + extra;
    return { correct, incorrect, extra, missed, totalTyped };
  };

  useEffect(() => {
    if (status === 'typing' && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          const currentSecond = gameTime - prev + 1;
          const state = stateRef.current;
          const stats = calculateCurrentStats(state);
          const timeElapsedMin = currentSecond / 60;
          
          const wpm = timeElapsedMin > 0 ? (stats.correct / 5) / timeElapsedMin : 0;
          const rawWpm = timeElapsedMin > 0 ? (stats.totalTyped / 5) / timeElapsedMin : 0;
          
          setHistory(oldHistory => {
             return [...oldHistory, {
               name: currentSecond,
               wpm: Math.round(wpm),
               raw: Math.round(rawWpm),
               errors: state.errorsThisSecond > 0 ? state.errorsThisSecond : null
             }];
          });
          
          setErrorsThisSecond(0);
          
          if (prev <= 1) {
            clearInterval(timerRef.current);
            // End game requires latest state
            const finalStats = calculateCurrentStats(stateRef.current);
            const finalTimeElapsedMin = gameTime / 60;
            const finalWpm = (finalStats.correct / 5) / finalTimeElapsedMin;
            const finalAccuracy = finalStats.totalTyped > 0 ? (finalStats.correct / (finalStats.correct + finalStats.incorrect + finalStats.extra + finalStats.missed)) * 100 : 0;
            
            // Wait for history state to update, then pass everything
            setHistory(latestHistory => {
               onGameEnd({
                 wpm: finalWpm,
                 accuracy: finalAccuracy,
                 raw: (finalStats.totalTyped / 5) / finalTimeElapsedMin,
                 chars: `${finalStats.correct}/${finalStats.incorrect}/${finalStats.extra}/${finalStats.missed}`,
                 history: latestHistory
               });
               return latestHistory;
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [status]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = (e) => {
    if (status === 'finished') return;
    
    if (e.key === 'Tab' || (e.key === 'Enter' && e.shiftKey)) {
        e.preventDefault();
        onRestart();
        return;
    }

    if (e.key.length !== 1 && e.key !== 'Backspace' && e.key !== ' ') return;
    if (e.ctrlKey || e.altKey || e.metaKey) return;
    
    if (status === 'idle' && e.key.length === 1) {
      setStatus('typing');
    }

    if (e.key === ' ') {
      e.preventDefault();
      if (currentInput.length > 0 || e.key === ' ') { 
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
        const prevWord = typedWords[currentWordIndex - 1];
        setCurrentInput(prevWord);
        setTypedWords(typedWords.slice(0, -1));
        setCurrentWordIndex(currentWordIndex - 1);
      }
      return;
    }

    if (e.key.length === 1) {
      setCurrentInput(prev => prev + e.key);
      // Check for error
      const actualChar = words[currentWordIndex]?.[currentInput.length];
      if (actualChar !== e.key) {
        setErrorsThisSecond(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    const activeWord = containerRef.current?.querySelector('.word-active');
    if (activeWord && containerRef.current) {
      const wrapperRect = containerRef.current.parentElement.getBoundingClientRect();
      const wordRect = activeWord.getBoundingClientRect();
      
      if (wordRect.top > wrapperRect.top + 90) {
        const currentMargin = parseInt(containerRef.current.style.marginTop || '0');
        containerRef.current.style.marginTop = `${currentMargin - 50}px`;
      } 
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
    let isWordIncorrect = false;
    
    for (let i = 0; i < len; i++) {
      let charClass = "text-[var(--text-secondary)] opacity-50"; 
      const actualChar = word[i] || '';
      const typedChar = typedVal[i] || '';
      const isCaretHere = isCurrent && i === typedVal.length;

      if (typedChar) {
        if (typedChar === actualChar) {
          charClass = "text-[var(--text-primary)]";
        } else {
          charClass = actualChar ? "text-[var(--error)]" : "text-[var(--extra)] opacity-70"; 
          isWordIncorrect = true;
        }
      }

      chars.push(
        <span key={i} className={`relative transition-colors duration-100 ${charClass}`}>
          {isCaretHere && isFocused && status !== 'finished' && (
             <span className="absolute left-[-1px] top-[10%] w-[2px] h-[80%] bg-[var(--accent)] caret-blink rounded z-20"></span>
          )}
          {actualChar || typedChar}
        </span>
      );
    }

    const isCaretAtEnd = isCurrent && typedVal.length >= word.length && isFocused && status !== 'finished';
    const wordClass = isTyped && typedVal !== word ? 'border-b-2 border-[var(--error)] pb-1' : '';

    return (
      <div key={index} className={`inline-block mx-[6px] text-[32px] font-mono tracking-wide ${isCurrent ? 'word-active' : ''} ${wordClass}`}>
        {chars}
        {isCaretAtEnd && (
          <span className="relative">
             <span className="absolute left-[-1px] top-[10%] w-[2px] h-[80%] bg-[var(--accent)] caret-blink rounded z-20"></span>
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center w-full">
      {status === 'idle' && (
        <div className="flex justify-center items-center gap-2 text-[var(--text-secondary)] mb-6 text-sm">
          <Globe className="w-4 h-4" /> english
        </div>
      )}
      
      <div 
        className="relative w-full h-[155px] outline-none overflow-hidden"
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
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--bg-color)]/60 backdrop-blur-sm cursor-pointer transition-all duration-300">
            <span className="text-[var(--text-primary)] text-xl flex items-center gap-2 font-medium tracking-wide">
               Click here or press any key to focus
            </span>
          </div>
        )}
        
        <div className={`w-full h-full select-none pt-2 ${!isFocused && status !== 'finished' ? 'opacity-40 grayscale-[50%]' : ''}`}>
          <div 
            ref={containerRef}
            className="text-justify text-justify-inter-word leading-[50px] transition-all duration-300 ease-out"
            style={{ marginTop: '0px' }}
          >
            {words.map((word, index) => renderWord(word, index))}
          </div>
        </div>
      </div>

      <div className={`mt-8 transition-opacity duration-300 ${status === 'typing' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button 
          onClick={onRestart}
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-4 group"
        >
          <RotateCcw className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500 ease-in-out" />
        </button>
      </div>
    </div>
  );
}
