import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'fir-tutorial-a8292.firebaseapp.com',
  databaseURL: 'https://fir-tutorial-a8292.firebaseio.com',
  projectId: 'fir-tutorial-a8292',
  storageBucket: '',
  messagingSenderId: '67469922153',
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

export const fireBaseApp = firebase.initializeApp(config);
export const auth = fireBaseApp.auth();
