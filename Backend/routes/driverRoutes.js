import express from 'express';
import { auth,authorizeDriver } from '../middleware/auth.middleware.js';
const router = express.Router();

router.use(auth,authorizeDriver);

router.get('/my-route',(req,res)=>{
    res.json({message:'my route for driver'});
})

export default router;