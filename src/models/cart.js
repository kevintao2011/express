import { ObjectId } from 'mongodb';
import mongoose, { Schema, model} from 'mongoose';


const detailsSchema = new Schema({
    prod_id:{type:ObjectId,ref:"products"},
    quantity:{type:Number},
    model_id:{type:ObjectId,ref:'product_models'}
})
const CartSchema = new Schema({ //schema
    user:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    products:{type:[detailsSchema],default:[]}
});
const Cart = model("cart",CartSchema);  //Creating a model

export default Cart;