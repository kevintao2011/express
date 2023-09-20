import mongoose, {  connect  } from "mongoose";
import category from "../../../models/category";
// for show product in carousell 


const getCategoryMap = async (req)=>{
    var connect;

    // console.log("req.body",req.body)
    const body = req.body;
    const oid = await getUserOID(req.body.tokeninfo.user_id)
    const socoid = await getoidbycode(req.body.data.code)
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        console.log("product Tree",body.data.productTree)
        IterateTree(body.data.productTree,oid,socoid)

        // body.data.productList.forEach(prod=>{
        //     // console.log(prod)
            
        //     const newProduct = new product(
        //         prod
        //     )
        //     // console.log(newProduct)
        // })
        // console.log(newProduct)
        // await product.create(newProduct)

        return true
        
    } catch (err) {
        console.log("error",err);
        console.log("failed");
        await connect.disconnect()
        return false

    }
    

    
}

export default getCategoryMap;
