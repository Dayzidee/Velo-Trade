import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  serverTimestamp,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

export interface Trade {
  id: string;
  userId: string;
  symbol: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  amount: number;
  duration: string; // e.g. "00:01:00"
  status: 'open' | 'closed';
  result?: 'win' | 'loss' | 'draw';
  payout?: number;
  timestamp: any;
  expiryTime: number; // UTC timestamp when it should close
  accountType: 'demo' | 'real';
}

export function useTrades() {
  const { user } = useAuth();
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setTrades([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'trades'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tradesData: Trade[] = [];
      snapshot.forEach((doc) => {
        tradesData.push({ id: doc.id, ...doc.data() } as Trade);
      });
      setTrades(tradesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching trades:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const placeTrade = async (tradeData: Omit<Trade, 'id' | 'userId' | 'status' | 'timestamp' | 'expiryTime'>) => {
    if (!user) return;

    // Parse duration to calculate expiryTime
    const [hours, minutes, seconds] = tradeData.duration.split(':').map(Number);
    const durationMs = (hours * 3600 + minutes * 60 + seconds) * 1000;
    const expiryTime = Date.now() + durationMs;

    await addDoc(collection(db, 'trades'), {
      ...tradeData,
      userId: user.uid,
      status: 'open',
      timestamp: serverTimestamp(),
      expiryTime
    });
  };

  return { trades, loading, placeTrade };
}
