import mongoose, {  connect  } from "mongoose";
import product from "../../models/product.js";
import getoidbycode,{getoidandsessionbycode} from "../serverFunction/getoidbycode.js";
import getUserOID from "../serverFunction/getuseroid.js";
import moment from "moment/moment.js";
import stock from "../../models/stock.js";
import { IntToProdIndex } from "../serverFunction/basicfunction.js";

// for show product in carousell 
const createproduct = async (req)=>{
    var connect;

    console.log("req.body",req.body)
    const body = req.body;
    await getUserOID(req.body.tokeninfo.user_id).then(async useroid=>{
        await getoidandsessionbycode(req.body.data.code).then(async result=>{
            console.log("result",result)
            const oid=result[0]
            const session=result[1]
            await product.find({session:session}).then(async p=>{
                try {
                    //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
                    
                    console.log(p.length,"p",p)
                    var prod = {...req.body.data}
                    prod.created_by=useroid
                    prod.ref_society=oid
                    prod.session=session
                    // prod.sku=`${req.body.data.code}-${session}-${p.length.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}`
                    prod.ref_category=session
                    prod.created_at=moment().utcOffset(8).toDate()
                    prod.options=prod.product_list.option?prod.product_list.option:[]
                    if(Object.keys(prod.product_list).length>0){
                        prod.product_list=Object.keys(prod.product_list.data).map((p,i)=>{
                            console.log(p)
                            console.log(prod.product_list.data)
                            var obj = prod.product_list.data[p]
                            obj.name = p
                            obj.sku= `${prod.sku}-${i.toLocaleString('en-US', {minimumIntegerDigits: 3, useGrouping:false})}`
                            return obj
                        })
                    }
                    else{
                        prod.product_list=[]
                    }
                    
                    console.log("prod",prod)
                    const newProduct = new product(prod)
                    console.log(newProduct)
                    
                    await product.create(newProduct).then(async doc=>{
                        if(doc.is_limited){
                            const stockInfos = doc.product_list.map(subproduct=>{
                                return{
                                    sku:subproduct.sku,
                                    ref_society:doc.ref_society,
                                    ref_product:doc._id,
                                    created_by:doc.created_by,
                                    spot_goods:true,
                                    status:"for-sale"
                                }
                            })
                            const stocksTobeCreated = doc.product_list.map((subproduct,i)=>{
                                var stocks = [] 
                                for (let index = 0; index < subproduct.quantity; index++) {
                                    const doc = new stock(stockInfos[i])
                                    console.log(doc.sku)
                                    doc.sku=doc.sku+"-"+IntToProdIndex(index)
                                    stocks.push(doc)
                                }
                                return stocks
                                
                            })

                            stocksTobeCreated.forEach(async (docs,i)=>{
                                console.log("creating ",i," subprod")
                                await stock.insertMany(docs).then(()=>{
                                    console.log("created ",i," subprod")
                                })

                            })
                            
                        }
                        
                        return true

                    })
            
                    
                    
                } catch (err) {
                    console.log("error",err);
                    console.log("failed");
                    //await connect.disconnect()
                    return false
            
                }
            })
            
        })
    })
    
    
    

    
}

export default createproduct;
