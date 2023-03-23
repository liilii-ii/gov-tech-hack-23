import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
    apiKey: 'AIzaSyBbsmCwwOPGpCGtPKLAAGoqMDb2JaKZZkU',
    authDomain: 'certaid.firebaseapp.com',
    projectId: 'certaid',
    storageBucket: 'certaid.appspot.com',
    messagingSenderId: '424205064156',
    appId: '1:424205064156:web:8010934f9574c63d40e119'  
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
