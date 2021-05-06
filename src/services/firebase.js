import firebase from 'firebase/app';
import 'firebase/auth';

// import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCOQjGHguyqU3IYb9oWuFmivQSurQM60KE",
  authDomain: "code-sniper.firebaseapp.com",
  projectId: "code-sniper",
  storageBucket: "code-sniper.appspot.com",
  messagingSenderId: "108558921172",
  appId: "1:108558921172:web:dd0ad91f7480733959fa41"
};

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

function login() {
  auth.signInWithPopup(provider);
}

function logout() {
  auth.signOut();
}

export {
  auth,
  login,
  logout,
}
