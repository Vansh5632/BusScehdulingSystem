import mongoose from "mongoose";

const connectdb = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb connected');
    }catch(err){
        console.log(err);
    }
}

export default connectdb;