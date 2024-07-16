// import mongoose, {  connect, set  } from "mongoose";
// import product from "../../../models/product.js";
// // for show product in carousell 
// const updateProductOption = async (req)=>{
//     var connect;
//     const body = req.body;
//     try {
//         //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
//         console.log(req.body.data)
//         await product.findOne({"_id":req.body.data._id}).then(async doc=>{ 
//             console.log("founded product",doc.variants) 
//             console.log("replace content ",req.body.data)
//             doc.variants.forEach((variant,i)=>{
//                 if (parseInt(variant.index) === parseInt(req.body.data.index)){
//                     console.log("founded index") 
//                     const keys = Object.keys(variant)
//                     keys.forEach(key=>{
//                         if(req.body.data[key]){
//                             console.log("founded key",key,doc.variants[i][key]) 
//                             doc.variants[i][key]=req.body.data[key]
//                             console.log(`${key}changed from ${ doc.variants[i][key]} to ${req.body.data[key]}`)
//                         }
//                     })
//                 }
//             })
            
//             console.log("updated docs",doc)
//             doc.markModified('anything');
//             // await doc.save(function(err, doc) {
//             //     if (err) return console.error(err);
//             //     console.log("Document inserted succussfully!");
//             //   })
            
//             await product.updateOne({"_id":doc._id},doc)

//         })
//         //await connect.disconnect()
//         return JSON.stringify({code:"success"})

//     } catch (err) {
//         console.log("error",err);
//         console.log("failed");
//         //await connect.disconnect()
//         return JSON.stringify({code:err})

//     }
// }

// export default updateProductOption;