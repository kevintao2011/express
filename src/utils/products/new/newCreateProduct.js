import mongoose, {  connect  } from "mongoose";
import product from "../../../models/new/product.js";

// for show product in carousell 

async function IterateTree (topNode,parent){

    var doc = new product(topNode)
    doc.parent = parent
    
    if (!topNode.has_variant){
        await product.create(doc).then(d=>{
            console.log("doc",doc)
            return d._id
        })
    }else{
        doc.child_products.map(async childNode=>{
            return await IterateTree(childNode,doc._id)
        }).then(list=>{
            doc.child_products = list
            product.create(doc)
            return doc.id
        })
        
        
        // await product.create("subproductlist.child_products",topNode.child_products)
    }
   
}

const newCreateProduct = async (req)=>{
    var connect;

    // console.log("req.body",req.body)
    const body = req.body;
    try {
        connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        console.log(body)
        console.log("product Tree",body.data.productTree)
        IterateTree(body.data.productTree)

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

export default newCreateProduct;
