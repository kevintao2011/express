import { Schema, model} from 'mongoose';


const NewUserSchema = new Schema({ //schema

    email:{
        type: String,
    },
    username: String,
    major:String,
    gender:String,
    contact:Number,
    cohort:Date
    // email: { //key
    // type: String,
    // unique: [true, 'Email already exists!'],
    // required: [true, 'Email is required!'],
    // },

    
    
    
});
const newUser = model("user", NewUserSchema);  //Creating a model

export default newUser;
