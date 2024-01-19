import { ObjectId } from 'mongodb';
import { Schema, model} from 'mongoose';
const FPSSchema = new Schema({
    phone_number:Number,
    bank_account:String,
    shown_name:String,
    activated:{type:Boolean,default:false}
})

const PaymeSchema = new Schema({
    payme_url:String,
    phone_number:Number,
    shown_name:String,
    activated:{type:Boolean,default:false}
})

const CashSchema = new Schema({
    activated:{type:Boolean,default:false}
})

const DeopositSchema = new Schema({
    bank_index:String,
    bank_account:String,
    shown_name:String,
    activated:{type:Boolean,default:false}
})

const PaymentMethodSchema = new Schema({ //schema
    ref_society:{type:String,unique: true },
    FPS:{type:FPSSchema,default:{}},
    Payme:{type:PaymeSchema,default:{}},
    Cash:{type:CashSchema,default:{}},
    Deposit:{type:DeopositSchema,default:{}}
});

const paymentMethod = model("payment", PaymentMethodSchema);  //Creating a model

export {PaymentMethodSchema,paymentMethod};
