
import { Schema, model} from 'mongoose';
import mongoose from 'mongoose';
import product from './product.js';
import user from '../user.js';

const deliveryRemarkSchema = new Schema({
    created_by:{Type:mongoose.Schema.Types.ObjectId,ref:user}
})
const deliverySchema = new Schema({ //schema
    delivery_remark:[],
    delivered:Boolean,
});
// ProductSchema.path('activity').ref(activity)
const delivery = model("deliveries", coupon);  //Creating a model

export {delivery,deliverySchema };
export default delivery;
