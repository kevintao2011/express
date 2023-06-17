import { Schema, model} from 'mongoose';


const UserSchema = new Schema({ //schema
    
    uid: String, // String is shorthand for {type: String}
    token: String,
    email:String,
    identifier: String,
    username: String,
    imgurl: String,
    token: String,
    exp:{ type: Date, default: Date.now },
    created:{ type: Date, default: Date.now },
    last_sign_in:{ type: Date, default: Date.now },
});
const user = model("User", UserSchema);  //Creating a model

export default user;
