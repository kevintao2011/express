import mongoose, {  connect  } from "mongoose";
import product, { product_variants } from "../../models/product.js";
import getoidbycode,{getoidandsessionbycode} from "../serverFunction/getoidbycode.js";
import getUserOID from "../serverFunction/getuseroid.js";
import moment from "moment/moment.js";
import stock from "../../models/stock.js";
import { IntToProdIndex } from "../serverFunction/basicfunction.js";
import category from "../../models/category.js";

// for show product in carousell 
const createproduct = async (req)=>{
    var connect;

    console.log("req.body",req.body)
    const body = req.body;
    return await getUserOID(req.body.tokeninfo.user_id).then(async useroid=>{
        try {
            return await getoidandsessionbycode(req.body.data.code).then(async result=>{
                console.log("result",result)
                const oid=result[0]
                const session=result[1]
                try {
                    
                    var prod = {...req.body.data}
                    console.log("prod.product_list b4 modify",prod.product_list)
                    prod.created_by=useroid
                    prod.ref_society=oid
                    prod.session=session
                    

                    //1. find the reference category _id
                    prod.ref_category = await category.findOne({id:req.body.data.product_type},{id:1}).then(async doc=>{
                        if(doc){
                            return doc._id
                        }else{
                            await category.findOne({id:"other"},{id:1}).then(doc=>{
                                return doc._id
                            })
                        }
                    })

                    //2. mark the current time as creat time
                    prod.created_at=moment().utcOffset(8).toDate()
                    //3. handle subproducts in product list
                    prod.options=prod.product_list.option?prod.product_list.option:[]

                    //4. create new local product doc       
                    //4a. remove the product_list from the product to avoid wrong data    
                    const product_list = prod.product_list.data?prod.product_list.data:{}
                    prod.product_list=[]
                    const newProduct = new product(prod)

                    
                    let productVariants = []
                    if(Object.keys(product_list).length>0){ // if there are subproducts
                        //3a. map subproduct to product array
                        productVariants=Object.keys(product_list).map((p,i)=>{
                            console.log(p)
                            console.log(product_list)
                            var obj = product_list[p]
                            obj.name = p
                            console.log("ref prod id",newProduct._id)
                            obj.ref_product = newProduct._id
                            //generate sku for the subproduct
                            obj.sku= `${prod.sku}-${IntToProdIndex(i)}` 
                            console.log("obj",obj)
                            return new product_variants(obj)

                            
                        })
                        
                    }
                    

                    
                    
                    //5. add the doc to the 'products 'collection
                    return await product.create(newProduct).then(async doc=>{
                        //6. if the product not unlimited, create stocks for each subproduct

                        return await product_variants.insertMany(productVariants).then(
                            suc=>{return {success:true,data:"added"}},
                            err=>{return {success:false,data:err.name}}
                        )
                       


                        // if(doc.is_limited){ //if the product is limited,
                        //     //  retrieve informations for need stocks 
                        //     const stockInfos = doc.product_list.map(subproduct=>{
                        //         return{
                        //             sku:subproduct.sku,
                        //             ref_society:doc.ref_society,
                        //             ref_product:doc._id,
                        //             created_by:doc.created_by,
                        //             spot_goods:true,
                        //             status:"for-sale"
                        //         }
                        //     })
                        //     // create stocks for each subproduct as requested
                        //     const stocksTobeCreated = doc.product_list.map((subproduct,i)=>{
                        //         var stocks = [] 
                        //         for (let index = 0; index < subproduct.quantity; index++) {
                        //             const doc = new stock(stockInfos[i])
                                    
                        //             doc.sku=doc.sku+"-"+IntToProdIndex(index)
                        //             console.log(doc.sku)
                        //             stocks.push(doc)
                        //         }
                        //         return stocks
                                
                        //     })
                            
                        //     console.log("newStocks after flatiing",stocksTobeCreated.flat())
                        //     await stock.insertMany(stocksTobeCreated.flat()).then((r)=>{
                        
                        //         console.log("created ",r.length," subprod")
                        //     })
                        //     return {success:true,data:"created product an stocks"}
                        // }else{
                        //     return {success:true,data:"create product only (no stock)"}
                        // }
                        
                        

                    })

                    
                } catch (err) {
                    console.log("error",err);
                    console.log("failed");
                    //await connect.disconnect()
                    return {success:false,data:err.name}
            
                }
                
            })    
        } catch (error) {
            return {success:false,data:error.name}
        }
        
    })
    
}

export default createproduct;
