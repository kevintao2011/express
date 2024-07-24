import express from "express";
import "dotenv/config";
import editUser from "./utils/user/editUser.js";
import getUser from "./utils/user/getUser.js";
import getinfo from "./utils/info/major.js";
// import getProduct from "./utils/products/old/getProduct.js";
import createproduct from "./utils/products/createproduct.js";
// import newCreateProduct from "./utils/products/new/newCreateProduct.js";
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
// import { clientAuth } from "./auth/firebaseclientfunction.js";
import  updateSession  from "./utils/session/updatesession.js"
import { register } from "./auth/firebaseadminfunction.js";
import { getSociety } from "./utils/info/society.js";
import getSocActivity from "./utils/activity/getSocActivity.js";
import createActivity from "./utils/activity/createActivity.js";
// import updateActivity from "./utils/activity/updateActivity.js";
// import getActivity from "./utils/activity/getactivity.js";
import removeActivity from "./utils/activity/removeActivity.js";
import getSocProducts, { getSessionSocProducts } from "./utils/products/getSocProducts.js";
// import getSocProduct from "./utils/products/editSocProduct.js";
import getSocUser from "./utils/user/getSocUser.js";
import getCatOption from "./utils/products/getCatOption.js";
import getCatShownOption from "./utils/products/getCatShownOption.js";
// import changePoster from "./utils/activity/changePoster.js";
// import updateActivityProduct from "./utils/activity/updateActivityProduct.js";
// import updateProduct from "./utils/products/old/editProdct.js";
// import changeProductIcon from "./utils/products/old/changeProductIcon.js";
// import changeProductMainIcon from "./utils/products/old/changeProductMainIcon.js";
// import updateProductInfo from "./utils/products/old/updateproductinfo.js";
// import updateProductOption from "./utils/products/old/updateproductoption.js";
// import removeProductOption from "./utils/products/old/removeproductoption.js";
// import addProductOption from "./utils/products/old/addProductOption.js";
// import getProducts from "./utils/products/getProducts.js";
import uploadCart from "./utils/info/uploadcart.js";
import createOrder from "./utils/order/createOrder.js";
import uploadPaymentProof from "./utils/order/uploadPaymentProof.js";
// import getOrder from "./utils/order/getOrder.js";
import getOrders from "./utils/order/getOrders.js";
import getOrdersBySoc from "./utils/order/getOrdersBySoc.js";
import updateOrderStatus from "./utils/order/updateOrderStatus.js";
import getSocList from "./utils/info/getSocList.js";
import setStaticInfo from "./utils/info/setStaticInfo.js";
import editSocProduct from "./utils/products/editSocProduct.js";
// import priviledgedGetSocProducts from "./utils/products/new/PriviledgedGetSocProducts.js";
// import {pGetSocProductsByTree} from "./utils/products/new/pGetSocProductByTree.js";
// import updateSocietyInfo from "./utils/society/updateSocietyInfo.js";
import getMemberList from "./utils/society/member/getMemberList.js";
import getUserMembership from "./utils/membership/getUserMembership.js";
import mongoose from "mongoose";
import getNextSKU from "./utils/products/getNextSKU.js";
import findSocietyStock from "./utils/stock/findSocietyStock.js";
import { sendResponse, wrapResponse } from "./utils/serverFunction/basicfunction.js";
import { getTypeProduct } from "./utils/products/getTypeProduct.js";
import createMembershipProduct from "./utils/membership/createMembershipProduct.js";
import addMemberType from "./utils/membership/addMemberType.js";
import createActivitynProduct from "./utils/activity/new/createActivitynProduct.js";
import Shop from "./utils/shop/Shop.js";
// import getUserOID from "./utils/serverFunction/getuseroid.js";
import ProdGroup from "./models/product_group.js";
import StaticInfo from "./utils/info/StaticInfo.js";
import Payment from "./utils/payment/payment.js";
import product, { product_variants } from "./models/product.js";
import { error } from "firebase-functions/logger";

const shop = new Shop()
const ProductGroup = new ProdGroup()
const staticInfo = new StaticInfo()
const PaymentMethod = new Payment()
const app = express()
const router = express.Router();
const port = 3001



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var corsOptions = {
  origin: "http://localhost:3001",
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions))
// app.use(()=>{"get req"})


var connect
try {
  connect = await mongoose.connect("mongodb+srv://lingusuwebsite:4igU2P3UeNtL7NsO@database.wqsyfyy.mongodb.net/website?retryWrites=true&w=majority&appName=database");
  //mongodb+srv://lingusuwebsite:4igU2P3UeNtL7NsO@atlascluster.1hhiebv.mongodb.net/website?retryWrites=true&w=majority&appName=AtlasCluster
  //mongodb+srv://lingusuwebsite:<password>@database.wqsyfyy.mongodb.net/?retryWrites=true&w=majority&appName=database
  console.log(
      "Database connected: ",
      connect.connection.host,
      connect.connection.name
  );

} catch (err) {
  // console.log(err);
  await connect.disconnect();
  process.exit(1);
  
}



//*********   user related functions *************//

//edit user info in first login
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


//get user info once login is successful
app.post('/api/getuser',checkAuth, async (req, res) => {
  console.log("calling getuser",req.body)

  const user = await handleUserLogin(req);
  // console.log("reutrning user",user)
  res.send(JSON.stringify(user))

  
  
})

//get all the os member 
app.post('/api/getsocuser',checkAuth, async (req, res) => {
  console.log("calling socuser",req.body)

  const user = await getSocUser(req);
  console.log("reutrning",user)
  res.send(JSON.stringify(user))

  
  
})

// list out all soc in the db
app.post('/api/soclist', async (req, res) => {
  console.log("calling soclist",req.body)

  const user = await getSocList(req);
  console.log("returning",user)
  res.send(JSON.stringify(user))

  
  
})

//*********   user related functions *************//




//**********  product related API ********** /

//get category option for shop
app.post('/api/getcatoption', async (req, res) => {
  console.log("calling getcatoption",req.body)

  const user = await getCatOption(req);
  console.log("returning",user)
  res.send(JSON.stringify(user))

  
  
})

//get product category(ticket/membership/product) option for shop
app.post('/api/getshopcategory', async (req, res) => {
  console.log("getshopcategory",req.body)
  await shop.getCategory().then(r=>{
    sendResponse(res,r)
  })
})

//for single product container
app.post('/api/getcatshownoption', async (req, res) => {
  console.log("calling getshowncatoption",req.body)

  const user = await getCatShownOption(req);
  console.log("returning",user)
  res.send(JSON.stringify(user))
  //Create user profile on mongo when first log in
  
  
})

//upload to userDB cart once clicked on Nav Bar
app.post('/api/uploadcart',checkAuth, async (req, res) => {
  console.log("calling uploadcart",req.body)
  const cart = await uploadCart(req);
  res.send(cart)
})
//**********  product related API ********** //


//**********  Activity related API ********** //
// app.post('/api/changeposter',checkAuth, async (req, res) => {
//   console.log("calling changeposter",req.body)

//   const result = await changePoster(req);
//   console.log("reutrning state",result)
//   res.send(JSON.stringify(result))
//   //Create user profile on mongo when first log in
  
  
// })



// app.post('/api/updateActivityProduct',checkAuth, async (req, res) => {
//   console.log("calling updateActivityProduct",req.body)

//   const result = await updateActivityProduct(req);
//   console.log("reutrning state",result)
//   res.send(JSON.stringify(result))
//   //Create user profile on mongo when first log in
  
  
// })
//**********  Activity related API ********** //



//********** Order related API **********//
// place order when check out
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

//upload payment proof whn check out -> flow should change later
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

// app.post('/api/getorder',checkAuth, async (req, res) => {
//   await getOrder(req).then(result=>{
//     console.log("getorder",result)
//     if(result){
//       console.log("success")
//       res.status(200).json(result)
//     }else{
//       res.status(500).json({"code":"error"})
//     }
//   })
// })

//get orders of the user in profile page
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

//get orders of the user in vendor page
app.post('/api/getordersbysoc',checkAuth, async (req, res) => {
  await getOrdersBySoc(req).then(result=>{
    if(result){
      res.send(JSON.stringify({
        success:true,
        message:"success",
        data:result
      }))
    }else{
      if(result){
        res.status(501).send(JSON.stringify({
          success:false,
          msg:"failed"
        }))
      }
    }
  })
})


//update order status in vendor page
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
//********** Order related API **********//

//create membership product for the socirty
app.post('/api/createmembershipproduct',checkAuth, async (req, res) => {
  await createMembershipProduct(req).then(result=>{
    console.log("createmembershipproduct",result)
    sendResponse(res,result)
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



// app.post('/api/getusersocieties',checkAuth, async (req, res) => {
//   const societies = await getUserSociety(req);
//   res.status(200).send(JSON.stringify({societies}))
// })



// app.get('/api/test', async (req, res) => {
//   console.log("test api")
//   res.send({"txt":'Hello World!'})
// })

// app.post('/info', async (req, res) => {
//   const result = await getinfo(req);

  
//   // res.status(200).send(JSON.stringify({result}))
// })

//get jupas info when setuping the account
app.get('/api/getjupas', async (req, res) => {
  const result = await getinfo();
  res.send(result)
})

// app.post('/api/addProductGroup',async (req, res) => {
//   await ProductGroup.AddProductGroup(req.body.data).then(result=>{
//     sendResponse(res,result)
//   })
// })

// app.post('/api/getproductgroups',async (req, res) => {
//   await ProductGroup.getProductGroups(req.body.data).then(result=>{
//     sendResponse(res,result)
//   })
// })

// app.post('/api/getproductgroupsforrsbydb',async (req, res) => {
//   await ProductGroup.getProductGroupsForRsByDB(req.body.data).then(result=>{
//     sendResponse(res,result)
//   })
// })

// app.post('/api/getproductgrouptrees',async (req, res) => {
//   await ProductGroup.getProductGroupTrees(req.body.data).then(result=>{
//     sendResponse(res,result)
//   })
// })
// app.post('/api/refreshproducttree',async (req, res) => {
//   await ProductGroup.getProductGroupTrees(req.body.data).then(result=>{
//     sendResponse(res,result)
//   })
// })
// app.post('/api/generateproductgrouptrees',async (req, res) => {
//   await ProductGroup.generateTreeArrayForRsByDB().then(success=>{
//     sendResponse(res,wrapResponse(success,"Re generated"))
//   })
// })

// get societies' db info once logged-in 
app.get('/api/getsocieties', async (req, res) => {
  await getSociety().then(result=>{
    console.log("result",result)
    res.status(200).send(JSON.stringify(result))
  })
 
  
})

// get website info once enter the website
app.post('/api/websitestaticinfo', async (req, res) => {
  console.log("calling getStaticInfo",req.body)
  await staticInfo.getStaticInfo(req.body.data.ids).then(result=>{
    sendResponse(res,result)
  });
  //Create user profile on mongo when first log in
})

// set website info (admin)
app.post('/api/setwebsitestaticinfo', checkAuth,async (req, res) => {
  console.log("calling setStaticInfo",req.body)
  const result = await setStaticInfo(req);
  res.send(JSON.stringify(result))
  //Create user profile on mongo when first log in
})

/**
 * add to cart
 */

//add to cart in shop product page
app.post('/api/addtocart',checkAuth, async (req, res) => {
  console.log("calling add to cart",req.body)
    await shop.addToCart(req.body.tokeninfo.uid,req.body.data.sku,req.body.data.quantity).then(
      result=>{
        console.log("addtocart res",result)
        sendResponse(res,result)
      }
    )
  // console.log("calling addtocart",req.body)
  // await staticInfo.getStaticInfo(req.body.data.ids).then(result=>{
  //   sendResponse(res,result)
  // });
  //Create user profile on mongo when first log in
})

//get cart for session
app.post('/api/getcart',checkAuth, async (req, res) => {
  
  await shop.getCart(req.body.tokeninfo.uid).then(result=>{
    sendResponse(res,result)
  })
})


app.get('/api/socmap',async (req, res) => { //check auth checkpriviledge
  const result = await createActivity(req);  
  res.send(result)
})


//********************* Activity *********************//
//create activity
app.post('/api/createacticvity',checkAuth,async (req, res) => { 
  const result = await createActivity(req);  
  res.send(result)
})




// app.post('/api/updateactivity',checkAuth,async (req, res) => { //check auth checkpriviledge
//   const result = await updateActivity(req);  
//   res.send(result)
// })

// remove activity in vendor page
app.post('/api/removeactivity',checkAuth,async (req, res) => { //check auth checkpriviledge
  const result = await removeActivity(req);  
  res.send(result)
})


//get soc activity in vendor page
app.post('/api/getsocactivity',async (req, res) => { //getsocactivity
  const result = await getSocActivity(req);  
  res.send(result)
})

//********************* Activity *********************//



//get payment details of the society
app.post('/api/getpaymentmethod',async (req, res) => { //getsocactivity
  await PaymentMethod.getPaymentMethods(req.body.data.code).then(result=>{
    sendResponse(res,result)
  })
})

//update payment details of the society
app.post('/api/updatepaymentmethod',async (req, res) => { //getsocactivity
  await PaymentMethod.updatePaymentDetials(req.body.data.code,req.body.data.info).then(result=>{
    sendResponse(res,result)
  })
})

//get user membership details in profile-page
app.post('/api/getusermembership',checkAuth,async (req, res) => { //getsocactivity
  await getUserMembership(req).then(result=>{
    if(result){
      res.send(JSON.stringify({
        success:true,
        message:"success",
        data:result
      }))
    }else{
      if(result){
        res.status(501).send(JSON.stringify({
          msg:"failed"
        }))
      }
    }
  });  
  
})


//get load project detials in product page
app.post('/api/getproduct',checkAuth, async (req, res) => { // get single product
  console.log("calling /api/getproduct")
  await shop.getProduct(req.body.data.sku).then(r=>{
    sendResponse(res,r)
  })
})

//find stocks in the society
app.post('/api/findsocietystock',checkAuth, async (req, res) => { // get single product
  console.log("calling /api/product")
  const product = await findSocietyStock(req).then(result=>{
    console.log("findsocietystock",result)
    if(result.success){
      res.status(200).send(JSON.stringify(
        result
      ))
    }else{
      res.status(500).send(JSON.stringify(
        result
      ))
    }
  });
  
})

//create activity product
app.post('/api/createproduct',checkAuth,async (req, res) => {
  await createproduct(req).then(result=>{
    console.log("createproduct",result)
    if(result.success){
      res.status(200).send(JSON.stringify(
        result
      ))
    }else{
      res.status(500).send(JSON.stringify(
        result
      ))
    }
  });  
})

//add new member type for vendor
app.post('/api/addmembertype',checkAuth,async (req, res) => {
  await addMemberType(req).then(result=>{
    console.log("addmembertype",result)
    sendResponse(res,result)
  });  
})
//get spcific type for specific society
app.post('/api/gettypeproduct',checkAuth,async (req, res) => {
  await getTypeProduct(req).then(result=>{
    sendResponse(res,result)
    console.log("gettypeproduct",result)
  });  
})
//add membership for the user
app.post('/api/addmembership',async (req, res) => {
  const result = await createproduct(req);  
  res.send(result)
})

app.post('/api/move',async (req, res) => {
  await product.find().then(docs=>{
    console.log(docs)
    let arra = []
    docs.forEach(doc=>{
      if (Array.isArray(doc.product_list)){
        doc.product_list.forEach(subdoc=>{
          subdoc.ref_product = subdoc._id
          arra.push(subdoc)
        })
      }
      
    })
    product_variants.insertMany(arra).then(r=>{res.send("success")})
  })
  
})

app.post('/api/clear',async (req, res) => {
  await product.find().then(async docs=>{
    console.log(docs)
    for await (const doc of docs){
      let arra = []
      if (Array.isArray(doc.product_list)){
        doc.product_list.forEach(subdoc=>{
          arra.push(subdoc._id)
        })
        doc.product_list = arra
      }else{
        doc.product_list = []
      }
      await doc.save().then(r=>{console.log("saved")})
    }

  })
  res.send("done")
  
})

app.post('/api/delet',async (req, res) => {
  await product.find().then(docs=>{
    // console.log(docs)
    docs.forEach(async doc=>{
      let arra = []
      if(doc.ref_category = "30"){
        console.log(doc._id , doc.product_name_chi)
        await doc.deleteOne()
      }
      
      
      
    },error=>{console.log(error.doc)})
  })
  res.send("done")
})

// app.post('/api/newcreateproduct',checkAuth,async (req, res) => {
//   const result = await newCreateProduct(req)
//   const successmsg = JSON.stringify({
//     msg:"success"
//   })
//   console.log("sent ",successmsg)
//   res.send(successmsg)
// })

// app.post('/api/updatesocietyInfo',async (req, res) => {
//   await updateSocietyInfo(req).then(
//     result=>{
//       if(result){
//         res.send(JSON.stringify({
//           success:true,
//           message:"success",
//           data:result
//         }))
//       }else{
//         if(result){
//           res.send(JSON.stringify({
//             msg:"failed"
//           }))
//         }
//       }
//     }
//   )
  
  
// })

//get memberlist in memberlist
app.post('/api/getmemberlist',async (req, res) => {
  await getMemberList(req).then(
    result=>{
      if(result){
        res.send(JSON.stringify({
          success:true,
          message:"success",
          data:result
        }))
      }else{
        if(result){
          res.send(JSON.stringify({
            success:false,
            message:"failed",
            data:{}
          }))
        }
      }
    }
  )
  
  
})


// app.post('/api/getsocproduct',async (req, res) => { 
//   await getSocProduct(req).then(
//     r =>{
//       if(r){
//         res.send(JSON.stringify({
//           state:"success",
//           data:r
//         }))
//       }else{
//         res.send(JSON.stringify({
//           state:"failed",
//           data:[]
//         }))
//       }
//     }
//   );  
// })

//get next sku available in society
app.post('/api/getnextsku',async (req, res) => { 
  await getNextSKU(req).then(
    r =>{
      if(r.success){
        res.send(JSON.stringify(
          r
        ))
      }else{
        res.send(JSON.stringify(
          r
        ))
      }
    }
  );  
})

//edit product detail
app.post('/api/editsocproduct',async (req, res) => { 
  await editSocProduct(req).then(
    r =>{
      if(r){
        res.send(JSON.stringify({
          success:true,
          data:r
        }))
      }else{
        res.send(JSON.stringify({
          success:false,
          data:[]
        }))
      }
    }
  );  
})

// get soc products in vendor page
app.post('/api/getsocproducts',async (req, res) => { 
  await getSocProducts(req).then(
    r =>{
      if(r){
        res.send(JSON.stringify({
          state:"success",
          data:r
        }))
      }else{
        res.send(JSON.stringify({
          state:"failed",
          data:[]
        }))
      }
    }
  );  
})
// app.post('/api/getthissessionproducts',async (req, res) => { 
//   await getSessionSocProducts(req).then(
//     result =>{
//       sendResponse(res,result)
//     }
//   );  
// })
// app.post('/api/getthissessionstocks',async (req, res) => { 
//   await getSessionSocProducts(req).then(
//     result =>{
//       sendResponse(res,result)
//     }
//   );  
// })

//create both acitivity and the product
app.post('/api/createactivitynproduct',checkAuth,async (req, res) => { 
  await createActivitynProduct(req).then(
    result =>{
      sendResponse(res,result)
    }
  );  
})



// get products in shop page with pagination
app.post('/api/getshopproducts',checkAuth,async (req, res) => { //getsocactivity
  await shop.getProducts(req.body.data.page,req.body.data.ipp).then(result=>{
    sendResponse(res,result)
  })

})

// app.post('/api/getactivity',async (req, res) => { //getsocactivity
//   const result = await getActivity(req);  
//   res.send(result)
// })

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

app.get('/api/prod',async (req, res) => {
  product.findprod("6551fad7cc6beb58144ada68").thn(r=>{
    res.send(r)
  })
  res.send('failed')
})

//account creation
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



  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })