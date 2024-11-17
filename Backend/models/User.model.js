import mongoose from "mongoose";

const UserSchema = new.mongoose.Schema({
    username:{type:String, required:true},
    mobileno:{type:Number, required:true}, 
    password:{type:String, required:true},
    role:{type:String,enum:['admin','driver'], required:true}
});

export default mongoose.model('User',UserSchema);


