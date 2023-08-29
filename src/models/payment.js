import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';


const PaymentMethodSchema = new Schema({ //schema

    payment_name:String,
    online:Boolean,
    link:String,

});
const paymentMethod = model("payments", PaymentMethodSchema);  //Creating a model

export {PaymentMethodSchema,paymentMethod};
