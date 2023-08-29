import mongoose, { Mongoose, Schema, model} from 'mongoose';
import activity from './activity.js';
import { ObjectId } from 'mongodb';
import { UserSchema } from '../user.js';
import { allProductsSchema } from './allProducts.js';

const paymentSchema = new Schema({
    type: String,
    paid:Boolean,
    ref_product:[allProductsSchema],
    payment_proof:String,
    buyer:UserSchema,
    remark:[remarkSchema],
})


// ProductSchema.path('activity').ref(activity)
const payment = model("payments", paymentSchema);  //Creating a model

export {paymentSchema};
export default payment;
