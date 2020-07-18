import firebase from 'firebase';

const firebaseapp = firebase.initializeApp({
  /* apiKey: <YOUR_DATA>,
  authDomain: <YOUR_DATA>,
  databaseURL: <YOUR_DATA>,
  projectId: <YOUR_DATA>,
  storageBucket: <YOUR_DATA>,
  messagingSenderId: <YOUR_DATA>,
  appId: <YOUR_DATA>" */
});

const db = firebaseapp.firestore();

export default db;