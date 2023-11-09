import mongoose,{ Schema, model} from 'mongoose';
import stock from '../../models/stock';
import { ObjectId } from 'mongodb';

export default async function findSocietyStock(req){
    
    await stock.find({ref_society:ObjectId("64a554cd1596cf843e6a5b4a")},{},{$group:["ref_society","ref_product"]}).then(docs=>{
        
    })
}