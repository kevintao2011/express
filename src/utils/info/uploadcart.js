import user from "../../models/user.js";
import mongoose, {  connect, set  } from "mongoose";




// for show product in carousell 
const uploadCart = async (req)=>{
    var connect;
    const body = req.body;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        await user.updateOne({"uid":req.body.tokeninfo.uid},{"cart":req.body.cart}).then(async doc=>{  
            console.log(doc)
            
        })
    
        await connect.disconnect()
        return JSON.stringify({code:"success"})

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return JSON.stringify({code:err})

    }
    

    
}

export default uploadCart;