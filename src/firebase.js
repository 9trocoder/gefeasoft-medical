import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyDjynj3M0DYHgiSCl07x-Pygn72hUfZ0fI",
    authDomain: "gefeasoft-medical.firebaseapp.com",
    projectId: "gefeasoft-medical",
    storageBucket: "gefeasoft-medical.appspot.com",
    messagingSenderId: "607441630970",
    appId: "1:607441630970:web:f34286e6e773f7b718bb43",
    measurementId: "G-MTSLBDNCVW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;