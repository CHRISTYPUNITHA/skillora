import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma.js';
import { generateToken } from '../utils/jwt.token.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        res.status(201).json({ success: true, message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', path: '/' });
        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export const currentUser = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        const userData = await prisma.user.findUnique({
            where: { id: userId },
        });
        res.status(200).json({ success: true, user: userData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const logoutUser = async (req, res) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }
        res.clearCookie('token', { path: '/' });
        res.status(200).json({ success: true, message: 'Logout successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};