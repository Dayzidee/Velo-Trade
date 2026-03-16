import React, { useMemo } from 'react';
import { Candle } from '../../hooks/useBinanceData';
import { useIndicators } from '../../hooks/useIndicators';

interface CandlestickChartProps {
  candles: Candle[];
  currentPrice: number;
}

const VISIBLE_CANDLES = 60;
const CHART_PADDING_TOP = 30;
const CHART_PADDING_BOTTOM = 40;
const CHART_PADDING_RIGHT = 90;

const CandlestickChart: React.FC<CandlestickChartProps> = ({ candles, currentPrice }) => {
  const visibleCandles = candles.slice(-VISIBLE_CANDLES);

  const { maxPrice, priceRange } = useMemo(() => {
    if (visibleCandles.length === 0) return { maxPrice: 0, priceRange: 1 };
    let min = Infinity, max = -Infinity;
    for (const c of visibleCandles) {
      if (c.low < min) min = c.low;
      if (c.high > max) max = c.high;
    }
    const padding = (max - min) * 0.1 || 1;
    return { maxPrice: max + padding, priceRange: (max + padding) - (min - padding) };
  }, [visibleCandles]);

  const { ma7, ma25, ma99 } = useIndicators(candles);

  // Sync indicators with visible candles
  const visibleMA7 = ma7.slice(-VISIBLE_CANDLES);
  const visibleMA25 = ma25.slice(-VISIBLE_CANDLES);
  const visibleMA99 = ma99.slice(-VISIBLE_CANDLES);

  const maxVolume = useMemo(() => {
    return Math.max(...visibleCandles.map(c => c.volume), 1);
  }, [visibleCandles]);

  const toY = (price: number) => CHART_PADDING_TOP + ((maxPrice - price) / priceRange) * (500 - CHART_PADDING_TOP - CHART_PADDING_BOTTOM);
  const chartWidth = 1000 - CHART_PADDING_RIGHT;
  const candleWidth = chartWidth / VISIBLE_CANDLES;

  const renderMA = (data: (number | null)[], color: string) => {
    const points = data
      .map((val, i) => {
        if (val === null) return null;
        const x = i * candleWidth + candleWidth / 2;
        const y = toY(val);
        return `${x},${y}`;
      })
      .filter(p => p !== null)
      .join(' ');

    return <polyline points={points} fill="none" stroke={color} strokeWidth="1" strokeLinejoin="round" opacity="0.8" />;
  };

  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 500">
      <defs>
        <linearGradient id="bullGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="bearGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {Array.from({ length: 6 }).map((_, i) => {
        const y = CHART_PADDING_TOP + ((500 - CHART_PADDING_TOP - CHART_PADDING_BOTTOM) / 5) * i;
        const price = maxPrice - (priceRange / 5) * i;
        return (
          <g key={`grid-h-${i}`}>
            <line x1="0" y1={y} x2={1000 - CHART_PADDING_RIGHT} y2={y} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="3 3" />
            <text x={1000 - CHART_PADDING_RIGHT + 8} y={y + 4} fill="#52525b" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="600">
              {price.toFixed(2)}
            </text>
          </g>
        );
      })}

      {/* Volume bars */}
      {visibleCandles.map((candle, i) => {
        const chartWidth = 1000 - CHART_PADDING_RIGHT;
        const candleWidth = chartWidth / VISIBLE_CANDLES;
        const x = i * candleWidth;
        const volHeight = (candle.volume / maxVolume) * 60;
        const isBullish = candle.close >= candle.open;
        return (
          <rect
            key={`vol-${i}`}
            x={x + candleWidth * 0.15}
            y={500 - CHART_PADDING_BOTTOM - volHeight}
            width={candleWidth * 0.7}
            height={volHeight}
            fill={isBullish ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)'}
          />
        );
      })}

      {/* MA Overlays */}
      {renderMA(visibleMA7, '#fbbf24')}  {/* MA7 - Amber */}
      {renderMA(visibleMA25, '#c084fc')} {/* MA25 - Purple */}
      {renderMA(visibleMA99, '#60a5fa')} {/* MA99 - Blue */}

      {/* Candlesticks */}
      {visibleCandles.map((candle, i) => {
        const chartHeight = 500 - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;
        const x = i * candleWidth;
        const isBullish = candle.close >= candle.open;
        const highY = toY(candle.high);
        const lowY = toY(candle.low);
        const openY = toY(candle.open);
        const closeY = toY(candle.close);
        const bodyTop = Math.min(openY, closeY);
        const bodyHeight = Math.max(Math.abs(closeY - openY), 1);
        const wickX = x + candleWidth / 2;
        return (
          <g key={`candle-${i}`}>
            <line x1={wickX} y1={highY} x2={wickX} y2={lowY} stroke={isBullish ? '#10b981' : '#f43f5e'} strokeWidth="1.2" />
            <rect x={x + candleWidth * 0.2} y={bodyTop} width={candleWidth * 0.6} height={bodyHeight} fill={isBullish ? '#10b981' : '#f43f5e'} rx="1" />
          </g>
        );
      })}

      {/* Current price line */}
      {currentPrice > 0 && (() => {
        const chartHeight = 500 - CHART_PADDING_TOP - CHART_PADDING_BOTTOM;
        const y = CHART_PADDING_TOP + ((maxPrice - currentPrice) / priceRange) * chartHeight;
        const isBullish = visibleCandles.length > 1 && currentPrice >= visibleCandles[visibleCandles.length - 2]?.close;
        return (
          <g>
            <line x1="0" y1={y} x2={1000 - CHART_PADDING_RIGHT} y2={y} stroke={isBullish ? '#10b981' : '#f43f5e'} strokeWidth="1" strokeDasharray="4 3" opacity="0.6" />
            <rect x={1000 - CHART_PADDING_RIGHT} y={y - 11} width={CHART_PADDING_RIGHT - 4} height="22" rx="4" fill={isBullish ? '#10b981' : '#f43f5e'} />
            <text x={1000 - CHART_PADDING_RIGHT + (CHART_PADDING_RIGHT - 4) / 2} y={y + 4} textAnchor="middle" fill="white" fontSize="10" fontFamily="Inter, sans-serif" fontWeight="700">
              {currentPrice.toFixed(2)}
            </text>
          </g>
        );
      })()}

      {/* Time axis labels */}
      {visibleCandles.filter((_, i) => i % 10 === 0).map((candle, idx) => {
        const chartWidth = 1000 - CHART_PADDING_RIGHT;
        const candleWidth = chartWidth / VISIBLE_CANDLES;
        const origIdx = visibleCandles.indexOf(candle);
        const x = origIdx * candleWidth + candleWidth / 2;
        const d = new Date(candle.time);
        const label = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
        return (
          <text key={`time-${idx}`} x={x} y={500 - 8} textAnchor="middle" fill="#52525b" fontSize="9" fontFamily="Inter, sans-serif" fontWeight="600">
            {label}
          </text>
        );
      })}
      {/* Legend */}
      <g transform="translate(10, 20)">
        <circle cx="5" cy="5" r="3" fill="#fbbf24" />
        <text x="12" y="8" fill="#fbbf24" fontSize="8" fontWeight="bold">MA7</text>
        <circle cx="45" cy="5" r="3" fill="#c084fc" />
        <text x="52" y="8" fill="#c084fc" fontSize="8" fontWeight="bold">MA25</text>
        <circle cx="85" cy="5" r="3" fill="#60a5fa" />
        <text x="92" y="8" fill="#60a5fa" fontSize="8" fontWeight="bold">MA99</text>
      </g>
    </svg>
  );
};

export default CandlestickChart;
