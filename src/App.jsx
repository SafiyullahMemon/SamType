import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import TypingArea from './components/TypingArea';
import Results from './components/Results';
import Footer from './components/Footer';
import quotes from './data/quotes';

const WORDS = 'house hand a out few home all over leave give work real back develop some we long form person ask year still all good since look group as also know early however well most after through in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');

const PUNCTUATION_MARKS = ['.', ',', '!', '?', ';', ':'];

function applyPunctuation(wordList) {
  const result = [...wordList];
  let sentenceLen = 0;
  const targetSentenceLen = () => Math.floor(Math.random() * 8) + 4; // 4-11 words per sentence
  let nextSentenceEnd = targetSentenceLen();

  // Capitalize first word
  if (result.length > 0) {
    result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1);
  }

  for (let i = 0; i < result.length; i++) {
    sentenceLen++;

    if (sentenceLen >= nextSentenceEnd && i < result.length - 1) {
      // End of sentence
      const mark = Math.random() < 0.7 ? '.' : (Math.random() < 0.5 ? '!' : '?');
      result[i] = result[i] + mark;
      // Capitalize next word
      if (i + 1 < result.length) {
        result[i + 1] = result[i + 1].charAt(0).toUpperCase() + result[i + 1].slice(1);
      }
      sentenceLen = 0;
      nextSentenceEnd = targetSentenceLen();
    } else if (Math.random() < 0.1 && sentenceLen > 1) {
      // Random comma
      result[i] = result[i] + ',';
    } else if (Math.random() < 0.03) {
      // Rare semicolon
      result[i] = result[i] + ';';
    } else if (Math.random() < 0.04) {
      // Wrap in quotes
      result[i] = '"' + result[i] + '"';
    } else if (Math.random() < 0.03) {
      // Apostrophe words
      const contractions = ["don't", "can't", "won't", "it's", "I'm", "we're", "they're", "you're"];
      result[i] = contractions[Math.floor(Math.random() * contractions.length)];
    }
  }

  // End last word with period if it doesn't have punctuation
  if (result.length > 0) {
    const lastWord = result[result.length - 1];
    const lastChar = lastWord[lastWord.length - 1];
    if (!PUNCTUATION_MARKS.includes(lastChar) && lastChar !== '"') {
      result[result.length - 1] = lastWord + '.';
    }
  }

  return result;
}

function applyNumbers(wordList) {
  const result = [...wordList];
  for (let i = 0; i < result.length; i++) {
    if (Math.random() < 0.15) {
      const digits = Math.floor(Math.random() * 4) + 1; // 1-4 digits
      result[i] = String(Math.floor(Math.random() * Math.pow(10, digits)));
    }
  }
  return result;
}

function App() {
  const [theme, setTheme] = useState('dark');
  const [gameTime, setGameTime] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [status, setStatus] = useState('idle'); // idle, typing, finished
  const [words, setWords] = useState([]);
  const [stats, setStats] = useState(null);
  const [mode, setMode] = useState('time');
  const [wordCount, setWordCount] = useState(50);
  const [punctuation, setPunctuation] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [quoteLength, setQuoteLength] = useState('medium');
  const [customValue, setCustomValue] = useState(30);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const generateWords = useCallback((options = {}) => {
    const currentMode = options.mode || mode;
    const usePunctuation = options.punctuation ?? punctuation;
    const useNumbers = options.numbers ?? numbers;
    const currentQuoteLength = options.quoteLength || quoteLength;
    const count = options.wordCount || wordCount;

    let newWords = [];

    if (currentMode === 'quote') {
      // Pick a random quote of the specified length
      const filtered = quotes.filter(q => q.length === currentQuoteLength);
      const quote = filtered[Math.floor(Math.random() * filtered.length)];
      newWords = quote.text.split(' ');
    } else {
      // Generate random words
      const totalWords = currentMode === 'words' ? count : (currentMode === 'custom' ? (options.customValue || customValue) : 200);
      for (let i = 0; i < totalWords; i++) {
        newWords.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      }

      // Apply punctuation and numbers transforms (not on quotes - they have their own punctuation)
      if (usePunctuation) {
        newWords = applyPunctuation(newWords);
      }
      if (useNumbers) {
        newWords = applyNumbers(newWords);
      }
    }

    setWords(newWords);
  }, [mode, punctuation, numbers, quoteLength, wordCount, customValue]);

  const startNewGame = useCallback((options = {}) => {
    const newMode = options.mode || mode;
    const newTime = options.time || gameTime;

    if (newMode === 'time') {
      setGameTime(newTime);
      setTimeLeft(newTime);
    } else if (newMode === 'custom') {
      // Custom uses the custom value as time
      setGameTime(options.customValue || customValue);
      setTimeLeft(options.customValue || customValue);
    } else {
      // words, quote, zen - no countdown timer needed
      setTimeLeft(0);
    }

    setStatus('idle');
    setElapsedTime(0);
    setStats(null);
    generateWords(options);
  }, [mode, gameTime, customValue, generateWords]);

  useEffect(() => {
    startNewGame();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleModeChange = (newMode) => {
    setMode(newMode);
    startNewGame({ mode: newMode });
  };

  const handleTimeChange = (t) => {
    setGameTime(t);
    startNewGame({ time: t, mode: 'time' });
  };

  const handleWordCountChange = (w) => {
    setWordCount(w);
    startNewGame({ mode: 'words', wordCount: w });
  };

  const handleQuoteLengthChange = (len) => {
    setQuoteLength(len);
    startNewGame({ mode: 'quote', quoteLength: len });
  };

  const handleCustomValueChange = (val) => {
    setCustomValue(val);
    startNewGame({ mode: 'custom', customValue: val });
  };

  const handlePunctuationToggle = () => {
    const newVal = !punctuation;
    setPunctuation(newVal);
    startNewGame({ punctuation: newVal });
  };

  const handleNumbersToggle = () => {
    const newVal = !numbers;
    setNumbers(newVal);
    startNewGame({ numbers: newVal });
  };

  const handleGameEnd = (statsObj) => {
    setStatus('finished');
    setStats(statsObj);
    setTimeLeft(0);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between p-8 transition-colors duration-300 selection:bg-[var(--accent)] selection:text-[var(--bg-color)] font-mono text-[var(--text-primary)] relative">
      <div className="max-w-[1250px] w-full mx-auto flex flex-col h-full">
        
        <Header />

        <div className="flex-grow flex flex-col justify-center gap-8 mt-12 mb-20 relative">
          
          <div className={`transition-opacity duration-300 flex justify-center ${status === 'typing' ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Controls 
              mode={mode}
              setMode={handleModeChange}
              gameTime={gameTime} 
              wordCount={wordCount}
              setWordCount={handleWordCountChange}
              onTimeChange={handleTimeChange}
              punctuation={punctuation}
              onPunctuationToggle={handlePunctuationToggle}
              numbers={numbers}
              onNumbersToggle={handleNumbersToggle}
              quoteLength={quoteLength}
              onQuoteLengthChange={handleQuoteLengthChange}
              customValue={customValue}
              onCustomValueChange={handleCustomValueChange}
            />
          </div>

          <div className="relative w-full flex justify-center mt-4">
            <div className="max-w-[1100px] w-full">
              {status === 'finished' ? (
                <Results 
                  stats={stats} 
                  gameTime={gameTime}
                  mode={mode}
                  elapsedTime={elapsedTime}
                  onRestart={() => startNewGame()} 
                />
              ) : (
                <TypingArea 
                  words={words} 
                  status={status} 
                  setStatus={setStatus}
                  timeLeft={timeLeft}
                  setTimeLeft={setTimeLeft}
                  gameTime={gameTime}
                  mode={mode}
                  wordCount={wordCount}
                  elapsedTime={elapsedTime}
                  setElapsedTime={setElapsedTime}
                  onGameEnd={handleGameEnd}
                  onRestart={() => startNewGame()}
                />
              )}
            </div>
          </div>

        </div>

        <Footer theme={theme} setTheme={setTheme} />

      </div>
    </div>
  );
}

export default App;
