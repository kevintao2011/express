import { Schema, SchemaType, model} from 'mongoose';
import mongoose from 'mongoose';
import product from './product.js';
import { ObjectId } from 'mongodb';
import { TransactionSchema } from './transaction.js';
import moment from 'moment/moment.js';
const UserSchema = new Schema({ //schema
    
    email:String,
    cohort:Number,
    major:String,
    gender:String,
    contact:Number,
    username: String,
    first_name: String,
    last_name: String,
    uid: String, // String is shorthand for {type: String}
    identifier: String,
    imgurl: String,
    sid: String,
    exp:Date,
    createdAt:{type:Date,default:moment().utcOffset(8).toDate(),immutable:true},
    societies:Object,
    cart:{type:[Schema.Types.ObjectId],default:[]},
    last_sign_in:{ type: Date,default:moment().utcOffset(8).toDate() },
    first_login:{ type: Boolean,default:false },
});
const user = model("user", UserSchema);  //Creating a model (collectionName)

export {UserSchema};
export default user ;
