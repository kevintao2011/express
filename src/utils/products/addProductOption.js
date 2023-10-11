import mongoose, {  connect, set  } from "mongoose";
import connectDB from "../connectDB.js";
import product from "../../models/product.js";
import activity from "../../models/activity.js";

import { DBRef, ObjectId } from "mongodb";

// for show product in carousell 
const addProductOption = async (req)=>{
    var connect;
    var newActivity
    const body = req.body;
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        const option = await product.findOne({"_id":req.body.data._id}).then(async doc=>{  
            
            const indexList = doc.variants.map(variant=>{
                return parseInt(variant.index)
            })
            console.log("indexList",...indexList)
            var index
            if (indexList.length>0){
                index = Math.max(...indexList)+1
            }else{
                index=1
            }
            
            console.log("index",index)
            const newOption = {
                "name":req.body.data.variant,
                "price":req.body.data.price,
                "inventory":req.body.data.inventory,
                "index":index
            }
            console.log("newOption",newOption)
            doc.variants.push(newOption)

            console.log("doc",doc)
            await product.updateOne({
                _id:req.body.data._id
            },doc).then(d=>{
                console.log("updated doc",d)
                
            })
            return newOption
        })

        //await connect.disconnect()
        return option

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        //await connect.disconnect()
        return {code:err}

    }
    

    
}

export default addProductOption;