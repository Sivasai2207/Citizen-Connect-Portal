/* eslint-disable import/no-extraneous-dependencies */
// Import the functions you need from the SDKs you need
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB2w_jhhEceITiN0vn_jVJ5TuawgpJfOoI',
  authDomain: 'citizen-connect-edfd5.firebaseapp.com',
  projectId: 'citizen-connect-edfd5',
  storageBucket: 'citizen-connect-edfd5.appspot.com',
  messagingSenderId: '1096539816876',
  appId: '1:1096539816876:web:bc03ab308f7ca812fc3009',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
