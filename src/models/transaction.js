
import { Schema, model} from 'mongoose';
import mongoose from 'mongoose';
import product from './product.js';


const TransactionSchema = new Schema({ //schema
   
    payment_proof:String,
    payment_method:String,
    productIds:[],
    products:Array,
    sid:String,
    email:String,
    contact:Number,
    code:String,
    status:String,
    name:String,
    conversation:Array,
    log:Array,
    create_at:Date,
    createdBy:{type:mongoose.SchemaTypes.ObjectId,ref:'users',immutable:true}
});
// ProductSchema.path('activity').ref(activity)
const transaction = model("transactions", TransactionSchema);  //Creating a model

export default transaction;
