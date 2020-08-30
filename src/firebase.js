import firebase from 'firebase/app';
import 'firebase/firestore';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBb1fJvaZuq4fykLpfqrKW4xVQ0JEOk2Ow",
  authDomain: "crud-react-8078e.firebaseapp.com",
  databaseURL: "https://crud-react-8078e.firebaseio.com",
  projectId: "crud-react-8078e",
  storageBucket: "crud-react-8078e.appspot.com",
  messagingSenderId: "965777779930",
  appId: "1:965777779930:web:523e616d331108663609e3"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();