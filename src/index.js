import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyDtAi957OJ5zp1MypFB7_zy0qKD0h444yI",
  authDomain: "react-chat-42327.firebaseapp.com",
  projectId: "react-chat-42327",
  storageBucket: "react-chat-42327.appspot.com",
  messagingSenderId: "121397633826",
  appId: "1:121397633826:web:9c9dea4478533a18d27b7b",
  measurementId: "G-Z1DK4Z88DK"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export const Context = React.createContext(null);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{firebase, auth, firestore}}>
    <App />
  </Context.Provider>
);