import firebase from 'firebase/app';
import "firebase/auth";


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDOBtZu_atyWs2h1F9YHw8pIYU99AM0GUE",
    authDomain: "dietdelights-bh.firebaseapp.com",
    projectId: "dietdelights-bh",
    storageBucket: "dietdelights-bh.appspot.com",
    messagingSenderId: "403601863858",
    appId: "1:403601863858:web:57b99e3233eb1298b785ab"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  export default firebase;