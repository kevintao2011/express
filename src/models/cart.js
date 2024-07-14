import { ObjectId } from 'mongodb';
import mongoose, { Schema, model} from 'mongoose';
import { ProductVariantSchema } from './product.js';

const detailsSchema = new Schema({
    prod_id:{type:ProductVariantSchema,ref:'products'}, 
    quantity:{type:Number}, // 
})
const CartSchema = new Schema({ //schema
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    products:{type:[detailsSchema],default:[]}
});
const Cart = model("cart",CartSchema);  //Creating a model

export default Cart;