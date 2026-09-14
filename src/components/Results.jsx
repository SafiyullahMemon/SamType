import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { RotateCcw, ChevronRight, TriangleAlert, AlignLeft, Rewind, Image as ImageIcon } from 'lucide-react';

const ErrorDot = (props) => {
  const { cx, cy, value } = props;
  if (!value) return null;
  
  return (
    <text 
      x={cx} 
      y={cy - 10} 
      fill="var(--error)" 
      fontSize="14" 
      fontWeight="bold" 
      textAnchor="middle" 
      dominantBaseline="central"
    >
      x
    </text>
  );
};

function calculateConsistency(history) {
  if (!history || history.length < 2) return 0;
  const wpmValues = history.map(h => h.wpm);
  const mean = wpmValues.reduce((a, b) => a + b, 0) / wpmValues.length;
  if (mean === 0) return 0;
  const variance = wpmValues.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / wpmValues.length;
  const stdDev = Math.sqrt(variance);
  // Coefficient of variation inverted to a percentage (lower variance = higher consistency)
  const cv = (stdDev / mean) * 100;
  return Math.max(0, Math.min(100, Math.round(100 - cv)));
}

export default function Results({ stats, gameTime, onRestart }) {
  if (!stats) return null;

  const { wpm, accuracy, raw, chars, history } = stats;
  const consistency = calculateConsistency(history);

  return (
    <div className="w-full flex flex-col items-center results-fade-in font-mono">
      
      <div className="flex w-full justify-between items-stretch">
        
        {/* Left Side: Huge WPM & Acc */}
        <div className="flex flex-col justify-between w-1/4 pr-8 pt-4">
          <div className="flex flex-col mb-4">
            <span className="text-[var(--text-secondary)] text-3xl leading-none">wpm</span>
            <span className="text-[var(--accent)] text-[80px] font-bold leading-none mt-1">{Math.round(wpm)}</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[var(--text-secondary)] text-3xl leading-none">acc</span>
            <span className="text-[var(--accent)] text-[70px] font-bold leading-none mt-1">{Math.round(accuracy)}%</span>
          </div>
          
          <div className="flex flex-col text-[var(--text-secondary)] text-sm mt-8 leading-tight">
            <span>test type</span>
            <span className="text-[var(--accent)]">time {gameTime}</span>
            <span className="text-[var(--accent)]">english</span>
          </div>
        </div>

        {/* Right Side: The Chart */}
        <div className="w-3/4 h-[250px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={history} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--text-secondary)" opacity={0.2} vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{fontSize: 12}} tickMargin={10} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-secondary)" tick={{fontSize: 12}} tickMargin={10} axisLine={false} tickLine={false} domain={[0, 'dataMax + 20']} />
              
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', color: 'var(--text-primary)' }}
                itemStyle={{ color: 'var(--accent)' }}
                labelStyle={{ color: 'var(--text-secondary)', marginBottom: '4px' }}
                cursor={{ stroke: 'var(--text-secondary)', strokeWidth: 1, strokeDasharray: '3 3' }}
              />

              {/* Raw WPM Line */}
              <Line 
                type="monotone" 
                dataKey="raw" 
                stroke="var(--text-secondary)" 
                strokeWidth={2} 
                dot={false}
                activeDot={false}
                isAnimationActive={true}
              />

              {/* Main WPM Line */}
              <Line 
                type="monotone" 
                dataKey="wpm" 
                stroke="var(--accent)" 
                strokeWidth={3} 
                dot={false}
                activeDot={{ r: 5, fill: 'var(--bg-color)', stroke: 'var(--accent)', strokeWidth: 2 }}
                isAnimationActive={true}
              />
              
              {/* Errors (Red X's) */}
              <Line 
                type="monotone" 
                dataKey="errors" 
                stroke="transparent" 
                dot={<ErrorDot />}
                activeDot={false}
                isAnimationActive={false}
                tooltipType="none"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Stats Row */}
      <div className="w-full flex justify-between mt-12 mb-12 px-8 text-lg">
        <div className="flex flex-col">
          <span className="text-[var(--text-secondary)]">raw</span>
          <span className="text-[var(--accent)] text-4xl mt-1">{Math.round(raw)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[var(--text-secondary)]">characters</span>
          <span className="text-[var(--accent)] text-4xl mt-1">{chars}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[var(--text-secondary)]">consistency</span>
          <span className="text-[var(--accent)] text-4xl mt-1">{consistency}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-[var(--text-secondary)]">time</span>
          <span className="text-[var(--accent)] text-4xl mt-1">{gameTime}s</span>
        </div>
      </div>

      {/* Actions Toolbar */}
      <div className="flex gap-14 text-[var(--text-secondary)] mb-6">
        <button onClick={onRestart} className="hover:text-[var(--text-primary)] transition-colors" title="Next test">
          <ChevronRight className="w-[18px] h-[18px]" />
        </button>
        <button onClick={onRestart} className="hover:text-[var(--text-primary)] transition-colors" title="Restart Test">
          <RotateCcw className="w-[18px] h-[18px]" />
        </button>
        <button className="hover:text-[var(--text-primary)] transition-colors" title="Practice Missed Words">
          <TriangleAlert className="w-[18px] h-[18px]" />
        </button>
        <button className="hover:text-[var(--text-primary)] transition-colors" title="Toggle Stats">
          <AlignLeft className="w-[18px] h-[18px]" />
        </button>
        <button className="hover:text-[var(--text-primary)] transition-colors" title="Restart with same seed">
          <Rewind className="w-[18px] h-[18px]" />
        </button>
        <button className="hover:text-[var(--text-primary)] transition-colors" title="Screenshot">
          <ImageIcon className="w-[18px] h-[18px]" />
        </button>
      </div>

    </div>
  );
}
