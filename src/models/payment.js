import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';




const FPSSchema = new Schema({
    qr_code_url:String,
    phone_number:Number,
    bank_account:{
        index:String,
        number:Number,   
    },
    shown_name:String,
    activated:{type:String,default:false}
})

const PaymentMethodSchema = new Schema({ //schema
    ref_society:String,
    FPS:FPSSchema,
    
});

const paymentMethod = model("payments", PaymentMethodSchema);  //Creating a model

export {PaymentMethodSchema,paymentMethod};
