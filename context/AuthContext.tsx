import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { 
  doc, 
  onSnapshot, 
  setDoc,
  updateDoc 
} from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  userData: any | null;
  isAdmin: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch additional user data from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const unsubscribeDoc = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            
            // Auto-promote if master email and not admin yet
            if (user.email === 'inudoyin@gmail.com' && !data.isAdmin) {
              await updateDoc(userDocRef, { isAdmin: true });
              // onSnapshot will trigger again after update
            }
            
            setUserData(data);
            setIsAdmin(data.isAdmin === true);
          } else {
            // Initialize user data if it doesn't exist
            const initialData = {
              email: user.email,
              displayName: user.displayName || 'Velo Trader',
              demoBalance: 10000,
              realBalance: 0,
              tier: 'Bronze',
              createdAt: new Date().toISOString(),
              isAdmin: user.email === 'inudoyin@gmail.com' // Grant initial admin to master
            };
            setDoc(userDocRef, initialData);
            setUserData(initialData);
            setIsAdmin(initialData.isAdmin);
          }
          setLoading(false);
        });
        return () => unsubscribeDoc(); // Cleanup for onSnapshot
      } else {
        setUserData(null);
        setIsAdmin(false);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup for onAuthStateChanged
  }, []);

  const signOut = () => firebaseSignOut(auth);

  return (
    <AuthContext.Provider value={{ user, userData, isAdmin, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
