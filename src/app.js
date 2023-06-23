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
import https from "https"
import http from "http"
import fs from "fs";

const app = express()
const port = 3001

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var corsOptions = {
  origin: "localhost:3000",
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
app.use(()=>{"get req"})

app.get('/', async (req, res) => {
    await tryConnectDB()
    res.send('Hello World!')
})
app.post('/edituser', async (req, res) => {
  if(await editUser(req)){
    res.send('updateduser',200)
  }else{
    res.send('cannot updated user',500)
  }
  
})

app.post('/getuser', async (req, res) => {
  const user = await getUser(req);
  res.send(user)
  
  
})

app.post('/product', async (req, res) => {
  const product = await getProduct(req);
  res.send(product);
})



app.post('/', (req, res) => {
  createUser(req);
  
  res.send('created user')
})

app.post('/info', async (req, res) => {
  const result = await getinfo(req);

  
  res.send(result)
})

app.post('/createproduct',async (req, res) => {
  const result = await createProduct(req);  
  res.send(result)
})

app.post('/signin',async (req, res) => {
  const data = req.body
  console.log("credentials",data)
  const result = await loginfirebase(req.body.email,req.body.password);  
  res.send(result)
})



// https
//   .createServer(
//     // Provide the private and public key to the server by reading each
//     // file's content with the readFileSync() method.
//     {
//       key: fs.readFileSync("./key.pem"),
//       cert: fs.readFileSync("./cert.pem"),
//     },
//     app
//   )
//   .listen(port, () => {
//     console.log(`serever is runing at port '${port}'`);
//   });

  http
  .createServer(function (request, response) {
    // Set the response HTTP header with HTTP status and Content type
    response.writeHead(200, { "Content-Type": "text/plain" });

    // Send the response body "Hello World"
    response.end("Hello World\n");
  })
  .listen(port);