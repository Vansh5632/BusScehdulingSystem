import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies

// Signup endpoint
export const signup = async (req, res) => {
    try {
        const { username, mobileno, password, role } = req.body;

        // Check if user already exists
        const user = await User.findOne({ mobileno });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
        const newUser = new User({
            username,
            mobileno,
            password: hashedPassword,
            role
        });
        await newUser.save();

        // Generate a token
        const token = jwt.sign(
            { mobileno: newUser.mobileno, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Store the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
        });

        // Respond with success message and user data if needed
        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Signin endpoint
export const signin = async (req, res) => {
    try {
        const { mobileno, password } = req.body;

        // Find the user
        const user = await User.findOne({ mobileno });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate a token
        const token = jwt.sign(
            { mobileno: user.mobileno, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Store the token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
        });

        res.status(200).json({ message: 'User signed in successfully', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Signout endpoint
export const signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'User signed out successfully' });
};

