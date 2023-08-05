
import { Schema, model} from 'mongoose';



const TransactionSchema = new Schema({ //schema
   
    payment_proof:String,
    payment_method:String,
    productIds:Array,
    products:Array,
    sid:String,
    email:String,
    contact:Number,
    code:String,
    status:String,
    name:String,
    conversation:Array,
    log:Array,
    create_at:Date
});
// ProductSchema.path('activity').ref(activity)
const transaction = model("transactions", TransactionSchema);  //Creating a model

export default transaction;
