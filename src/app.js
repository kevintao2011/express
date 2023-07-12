import express from "express";
import "dotenv/config";
import editUser from "./utils/user/editUser.js";
import getUser from "./utils/user/getUser.js";
import getinfo from "./utils/info/major.js";
import getProduct from "./utils/getproduct.js";
import createproduct from "./utils/products/createproduct.js";
import { loginfirebase } from "./auth/firebaseclientfunction.js";
import { getUserSociety } from "./utils/info/info.js";
import handleUserLogin from "./utils/user/handleUserLogin.js";
import cors from "cors";
// import https from "https"
// import http from "http"
// import fs from "fs";
// import crypto from "crypto"
// import AUTH_ERROR_CODES from "../auth-errors.js";
import { adminAuth } from "./auth/firebaseadminfunction.js";
import { clientAuth } from "./auth/firebaseclientfunction.js";
import  updateSession  from "./utils/session/updatesession.js"
import { register } from "./auth/firebaseadminfunction.js";
import { getSociety } from "./utils/info/society.js";
import getSocActivity from "./utils/activity/getSocActivity.js";
import createActivity from "./utils/activity/createActivity.js";
import getActivity from "./utils/activity/getactivity.js";
import getSocProduct from "./utils/products/getSocProduct.js";
const app = express()
const port = 3001

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
// app.use(()=>{"get req"})


app.post('/api/edituser',checkAuth, async (req, res) => {
  await editUser(req).then(result=>{
    console.log("result.code",result)
    if(result.code=="success"){
      res.status(200).json(result)
    }
    else{
      res.status(500).json(result)
    }
  })
  
  
})

app.post('/api/getuser',checkAuth, async (req, res) => {
  console.log("calling getuser",req.body)

  const user = await handleUserLogin(req);
  console.log("reutrning",user)
  res.send(JSON.stringify(user))
  //Create user profile on mongo when first log in
  
  
})

function checkAuth  (req, res, next) {
  console.log('middleware - checkauth')
  // console.log('req.body',req.body)
  if (req.body.user.token) {
    adminAuth.verifyIdToken(req.body.user.token)
    
      .then((token) => {
        if(!token.email_verified)
        {
          console.log(token.email,"token.email_verified",token.email_verified)
          res.status(500).send(JSON.stringify({'status':'not-authorized'}))
        }else{
          // console.log('authorized,',token)
          req.body.tokeninfo = token
          // console.log('req,',req.body)
          next()
        }       
      
      }).catch((e) => {
        console.log(e)
        if (e.code == 'auth/id-token-expired') {
          res.status(403).send(JSON.stringify({'status':'expired'}))
        } else {
          res.status(403).send(JSON.stringify({'status':'revoked'}))
        }
    
        
      });
  } else {
   
    res.status(403).send(JSON.stringify({'status':'unauthorized'}))
  }
  console.log('middleware - checked auth')
}
app.post('/api/checkauth',checkAuth, async (req, res) => {
  
  console.log('calling api/checkauth')
  if (req.body.user.token) {
    if (updateSession(req)){
      res.status(200).send(JSON.stringify({'result':"updated"}))
    }else {
      res.status(403).send(JSON.stringify({'result':"failed"}))
    }
    
  } else {
    res.status(403).send(JSON.stringify({'result':'Unauthorized'}))
  }
  
  
})

app.post('/api/product', async (req, res) => {
  const product = await getProduct(req);
  res.send(product);
})

app.post('/api/getusersocieties',checkAuth, async (req, res) => {
  const societies = await getUserSociety(req);
  res.status(200).send(JSON.stringify({societies}))
})



app.get('/api/test', async (req, res) => {
  console.log("test api")
  res.send({"txt":'Hello World!'})
})

app.post('/info', async (req, res) => {
  const result = await getinfo(req);

  
  // res.status(200).send(JSON.stringify({result}))
})

app.get('/api/getjupas', async (req, res) => {
  const result = await getinfo();
  
  res.send(result)
})

app.get('/api/getsocieties', async (req, res) => {
  await getSociety().then(result=>{
    console.log("result",result)
    res.status(200).send(JSON.stringify(result))
  })
 
  
})

app.post('/api/createproduct',async (req, res) => {
  const result = await createproduct(req);  
  res.send(result)
})
app.post('/api/createacticvity',checkAuth,async (req, res) => { //check auth checkpriviledge
  const result = await createActivity(req);  
  res.send(result)
})
app.post('/api/getsocactivity',async (req, res) => { //getsocactivity
  const result = await getSocActivity(req);  
  res.send(result)
})
app.post('/api/getsocproduct',async (req, res) => { //getsocactivity
  const result = await getSocProduct(req);  
  console.log("result",result)
  res.send(result)
})

app.post('/api/getactivity',async (req, res) => { //getsocactivity
  const result = await getActivity(req);  
  res.send(result)
})

//serverside login
app.post('/api/signin',async (req, res) => {
  
  
 
  
  console.log("credentials",req.body)
  // try{
    const result = await loginfirebase(data.email,data.password); 
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
  // }catch (error){
  //   var errorCode = String(error.code)
  //   errorCode=errorCode.replace('-',' ').replace('auth/', '')
  //   res.status(500)
  //   res.json({"code":errorCode})
  // }

  // const idToken = data.jwt
  // console.log("idToken",idToken)
  // adminAuth.verifyIdToken(idToken)
  // .then((decodedToken) => {
  //   const uid = decodedToken.uid;
    
  // })
  // .catch((error) => {
  //   // Handle error (no id)
  // });

  
})
app.post('/api/signup',async (req, res) => {
  var result;
  console.log("Called signup upapi")
  try{
      // console.log(await req.json()) ;
      const data = await req.body;
      console.log('POST DATA',data);
      // console.log('firstname', JSON.parse("data"));
      const userCredential = await register(data.email,data.password)
        

      
      res.status(200).send(JSON.stringify({
          error: false,
          data: userCredential,
          
      }))
      
      
  }catch(e){
      console.log("signup up api error: ",e.code);
      // return new Response("Failed",{status:500});
      
      
      res.status(500).send(JSON.stringify({
          'error': true,
          'code' : e.code
      }))
      
  }
})


// https
//   .createServer(
//     // Provide the private and public key to the server by reading each
//     // file's content with the readFileSync() method.
//     {
//       key:decryptedKey,
//       cert: fs.readFileSync("./cert.pem"),
//     },
//     app
//   )
//   .listen(port, () => {
//     console.log(`serever is runing at port '${port}'`);
//   });

  // http
  // .createServer(function (request, response) {
  //   // Set the response HTTP header with HTTP status and Content type
  //   response.writeHead(200, { "Content-Type": "text/plain" });

  //   // Send the response body "Hello World"
  //   response.end("Hello World\n");
  // })
  // .listen(port);


  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })