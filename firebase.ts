
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const elhautoFirebaseConfig = {
  apiKey: "AIzaSyC0YUGE6hRG9sck7rXcqjaB3he1nRGgbbU",
  authDomain: "elhaji-auto.firebaseapp.com",
  projectId: "elhaji-auto",
  storageBucket: "elhaji-auto.appspot.com",
  messagingSenderId: "596529784342",
  appId: "1:596529784342:web:dfa01b1e33287ce36db737"
};

const elhautoApp = initializeApp(elhautoFirebaseConfig);
const elhautoDb = getFirestore(elhautoApp);
const elhautoAuth = getAuth(elhautoApp);
const elhautoStorage = getStorage(elhautoApp);

export { 
  elhautoDb, elhautoAuth, elhautoStorage, 
  collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot,
  signInWithEmailAndPassword, onAuthStateChanged, signOut,
  ref, uploadBytes, getDownloadURL
};
