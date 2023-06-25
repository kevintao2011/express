import express from "express";
import connectDB from "./utils/connectDB.js";
import createUser from "./utils/createUser.js";
import "dotenv/config";
import editUser from "./utils/editUser.js";
import getUser from "./utils/getUser.js";
import tryConnectDB from "./utils/tryConnectDB.js";
import getinfo from "./utils/info/major.js";
import getProduct from "./utils/getproduct.js";
import createProduct from "./utils/createproduct.js";
import { loginfirebase } from "./utils/firebasefunction.js";
import cors from "cors";
// import https from "https"
// import http from "http"
// import fs from "fs";
// import crypto from "crypto"
import { AUTH_ERROR_CODES } from "../auth-errors.js";

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


app.post('/api/edituser', async (req, res) => {
  if(await editUser(req)){
    res.send('updateduser',200)
  }else{
    res.send('cannot updated user',500)
  }
  
})

app.post('/api/getuser', async (req, res) => {
  const user = await getUser(req);
  res.send(user)
  
  
})

app.post('/api/product', async (req, res) => {
  const product = await getProduct(req);
  res.send(product);
})



app.get('/api/test', async (req, res) => {
  console.log("test api")
  res.send({"txt":'Hello World!'})
})

app.post('/info', async (req, res) => {
  const result = await getinfo(req);

  
  res.send(result)
})

app.post('/api/createproduct',async (req, res) => {
  const result = await createProduct(req);  
  res.send(result)
})

app.post('/api/signin',async (req, res) => {
  
  const data = req.body
  console.log("credentials",data)
  try{
    const result = await loginfirebase(req.body.email,req.body.password); 
    const jwt =  await result.user.getIdToken() //the session token
    console.log('jwt: ',jwt) //session token
    const uid = 
    console.log('metadata: ',result.user.metadata) //time (createdAt , lastLoginAt,lastSignInTime,creationTime)
    const createdAt = new Date(parseInt(result.user.metadata.createdAt* 1000))
    const lastLoginAt = new Date(parseInt(result.user.metadata.lastLoginAt* 1000))
    const lastSignInTime = new Date(result.user.metadata.lastSignInTime)
    const creationTime = new Date(result.user.metadata.creationTime)
    const expirationTime = new Date(result.user.metadata.expirationTime)
    
    console.log('TokenResult: ',await result.user.getIdTokenResult())
    console.log('emailVerified: ',result.user.emailVerified)
    res.json(result)
  }catch (error){
    var errorCode = String(error.code)
    errorCode=errorCode.replace('-',' ').replace('auth/', '')
    res.status(500)
    res.json({"code":errorCode})
  }
  
  
})

// const encryptedKey = crypto.createPrivateKey({
//   key: fs.readFileSync("./key.key"),
//   format: "pem",
//   passphrase: 'Tch7190520'})

// console.log("encryptedKey",encryptedKey)

// const decryptedKey = encryptedKey.export({
//   format: 'pem',
//   type: 'pkcs1',})


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