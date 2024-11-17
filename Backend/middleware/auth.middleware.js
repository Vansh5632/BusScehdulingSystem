import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}

export const authorizeDriver = (req, res, next) => {
    if (req.user.role !== 'driver') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
}