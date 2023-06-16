import { Schema, model, models } from 'mongoose';


const UserSchema = new Schema({
    
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
const user = models.User || model("User", UserSchema); 

export default user;