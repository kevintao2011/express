import express from "express";
import "dotenv/config";
import editUser from "./utils/user/editUser.js";
import getUser from "./utils/user/getUser.js";
import getinfo from "./utils/info/major.js";
import getProduct from "./utils/products/getProduct.js";
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
import updateActivity from "./utils/activity/updateActivity.js";
import getActivity from "./utils/activity/getactivity.js";
import removeActivity from "./utils/activity/removeActivity.js";
import getSocProduct from "./utils/products/getSocProduct.js";
import getSocUser from "./utils/user/getSocUser.js";
import getCatOption from "./utils/products/getCatOption.js";
import changePoster from "./utils/activity/changePoster.js";
import updateActivityProduct from "./utils/activity/updateActivityProduct.js";
import updateProduct from "./utils/products/editProdct.js";
import changeProductIcon from "./utils/products/changeProductIcon.js";
import changeProductMainIcon from "./utils/products/changeProductMainIcon.js";
import updateProductInfo from "./utils/products/updateproductinfo.js";
import updateProductOption from "./utils/products/updateproductoption.js";
import removeProductOption from "./utils/products/removeproductoption.js";
import addProductOption from "./utils/products/addProductOption.js";
import getProducts from "./utils/products/getProducts.js";
import uploadCart from "./utils/info/uploadcart.js";
import createOrder from "./utils/order/createOrder.js";
import uploadPaymentProof from "./utils/order/uploadPaymentProof.js";
import getOrder from "./utils/order/getOrder.js";
import getOrders from "./utils/order/getOrders.js";
import getOrdersBySoc from "./utils/order/getOrdersBySoc.js";
import updateOrderStatus from "./utils/order/updateOrderStatus.js";
import getSocList from "./utils/info/getSocList.js";

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

app.post('/api/getsocuser',checkAuth, async (req, res) => {
  console.log("calling socuser",req.body)

  const user = await getSocUser(req);
  console.log("reutrning",user)
  res.send(JSON.stringify(user))
  //Create user profile on mongo when first log in
  
  
})

app.post('/api/soclist', async (req, res) => {
  console.log("calling soclist",req.body)

  const user = await getSocList(req);
  console.log("returning",user)
  res.send(JSON.stringify(user))
  //Create user profile on mongo when first log in
  
  
})

app.post('/api/getcatoption',checkAuth, async (req, res) => {
  console.log("calling socuser",req.body)

  const user = await getCatOption(req);
  console.log("reutrning",user)
  res.send(JSON.stringify(user))
  //Create user profile on mongo when first log in
  
  
})

app.post('/api/uploadcart',checkAuth, async (req, res) => {
  console.log("calling uploadcart",req.body)
  const cart = await uploadCart(req);
  res.send(cart)
})

app.post('/api/changeposter',checkAuth, async (req, res) => {
  console.log("calling changeposter",req.body)

  const result = await changePoster(req);
  console.log("reutrning state",result)
  res.send(JSON.stringify(result))
  //Create user profile on mongo when first log in
  
  
})

app.post('/api/changeproducticon',checkAuth, async (req, res) => {
  console.log("calling changeproducticon",req.body)

  const result = await changeProductIcon(req);
  console.log("reutrning state",result)
  res.send(JSON.stringify(result))
  //Create user profile on mongo when first log in
  
  
})

app.post('/api/changeproductmainicon',checkAuth, async (req, res) => {
  console.log("calling changeproducticon",req.body)

  const result = await changeProductMainIcon(req);
  console.log("reutrning state",result)
  res.send(JSON.stringify(result))
  //Create user profile on mongo when first log in
  
  
})

app.post('/api/updateActivityProduct',checkAuth, async (req, res) => {
  console.log("calling updateActivityProduct",req.body)

  const result = await updateActivityProduct(req);
  console.log("reutrning state",result)
  res.send(JSON.stringify(result))
  //Create user profile on mongo when first log in
  
  
})
app.post('/api/updateproduct',checkAuth, async (req, res) => {
  console.log("calling updateProduct",req.body)
  const result = await updateProduct(req);
  console.log("reutrning state",result)
  res.send(JSON.stringify(result))
  //Create user profile on mongo when first log in
  
  
})

app.post('/api/updateproductinfo',checkAuth, async (req, res) => {
  await updateProductInfo(req).then(result=>{
    console.log("updated product info",result)
    if(result.code=="success"){
      res.status(200).json(result)
    }
    else{
      res.status(500).json(result)
    }
  })
  
  
})
app.post('/api/updateoptioninfo',checkAuth, async (req, res) => {
  await updateProductOption(req).then(result=>{
    console.log("updated Product Option",result)
    if(result.code=="success"){
      res.status(200).json(result)
    }
    else{
      res.status(500).json(result)
    }
  })
  
  
})
//comment
app.post('/api/removeproductoption',checkAuth, async (req, res) => {
  await removeProductOption(req).then(result=>{
    console.log("removeproductiotuin",result)
    if(result.code=="success"){
      res.status(200).json(result)
    }
    else{
      res.status(500).json(result)
    }
  })
  
  
})

app.post('/api/addproductoption',checkAuth, async (req, res) => {
  await addProductOption(req).then(result=>{
    console.log("addProductOption",result)
    if(result.index){
      res.status(200).json(result)
    }
    else{
      res.status(500).json(result)
    }
  })
  
  
})

app.post('/api/placeorder',checkAuth, async (req, res) => {
  await createOrder(req).then(result=>{
    console.log("createOrder",result)
    if(result.code==="success"){
      res.status(200).json(result)
    }else{
      res.status(500).json(result)
    }
  })

})

app.post('/api/uploadpaymentproof',checkAuth, async (req, res) => {
  await uploadPaymentProof(req).then(result=>{
    console.log("uploadpaymentproof",result)
    if(result.code==="success"){
      res.status(200).json(result)
    }else{
      res.status(500).json(result)
    }
  })
})

app.post('/api/getorder',checkAuth, async (req, res) => {
  await getOrder(req).then(result=>{
    console.log("getorder",result)
    if(result){
      console.log("success")
      res.status(200).json(result)
    }else{
      res.status(500).json({"code":"error"})
    }
  })
})

app.post('/api/getorders',checkAuth, async (req, res) => {
  await getOrders(req).then(result=>{
    console.log("getorder",result)
    if(result){
      console.log("success")
      res.status(200).json(result)
    }else{
      res.status(500).json({"code":"error"})
    }
  })
})

app.post('/api/getordersbysoc',checkAuth, async (req, res) => {
  await getOrdersBySoc(req).then(result=>{
    console.log("getorder",result)
    if(result){
      console.log("success")
      res.status(200).json(result)
    }else{
      res.status(500).json({"code":"error"})
    }
  })
})

app.post('/api/updateorderstatus',checkAuth, async (req, res) => {
  await updateOrderStatus(req).then(result=>{
    console.log("getorder",result)
    if(result){
      console.log("success")
      res.status(200).json(result)
    }else{
      res.status(500).json({"code":"error"})
    }
  })
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
          console.log("check Auth failed")
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


app.post('/api/createacticvity',checkAuth,async (req, res) => { //check auth checkpriviledge
  const result = await createActivity(req);  
  res.send(result)
})

app.post('/api/updateactivity',checkAuth,async (req, res) => { //check auth checkpriviledge
  const result = await updateActivity(req);  
  res.send(result)
})

app.post('/api/removeactivity',checkAuth,async (req, res) => { //check auth checkpriviledge
  const result = await removeActivity(req);  
  res.send(result)
})


app.post('/api/getsocactivity',async (req, res) => { //getsocactivity
  const result = await getSocActivity(req);  
  res.send(result)
})

app.post('/api/getproduct',checkAuth, async (req, res) => { // get single product
  console.log("calling /api/product")
  const product = await getProduct(req);
  res.status(200).send(JSON.stringify({product}))
})

app.post('/api/createproduct',async (req, res) => {
  const result = await createproduct(req);  
  res.send(result)
})


app.post('/api/getsocproduct',async (req, res) => { //getsocactivity
  const result = await getSocProduct(req);  
  console.log("result",result)
  res.send(result)
})

app.post('/api/getproducts',async (req, res) => { //getsocactivity
  const result = await getProducts(req);  
  console.log("result",result)
  res.json({products:result})
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