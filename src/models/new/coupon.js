
import { Schema, model} from 'mongoose';
import mongoose from 'mongoose';
import allProducts from './allProducts.js';
import product,{ProductSchema} from './product.js';

const requirementSchema = new Schema({
    parent_product:{Type:mongoose.Schema.Types.ObjectId,ref:product},
    quantity:Number
})
const deductionSchema = new Schema({
    parent_product:{Type:mongoose.Schema.Types.ObjectId,ref:product},
    amount:Number
})
const couponSchema = new Schema({ //schema
    coupon_code:{type:String,immutable:true},
    coupon_type:String, //buy A get B, buy $100 - $10, 
    end_date:Date, //when stop showing this coupon
    max_per_person:Number, //how many is allowed to use per person
    max_quantity:Number,// how many is allowed to use total
    used_quantity:Number,// how many is used
    unique:Boolean, //cannot use with other coupon at the same time
    requirements:[requirementSchema],// need how many products to get the discount
    deduct_amount:[deductionSchema],// which product will have discount 
});
// ProductSchema.path('activity').ref(activity)
const coupon = model("coupons", couponSchema);  //Creating a model

export {couponSchema};
export default coupon;
