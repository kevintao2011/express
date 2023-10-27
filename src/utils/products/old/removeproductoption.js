import mongoose, {  connect, set  } from "mongoose";
import product from "../../../models/product.js";
// for show product in carousell 
const removeProductOption = async (req)=>{
    var connect;
    const body = req.body;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(req.body.data)
        await product.findOne({"_id":req.body.data._id}).then(async doc=>{ 
            console.log("founded product",doc.variants) 
            console.log("replace content ",req.body.data)
            doc.variants.forEach((variant,i)=>{
                if (parseInt(variant.index) === parseInt(req.body.data.index)){
                    console.log("founded index") 
 console.log("remove",doc.variants.splice(i,1))                   
                }
            })
            
            console.log("updated docs",doc)
         
            // await doc.save(function(err, doc) {
            //     if (err) return console.error(err);
            //     console.log("Document inserted succussfully!");
            //   })
            
            await product.updateOne({"_id":doc._id},doc)

        })
        //await connect.disconnect()
        return {code:"success"}

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return {code:err}

    }
}

export default removeProductOption;