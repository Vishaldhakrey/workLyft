import React from 'react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'; 
import { FaStar } from 'react-icons/fa'; 
import { motion } from 'framer-motion'; 
import clsx from 'clsx'; 

const ReviewCard = ({ name, date, comment, profilePhoto, rating }) => {
    return (
        <motion.div
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out max-w-sm mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage
                        src={profilePhoto}
                        alt={`${name}'s profile`}
                        className="h-14 w-14 rounded-full border-2 border-gray-300"
                    />
                </Avatar>
                <div>
                    <h3 className="font-semibold text-xl text-gray-800">{name}</h3>
                    <p className="text-gray-500 text-sm">{date}</p>
                </div>
            </div>

            <div className="flex mb-2 mt-3">
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={clsx(
                            'text-xl',
                            i < rating ? 'text-yellow-400' : 'text-gray-300'
                        )}
                    />
                ))}
            </div>

            <p className="text-gray-700 mt-2 text-sm">{comment}</p>
        </motion.div>
    );
};

export default ReviewCard;
