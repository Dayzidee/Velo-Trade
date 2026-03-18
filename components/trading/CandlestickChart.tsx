import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, ColorType, CandlestickSeries, LineSeries } from 'lightweight-charts';
import { Candle } from '../../hooks/useMarketData';
import { useIndicators } from '../../hooks/useIndicators';

interface CandlestickChartProps {
  candles: Candle[];
  currentPrice: number;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ candles, currentPrice }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const ma7SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const ma25SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const ma99SeriesRef = useRef<ISeriesApi<'Line'> | null>(null);

  const { ma7, ma25, ma99 } = useIndicators(candles);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#71717a',
        fontSize: 10,
        fontFamily: 'Inter, sans-serif',
      },
      grid: {
        vertLines: { color: 'rgba(30, 41, 59, 0.3)' },
        horzLines: { color: 'rgba(30, 41, 59, 0.3)' },
      },
      crosshair: {
        mode: 0,
        vertLine: {
          color: '#6366f1',
          width: 1,
          style: 3, 
          labelBackgroundColor: '#6366f1',
        },
        horzLine: {
          color: '#6366f1',
          width: 1,
          style: 3,
          labelBackgroundColor: '#6366f1',
        },
      },
      timeScale: {
        borderColor: 'rgba(30, 41, 59, 0.5)',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        vertTouchDrag: false,
      },
      rightPriceScale: {
        borderColor: 'rgba(30, 41, 59, 0.5)',
        scaleMargins: {
          top: 0.1,
          bottom: 0.2,
        },
      },
    });

    // Use addSeries for v4 compatibility
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#f43f5e',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#f43f5e',
    });

    const ma7Series = chart.addSeries(LineSeries, { color: '#fbbf24', lineWidth: 1, title: 'MA7' });
    const ma25Series = chart.addSeries(LineSeries, { color: '#c084fc', lineWidth: 1, title: 'MA25' });
    const ma99Series = chart.addSeries(LineSeries, { color: '#60a5fa', lineWidth: 1, title: 'MA99' });

    chartRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    ma7SeriesRef.current = ma7Series;
    ma25SeriesRef.current = ma25Series;
    ma99SeriesRef.current = ma99Series;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ 
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight 
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!candlestickSeriesRef.current || candles.length === 0) return;

    const sortedCandles = [...candles].sort((a, b) => a.time - b.time);
    candlestickSeriesRef.current.setData(sortedCandles);

    if (ma7SeriesRef.current) {
      ma7SeriesRef.current.setData(ma7.map((val, i) => ({ 
        time: candles[i]?.time, 
        value: val 
      })).filter(d => d.value !== null && d.time) as any);
    }
    if (ma25SeriesRef.current) {
      ma25SeriesRef.current.setData(ma25.map((val, i) => ({ 
        time: candles[i]?.time, 
        value: val 
      })).filter(d => d.value !== null && d.time) as any);
    }
    if (ma99SeriesRef.current) {
      ma99SeriesRef.current.setData(ma99.map((val, i) => ({ 
        time: candles[i]?.time, 
        value: val 
      })).filter(d => d.value !== null && d.time) as any);
    }
  }, [candles, ma7, ma25, ma99]);

  return (
    <div className="w-full h-full relative group">
      <div ref={chartContainerRef} className="w-full h-full" />
      
      <div className="absolute top-4 left-4 z-10 flex gap-4 pointer-events-none">
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#fbbf24]" />
          <span className="text-[10px] font-bold text-[#fbbf24] uppercase">MA7</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#c084fc]" />
          <span className="text-[10px] font-bold text-[#c084fc] uppercase">MA25</span>
        </div>
        <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
          <div className="w-2 h-2 rounded-full bg-[#60a5fa]" />
          <span className="text-[10px] font-bold text-[#60a5fa] uppercase">MA99</span>
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;
