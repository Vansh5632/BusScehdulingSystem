import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';

dotenv.config();
const app = express();
app.use(cookieParser());

export const signup = async (req, res) => {
    try {
        const { username, mobileno, password, role } = req.body;
        const user = await User.findOne({ mobileno });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
                username,
                mobileno,
                password: hashedPassword,
                role
            });
            await newUser.save();
            res.status(201).json({ message: 'User created successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { mobileno, password } = req.body;
        const user = await User.findOne({ mobileno });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ mobileno: user.mobileno, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.status(200).json({ message: 'User signed in successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User signed out successfully' });
};