import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { REVIEW_API_END_POINT } from "@/utils/constant";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const PostReview = () => {
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const toggleModal = () => setIsModalVisible(!isModalVisible);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${REVIEW_API_END_POINT}/post`,
                { rating, comment },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setRating(0);
                setComment("");
                toggleModal();
                navigate("/")
            }
        } catch (error) {
            console.error("Failed to submit review:", error);
            toast.error("Something went wrong. Please try again!");
        }
    };

    return (
        <div className="relative">
            <div className='flex items-center justify-center mb-10'>
                <Button
                    onClick={toggleModal}
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg transition-all ease-in-out duration-300"
                >
                    Post Review
                </Button>
            </div>

            {isModalVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="bg-white w-11/12 max-w-md p-8 rounded-lg shadow-lg space-y-6"
                        initial={{ y: '-100vh' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100vh' }}
                        transition={{ duration: 0.5 }}
                    >
                        <Button
                            onClick={toggleModal}
                            className="absolute top-4 right-4 text-gray-600 text-2xl font-bold"
                        >
                            &times;
                        </Button>

                        <h2 className="text-2xl font-semibold text-center text-gray-800">Post Your Review</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Rating (1-5)</label>
                                <Input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rating}
                                    onChange={(e) => setRating(Number(e.target.value))}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600">Your Comment</label>
                                <Textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div className="flex justify-between space-x-4">
                                <Button
                                    type="submit"
                                    className="flex-1 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
                                >
                                    Submit Review
                                </Button>
                                <Button
                                    type="button"
                                    onClick={toggleModal}
                                    className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all duration-300"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}

export default PostReview;
