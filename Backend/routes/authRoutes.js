import express from 'express';
import { signup, signin, signout } from '../controllers/auth.Controller.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

export default router;