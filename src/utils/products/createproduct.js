import mongoose, {  connect  } from "mongoose";
import product from "../../models/product.js";

// for show product in carousell 
const createproduct = async (req)=>{
    var connect;

    console.log("req.body",req.body)
    const body = req.body;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        const newProduct = new product({
            code:req.body.data.society,
            product_name:req.body.data.product_name[0],
            type: req.body.data.type[0],
            variants: req.body.data.variants
            
        })
        console.log(newProduct)
        await product.create(newProduct)

        return true
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        connect.disconnect()
        return false

    }
    

    
}

export default createproduct;
