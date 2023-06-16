import mongoose from "mongoose";
const connectDB = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            "Database connected: ",
            connect.connection.host,
            connect.connection.name
            
        );
        await connect.disconnect();
        console.log(
            "Database disconnected: ",
            
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

export default connectDB;