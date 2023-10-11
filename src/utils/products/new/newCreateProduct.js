import mongoose, {  connect  } from "mongoose";
import product from "../../../models/new/product.js";
import getoidbycode from "../../serverFunction/getoidbycode.js";
import getUserOID from "../../serverFunction/getuseroid.js";
// for show product in carousell 

async function IterateTree (topNode,oid,socoid,parent){
    console.log("Iterate tree with ",topNode)
    var doc = new product(topNode)
    doc.parent = parent
    doc.created_by = oid
    doc.ref_society = socoid
    if (!topNode.has_variant){
        console.log("Node Product")
        return await product.create(doc).then(d=>{
            console.log("doc",doc)
            return d._id
        })
    }else{
        console.log("Parent Product",doc)
        await Promise.all(topNode.subProducts.map(
            async childNode=>{
                console.log("childNode",childNode)
                return IterateTree(childNode,oid,socoid,doc._id)
        })).then(async v=>{
            console.log("v",v)
            doc.child_products=v
            await product.create(doc).then(d=>{
                return d._id
            })
        })
        
        
        // .then(async list=>{
        //     console.log("subporduct ids:",list)
        //     doc.child_products = list
        //     await product.create(doc).then(d=>{
        //         return d._id
        //     })
            
        // })
    }
   
}

const newCreateProduct = async (req)=>{
    var connect;

    // console.log("req.body",req.body)
    const body = req.body;
    const oid = await getUserOID(req.body.tokeninfo.user_id)
    const socoid = await getoidbycode(req.body.data.code)
    try {
        //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
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
        //await connect.disconnect()
        return false

    }
    

    
}

export default newCreateProduct;
