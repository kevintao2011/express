import { signInWithEmailAndPassword,getIdToken,createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// import { getFirestore,doc, getDoc } from "firebase/firestore";
import { sendEmailVerification} from 'firebase/auth'


const firebaseConfig = {

    apiKey: "AIzaSyDbbnw-dv3GdWcL80A3ArLuYG4XADXpQWU",

    authDomain: "website-10a80.firebaseapp.com",

    projectId: "website-10a80",

    storageBucket: "website-10a80.appspot.com",

    messagingSenderId: "624906044728",

    appId: "1:624906044728:web:4b40d4983a0b146ed7edcd",

    measurementId: "G-PJ8LEQ6M7W"

  
  };
  

export const app = initializeApp(firebaseConfig);
export const clientAuth = getAuth(app);
export async function loginfirebase(email,password){
    
  console.log('function loginfirebase',email,password);
  const userCredential = await signInWithEmailAndPassword(clientAuth,email,password);
  
  return userCredential;
  
}