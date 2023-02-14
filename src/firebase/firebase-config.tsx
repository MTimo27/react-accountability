import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA_RmRq69vfhbtN_PO0kyB-0HZR1pJSLYI',
  authDomain: 'accountability-app-76e68.firebaseapp.com',
  projectId: 'accountability-app-76e68',
  storageBucket: 'accountability-app-76e68.appspot.com',
  messagingSenderId: '756949544916',
  appId: '1:756949544916:web:d606c901e4ec112d697041',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const achivementsCollection = collection(
  db,
  'achivements'
);
