import React, { useMemo } from 'react';

interface OrderBookProps {
  currentPrice: number;
}

interface OrderItem {
  price: number;
  amount: number;
  total: number;
}

const OrderBook: React.FC<OrderBookProps> = ({ currentPrice }) => {
  const { asks, bids } = useMemo(() => {
    if (currentPrice === 0) return { asks: [], bids: [] };

    const generateOrders = (startPrice: number, step: number, count: number): OrderItem[] => {
      let cumulativeTotal = 0;
      return Array.from({ length: count }).map((_, i) => {
        const price = startPrice + (i + 1) * step;
        const amount = Math.random() * 2 + 0.1;
        cumulativeTotal += amount;
        return { price, amount, total: cumulativeTotal };
      });
    };

    const asks = generateOrders(currentPrice, 0.5, 10).reverse();
    const bids = generateOrders(currentPrice, -0.5, 10);

    return { asks, bids };
  }, [currentPrice]);

  const maxTotal = Math.max(
    ...asks.map(a => a.total),
    ...bids.map(b => b.total),
    1
  );

  return (
    <div className="flex flex-col h-full bg-zinc-950/40 font-mono text-[10px]">
      <div className="grid grid-cols-3 px-3 py-1.5 border-b border-zinc-900 bg-zinc-900/40 text-zinc-500 font-bold uppercase tracking-widest">
        <span>Price</span>
        <span className="text-right">Size</span>
        <span className="text-right">Sum</span>
      </div>

      {/* Asks (Sells) */}
      <div className="flex-1 flex flex-col-reverse overflow-hidden">
        {asks.map((ask, i) => (
          <div key={`ask-${i}`} className="relative group cursor-pointer hover:bg-zinc-800/30">
            <div 
              className="absolute right-0 top-0 bottom-0 bg-rose-500/10 transition-all"
              style={{ width: `${(ask.total / maxTotal) * 100}%` }}
            />
            <div className="grid grid-cols-3 px-3 py-1 relative z-10">
              <span className="text-rose-400 font-bold">{ask.price.toFixed(2)}</span>
              <span className="text-right text-zinc-400">{ask.amount.toFixed(4)}</span>
              <span className="text-right text-zinc-500">{ask.total.toFixed(4)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Spread / Current Price */}
      <div className="py-2 px-3 border-y border-zinc-900 bg-zinc-900/20 text-center">
        <span className="text-sm font-black text-white italic">
          {currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </span>
      </div>

      {/* Bids (Buys) */}
      <div className="flex-1 overflow-hidden">
        {bids.map((bid, i) => (
          <div key={`bid-${i}`} className="relative group cursor-pointer hover:bg-zinc-800/30">
            <div 
              className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 transition-all"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            />
            <div className="grid grid-cols-3 px-3 py-1 relative z-10">
              <span className="text-emerald-400 font-bold">{bid.price.toFixed(2)}</span>
              <span className="text-right text-zinc-400">{bid.amount.toFixed(4)}</span>
              <span className="text-right text-zinc-500">{bid.total.toFixed(4)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderBook;
