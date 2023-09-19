
import mongoose, { Mongoose, Schema, model} from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserSchema } from '../user.js';
import coupon,{ couponSchema } from './coupon.js';
import { ProductSchema } from './product.js';
import payment,{ paymentSchema } from './payment.js';
import { deliverySchema } from './delivery.js';
import product from './product.js';
import user from '../user.js';

const allProductsSchema = new Schema({
    type: String,
    sold: {type:Boolean,default:false},
    ref_product:{type:mongoose.Schema.Types.ObjectId,ref:'new_product'},
    used_coupon:{type:mongoose.Schema.Types.ObjectId,ref:'coupons',default:[]},
    buyer:{type:mongoose.Schema.Types.ObjectId,ref:user},
    delivery:mongoose.Schema.ObjectId,
    remark:ObjectId, //{Type:[remarkSchema],default:[remarkSchema]},
    payment:{type:mongoose.Schema.Types.ObjectId,ref:payment},
    sku:String
})


// ProductSchema.path('activity').ref(activity)
const allProducts = model("soldProducts", allProductsSchema);  //Creating a model

export {allProductsSchema}
export default allProducts;

