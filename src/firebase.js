import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCa-IspboH3810Fp4GyitgYK7JL93n_PDw",
  authDomain: "task-manager-firebase-ff858.firebaseapp.com",
  projectId: "task-manager-firebase-ff858",
  storageBucket: "task-manager-firebase-ff858.firebasestorage.app",
  messagingSenderId: "668107319767",
  appId: "1:668107319767:web:0a6d0b7a3e2c5e1ec88392",
  measurementId: "G-THE5RYHBL9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);