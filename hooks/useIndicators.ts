import { useMemo } from 'react';

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const useIndicators = (candles: Candle[]) => {
  const ma7 = useMemo(() => calculateSMA(candles, 7), [candles]);
  const ma25 = useMemo(() => calculateSMA(candles, 25), [candles]);
  const ma99 = useMemo(() => calculateSMA(candles, 99), [candles]);

  return { ma7, ma25, ma99 };
};

const calculateSMA = (candles: Candle[], period: number) => {
  if (candles.length < period) return [];

  const sma: (number | null)[] = new Array(candles.length).fill(null);

  for (let i = period - 1; i < candles.length; i++) {
    const sum = candles.slice(i - period + 1, i + 1).reduce((acc, c) => acc + c.close, 0);
    sma[i] = sum / period;
  }

  return sma;
};
