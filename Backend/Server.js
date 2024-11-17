import express from 'express';
import dotenv from 'dotenv';
import connectdb from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();
connectdb();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/driver',driverRoutes);
const PORT  = process.env.PORT||5000;
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`Server is running on port ${PORT}`);
    }
})
