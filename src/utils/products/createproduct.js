import mongoose, {  connect  } from "mongoose";
import product from "../../models/product.js";
import getoidbycode,{getoidandsessionbycode} from "../serverFunction/getoidbycode.js";
import getUserOID from "../serverFunction/getuseroid.js";
import moment from "moment/moment.js";

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
            try {
                //connect = await mongoose.connect(String(process.env.CONNECTION_STRING));
                console.log("req body ",body)
                var prod = {...req.body.data}
                prod.created_by=useroid
                prod.ref_society=oid
                prod.session=session
                prod.ref_category=session
                prod.created_at=moment().utcOffset(8).toDate()
                console.log("prod",prod)
                const newProduct = new product(prod)
                console.log(newProduct)
                
                await product.create(newProduct),then(doc=>{
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
    
    
    

    
}

export default createproduct;
