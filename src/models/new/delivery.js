
import { Schema, model} from 'mongoose';
import mongoose from 'mongoose';
import product from './product.js';
import user, { UserSchema } from '../user.js';



const deliveryRemarkSchema = new Schema({
    created_by:{type:mongoose.Schema.Types.ObjectId,ref:"users"}
})
const deliverySchema = new Schema({ //schema
    delivery_remark:[],
    delivered:Boolean,
});
// ProductSchema.path('activity').ref(activity)
const delivery = model("deliveries", deliverySchema);  //Creating a model

export {delivery,deliverySchema };
export default delivery;
