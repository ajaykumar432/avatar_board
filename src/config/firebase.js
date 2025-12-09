// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD41lDo6eWv_oDarj4zZnRRKZsu7dmImHo",
  authDomain: "avatarbot-54bcc.firebaseapp.com",
  databaseURL: "https://avatarbot-54bcc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "avatarbot-54bcc",
  storageBucket: "avatarbot-54bcc.firebasestorage.app",
  messagingSenderId: "76841413786",
  appId: "1:76841413786:web:1e2e2f82a143bcfd2ac323"
};

// Initialize Firebase App Only Once
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
