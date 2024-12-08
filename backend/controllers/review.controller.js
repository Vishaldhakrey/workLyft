import { Review } from '../models/review.model.js';
import { User } from '../models/user.model.js';

export const postReview = async (req, res, next) => {
    try {
        const userId = req.user._id;

        if (!userId) {
            return res.status(404).json({
                message: "User not Registered, Please login first"
            });
        }

        const { rating, comment } = req.body;
        if (!rating || !comment) {
            return res.status(400).json({
                message: "All Fields are required!",
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const newReview = new Review({
            user: userId,
            rating,
            comment,
        });

        await newReview.save();

        return res.status(201).json({
            message: "Review created successfully",
            review: newReview
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find()
            .populate({
                path: "user",
                select: "fullName profile.profilePhoto createdAt"
            })
            .sort({ createdAt: -1 })
            .limit(6);


        return res.status(200).json({
            reviews
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}



export const deleteReview = async (req, res, next) => {
    try {
        const reviewId = req.params.id;

        const review = await Review.findById(reviewId).populate('user');
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        if (review.user._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "You are not authorized to delete this review" });
        }

        await review.deleteOne();

        return res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: 'Server error', error: err.message });
    }
}