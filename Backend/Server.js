import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT  = process.env.PORT||5000;
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server is running on port ${PORT}`);
    }
})
