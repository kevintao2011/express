import mongoose, { Mongoose, Schema, model} from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserSchema } from '../user.js';
import { allProductsSchema } from './allProducts.js';

const paymentSchema = new Schema({
    type: String,
    paid: Boolean,
    ref_product:[{type:Schema.Types.ObjectId,ref:"products"}],
    payment_proof:String,
    buyer:{type:Schema.Types.ObjectId,ref:"users"},
    // remark:[remarkSchema],
});


// ProductSchema.path('activity').ref(activity)
const payment = model("payments", paymentSchema);  //Creating a model

export {paymentSchema};
export default payment;
