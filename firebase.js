// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq5pSuNl9NBcfity-rP7r0D0OkASe4LK4",
  authDomain: "insta-123-98ae7.firebaseapp.com",
  projectId: "insta-123-98ae7",
  storageBucket: "insta-123-98ae7.appspot.com",
  messagingSenderId: "451615253733",
  appId: "1:451615253733:web:4ae1ef4693288e7327e00c"
};

// Initialize Firebase
const app = !firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();
const db=getFirestore(app);
const storage= getStorage(app);
export {db,storage};
