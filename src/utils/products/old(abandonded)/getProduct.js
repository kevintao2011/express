// import mongoose, {  connect  } from "mongoose";
// import connectDB from "../../connectDB.js";
// import user from "../../../models/user.js";
// import activity from "../../../models/activity.js";
// import product from "../../../models/product.js";
// /*
// {
//   user: {
//     token: ''
//   },
//   id: 'code'
// }
// */
// const getProduct = async (req)=>{
//     console.log("running getSocProduct",mongoose.connection.readyState , req.body)
//     var connect;


//     try {
//         connect = await mongoose.connection.asPromise()
//         console.log("getSocProduct current connection",mongoose.connection.readyState)
//         if(mongoose.connection.readyState==0){
//             console.log("getSocProduct connecting")
//             //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
//         }
//         else{
//             console.log("getSocProduct adding connection")
            
//             connect = mongoose
            
//             console.log("getSocProduct added connection",mongoose.connection.readyState)
//         }
        
    
//         console.log("status before find",mongoose.connection.readyState)
//         const a = await product.findOne(
//             {_id:req.body.id}
//         ).then(product=>{
//             if (product){
//                 console.log("products found")
//                 console.log(product)
//             }
//             // //await connect.disconnect()
            
//             return product
//         })
        
//         return a
        

//     } catch (err) {
//         console.log("error",err);
//         console.log("failed");
//         // //await connect.disconnect()
//         return false

//     }
    

    
// }

// export default getProduct;