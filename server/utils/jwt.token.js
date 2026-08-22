import jwt from 'jsonwebtoken';

export const generateToken =  (user) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    return token;
};

export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  
        return decoded;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
};
