import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyDFQ0ga_0X3WIVI-IsXVzXYncWhH1fun2c",
  authDomain: "book-santa-31135.firebaseapp.com",
  projectId: "book-santa-31135",
  storageBucket: "book-santa-31135.appspot.com",
  messagingSenderId: "49524353893",
  appId: "1:49524353893:web:6881b99a8d2a94700b4f8c"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
