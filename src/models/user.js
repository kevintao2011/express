import { Schema, SchemaType, model} from 'mongoose';
import mongoose from 'mongoose';
import product from './product.js';
import { ObjectId } from 'mongodb';
const UserSchema = new Schema({ //schema
    
    email:String,
    cohort:Date,
    major:String,
    gender:String,
    contact:Number,
    username: String,
    chi_name: String,
    eng_name: String,
    order:Array,
    uid: String, // String is shorthand for {type: String}
    identifier: String,
    imgurl: String,
    sid: String,
    exp:Date,
    createdAt:{type:Date,default:Date.now(),immutable:true},
    societies:Object,
    cart:{type:Schema.Types.ObjectId,ref:'products.variants',default:[]},
    last_sign_in:{ type: Date,default:Date.now() },
    first_login:{ type: Boolean,default:false },
});
const user = model("user", UserSchema);  //Creating a model (collectionName)

export default user ;
