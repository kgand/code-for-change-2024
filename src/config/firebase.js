import firebase from "firebase";

let firebaseConfig = {
    apiKey: "AIzaSyDKyiXkDh6aZ2kJji7AufQ2tTeiHzFojZo",
    authDomain: "code-for-change-updated-2024.firebaseapp.com",
    projectId: "code-for-change-updated-2024",
    storageBucket: "code-for-change-updated-2024.appspot.com",
    messagingSenderId: "146558348997",
    appId: "1:146558348997:web:3bc785c286bb5082c50aac",
    measurementId: "G-9B77HKBB5H"
  };
  

let firebaseApp = firebase.initializeApp(firebaseConfig);
export let firebaseAuth = firebaseApp.auth();
export let firebaseStorage = firebaseApp.storage();
export let firebaseDB = firebaseApp.firestore();
export let timeStamp = firebase.firestore.FieldValue.serverTimestamp;