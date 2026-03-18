import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBs0K0T_CaY1ykaqOUk9jpXdZnuXLRraas",
  authDomain: "velo-d3b31.firebaseapp.com",
  projectId: "velo-d3b31",
  storageBucket: "velo-d3b31.firebasestorage.app",
  messagingSenderId: "711913337698",
  appId: "1:711913337698:web:b27dbc18dcf2513259723b",
  measurementId: "G-159J0XVT81"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
