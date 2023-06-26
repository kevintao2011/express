import { signInWithEmailAndPassword,getIdToken,createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore,doc, getDoc } from "firebase/firestore";
import { sendEmailVerification} from 'firebase/auth'
import { initializeApp } from 'firebase-admin/app';

import { getAuth} from 'firebase-admin/auth'

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

export const appAuth = getAuth(app);

export async function loginfirebase(email,password){
    
    // try{
        const result = await loginfirebase(req.body.email,req.body.password); 
        const jwt =  await result.user.getIdToken() //the session token
        console.log('jwt: ',jwt) //session token
        const uid =  result.user.uid
        console.log('metadata: ',result.user.metadata) //time (createdAt , lastLoginAt,lastSignInTime,creationTime)
        const createdAt = new Date(parseInt(result.user.metadata.createdAt* 1000))
        const lastLoginAt = new Date(parseInt(result.user.metadata.lastLoginAt* 1000))
        const lastSignInTime = new Date(result.user.metadata.lastSignInTime)
        const creationTime = new Date(result.user.metadata.creationTime)
        const expirationTime = new Date(result.user.metadata.expirationTime)
        
        console.log('TokenResult: ',await result.user.getIdTokenResult())
        console.log('emailVerified: ',result.user.emailVerified)
        res.json(result)
    //   }catch (error){
    //     var errorCode = String(error.code)
    //     errorCode=errorCode.replace('-',' ').replace('auth/', '')
    //     res.status(500)
    //     res.json({"code":errorCode})
    //   }
    
}


export async function register (email,password){
    const auth = getAuth(app);
    var result;
  
    try{
        result = await createUserWithEmailAndPassword(auth, email, password);
        console.log("account has been registered");
        sendEmailVerification(result.user);
        return true
    }
    catch(e){

        console.log("function logOutfirebase Error:",e.code);
        throw e;
        
    }
    
}

