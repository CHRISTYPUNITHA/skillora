import { verifyToken } from "../utils/jwt.token.js";
import { prisma } from "../lib/prisma.js";

export const authendicateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, role: true },
        });
        if (!user) {
            res.clearCookie('token', { path: '/' });
            return res.status(401).json({ message: 'Session expired. Please log in again.' });
        }

        req.user = decoded;
        req.user.role = user.role;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }
}