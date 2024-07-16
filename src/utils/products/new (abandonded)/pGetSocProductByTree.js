// import mongoose, {  connect  } from "mongoose";
// import product from "../../../models/new/product.js";
// import getoidbycode from "../../serverFunction/getoidbycode.js";
// /*
// {
//   user: {
//     token: ''
//   },
//   id: 'code'
// }
// */


// const priviledgedGetSocProducts = async (req)=>{
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
//         const a = await product.find(
//             {ref_society:await getoidbycode(req.body.id)}
//         ).then(products=>{
//             if (products){
//                 console.log(products)
//             }
//             // //await connect.disconnect()
//             console.log("soc products function exe sucess")
//             return products
//         })

//         return a
        

//     } catch (err) {
//         console.log("error",err);
//         console.log("failed");
//         // //await connect.disconnect()
//         return false

//     }
    

    
// }


// const pGetSocProductsByTree = async (req)=>{
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
//         return await product.find(
//             {
//                 ref_society:await getoidbycode(req.body.id),
//                 parent:undefined,
//             }
//         ).then(async products=>{
//             async function recursivePopulate(doc,fieldname){
//                 // console.log(`populating doc with field ${fieldname} :`,doc._id,doc[fieldname])
//                 if (doc[fieldname].length<1){ // no child_products 0
//                     console.log("returning",doc)
//                     return doc
//                 }else{// have child_products >1
                    
//                     return await doc.populate(fieldname).then(
//                         async doc =>{
//                             if(doc[fieldname].length>1){// have more than 1 child_products
//                                 return await Promise.all(
//                                     doc[fieldname].map(async prod=>{
//                                         // resturn for list
//                                         return await recursivePopulate(prod,'child_products')
//                                     }
//                                 ))
//                                 .then(
//                                     docs=>{
//                                         doc[fieldname] = docs
//                                         // console.log("parent doc with sub >1",doc) //this corr
//                                         return doc
                                        
//                                     }
//                                 )
//                             }else{// single child_products 1
//                                 return await recursivePopulate(doc[fieldname],'child_products').then(
//                                     d=>{
//                                         console.log("parent doc single child_products",d) //this corr
//                                         doc[fieldname] = d
//                                         return doc
//                                     }
//                                 )
                               
//                             }
                            
//                         }
//                     )
                    
//                 }
                
//             }
//             return await Promise.all(
//                 products.map(async prod=>{
//                     return await recursivePopulate(prod,'child_products')
//                 })
//             )
//         })

        
        

//     } catch (err) {
//         console.log("error",err);
//         console.log("failed");
//         // //await connect.disconnect()
//         return false

//     }
    

    
// }

// export default priviledgedGetSocProducts;
// export {pGetSocProductsByTree};