import { Schema, SchemaType, model} from 'mongoose';
import mongoose from 'mongoose';
import product from './product.js';
import { ObjectId } from 'mongodb';
import { TransactionSchema } from './transaction.js';
import moment from 'moment/moment.js';
const CartSchema = new Schema({
    id:{type:ObjectId,ref:"product"},
    quantity:{type:Number}
})
const UserSchema = new Schema({ //schema
    
    email:String,
    cohort:Number,
    major:{type:ObjectId,ref:"jupas"},
    gender:String,
    contact:Number,
    username: String,
    first_name: String,
    last_name: String,
    uid: String, // String is shorthand for {type: String}
    imgurl: String,
    sid: String,
    exp:Date,
    createdAt:{type:Date,default:moment().utcOffset(8).toDate(),immutable:true},
    cart:{type:[Schema.Types.ObjectId],default:[]},
    last_sign_in:{ type: Date,default:moment().utcOffset(8).toDate() },
    first_login:{ type: Boolean,default:false },
    cart:{type:[CartSchema],default:[]}
});
const user = model("user", UserSchema);  //Creating a model (collectionName)

export {UserSchema};
export default user ;
