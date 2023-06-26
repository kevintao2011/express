import { Schema, model} from 'mongoose';


const UserSchema = new Schema({ //schema
    
    email:String,
    cohort:Date,
    major:String,
    gender:String,
    contact:Number,
    username: String,
    uid: String, // String is shorthand for {type: String}
    identifier: String,
    imgurl: String,
    token: String,
    exp:Date,
    created:Date,
    last_sign_in:{ type: Date },
});
const user = model("user", UserSchema);  //Creating a model (collectionName)

export default user;
