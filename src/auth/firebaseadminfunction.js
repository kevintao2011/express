import { signInWithEmailAndPassword,getIdToken,createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// import { getFirestore,doc, getDoc } from "firebase/firestore";
import { sendEmailVerification} from 'firebase/auth'
import { clientAuth } from "./firebaseclientfunction.js";

// const firebaseConfig = {
//     apiKey: process.env.FIREBASE_apikey,

//     authDomain: process.env.FIREBASE_authDomain,

//     projectId: process.env.FIREBASE_projectId,

//     storageBucket: process.env.FIREBASE_storageBucket,

//     messagingSenderId: process.env.FIREBASE_messagingSenderId,

//     appId: process.env.FIREBASE_appId,

//     measurementId: process.env.FIREBASE_measurementId

// };
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
export const adminAuth = getAuth(app);





export async function register (email,password){
    var result;
  
    try{
        result = await createUserWithEmailAndPassword(clientAuth, email, password);
        console.log("account has been registered");
        sendEmailVerification(result.user);
        return result.user
    }
    catch(e){

        console.log("function register Error:",e.code);
        throw e
        
    }
    
}

