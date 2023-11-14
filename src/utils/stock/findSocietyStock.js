import mongoose,{ Schema, model} from 'mongoose';
import stock from '../../models/stock.js';
import { ObjectId } from 'mongodb';
import { getoidandsessionbycode } from '../serverFunction/getoidbycode.js';

export default async function findSocietyStock(req){
    try{
        return await getoidandsessionbycode(req.body.data.code).then(async result=>{
            const [oid,cuurentSession]=result
            return await stock.find({ref_society:oid},{},{$group:["ref_society","ref_product"]}).then(docs=>{
                console.log(docs)
                return {success:true,data:docs}
            })
            
        }) 
    }catch{
        return {success:false,data:"failed to get stocks"}
    }
    

   
   
}