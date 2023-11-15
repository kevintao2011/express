import mongoose,{ Schema, model} from 'mongoose';
import stock from '../../models/stock.js';
import { ObjectId } from 'mongodb';
import { getoidandsessionbycode } from '../serverFunction/getoidbycode.js';
import { getSessionSocProducts } from '../products/getSocProducts.js';
export default async function findSocietyStock(req){
    try{
        return await getoidandsessionbycode(req.body.data.code).then(async result=>{
            const [oid,cuurentSession]=result
            return await stock.find({ref_society:oid}).populate("created_by",{sid:1},"user").sort({ sku: 1 }).then(docs=>{
                console.log(docs)
                return {success:true,data:docs}
            })
            
        }) 
    }catch(err){
        console.log(err)
        return {success:false,data:"failed to get stocks"}
    }
    

   
   
}

export async function findSKUStock(req){
    // pass in sku array and return diction of that sku 
    try{
        return await getoidandsessionbycode(req.body.data.code).then(async result=>{
            const [oid,cuurentSession]=result
            const pids = req.body.data.pids.map(pid=>{
                return mongoose.Types.ObjectId(pid)
            })
            return await stock.find({ref_product:{$in:{pids}}}).sort({ sku: 1 }).then(docs=>{
                console.log(docs)
                return {success:true,data:docs}
            })
            
        }) 
    }catch{
        return {success:false,data:"failed to get stocks"}
    }
    

   
   
}