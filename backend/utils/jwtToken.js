import jwt from "jsonwebtoken";
import { User } from '../models/user.model.js';

export const sendToken = (user, statusCode, res, message) => {
    const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options). json({
        success: true,
        user,
        message,
        token,
    })
}

export const createJobLinkForUser = (userId, jobId) => {
    console.log("userID",userId);
    console.log("jobID",jobId);
    const token = jwt.sign({ userId, jobId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return `${process.env.FRONTEND_URL}/description/${jobId}?token=${token}`;
};

export const verifyToken = async (req, res) => {
    const { token } = req.body || req.query.token;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid user' });
        }

        req.userId = decoded.userId;  // Add decoded user ID to request
        req.jobId = decoded.jobId;    // Add decoded job ID to request
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
