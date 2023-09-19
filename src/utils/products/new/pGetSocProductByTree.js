import mongoose, {  connect  } from "mongoose";
import product from "../../../models/new/product.js";
import getoidbycode from "../../serverFunction/getoidbycode.js";
/*
{
  user: {
    token: ''
  },
  id: 'code'
}
*/
const pGetSocProductsByTree = async (req)=>{
    console.log("running getSocProduct",mongoose.connection.readyState , req.body)
    var connect;
    try {
        connect = await mongoose.connection.asPromise()
        console.log("getSocProduct current connection",mongoose.connection.readyState)
        if(mongoose.connection.readyState==0){
            console.log("getSocProduct connecting")
            connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
        }
        else{
            console.log("getSocProduct adding connection")
            connect = mongoose
            console.log("getSocProduct added connection",mongoose.connection.readyState)
        }
        
    
        console.log("status before find",mongoose.connection.readyState)
        await product.find(
            {ref_society:await getoidbycode(req.body.id)}
        ).then(async products=>{
            var rootProducts =  products.filter(prod=>!prod.parent)
            async function recursivePopulate(doc,fieldname){
                console.log("populating doc :",doc._id,doc[fieldname])
                if (doc[fieldname].length<1){
                    console.log("returning",doc)
                    return doc
                }else{
                    return await doc.populate(fieldname).then(
                        async doc =>{
                            if(doc[fieldname].length>1){
                                await Promise.all(
                                     doc[fieldname].map(async prod=>{
                                        return await recursivePopulate(prod,'child_products')
                                    }
                                )).then(
                                    docs=>{
                                        doc[fieldname] = docs
                                        console.log("parent doc",doc) //this corr
                                        return doc
                                        
                                    }
                                )
                            }else{
                                await recursivePopulate(doc[fieldname],'child_products').then(
                                    d=>{
                                        doc[fieldname] = d
                                        return doc
                                    }
                                )
                                return 
                            }
                            
                        }
                    )
                }
                
            }
            console.log("roots:",rootProducts)
            await Promise.all(
                rootProducts.map(async prod=>{
                    return await recursivePopulate(prod,'child_products')
                })
            )
            .then(Products =>{
                console.log("rootProducts",Products)
                return Products
            }
        )
            
                
            
        })

        
        

    } catch (err) {
        console.log("error",err);
        console.log("failed");
        // await connect.disconnect()
        return false

    }
    

    
}

export default pGetSocProductsByTree;