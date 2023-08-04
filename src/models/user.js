import { Schema, model} from 'mongoose';


const UserSchema = new Schema({ //schema
    
    email:String,
    cohort:Date,
    major:String,
    gender:String,
    contact:Number,
    username: String,
    order:String,
    uid: String, // String is shorthand for {type: String}
    identifier: String,
    imgurl: String,
    token: String,
    sid: String,
    exp:Date,
    created:Date,
    societies:Object,
    cart:Array,
    last_sign_in:{ type: Date },
    first_login:Boolean,
});
const user = model("user", UserSchema);  //Creating a model (collectionName)

export default user ;
