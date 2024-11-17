import express from 'express';
import { auth,authorizeAdmin } from '../middleware/auth.middleware.js';
const router = express.Router();

router.use(auth,authorizeAdmin);

router.get('/manage-buses',(req,res)=>{
    res.json({message:'Bus Management for admin'});
});

export default router;
