import React from 'react';
import { motion } from 'framer-motion';
import data from "../data/data.json";

const TrustedCompanies = () => {
    return (
        <div className="text-center my-8 w-full">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Trusted by Leading Companies</h2>
            <p className=" text-gray-700 mb-8">
                Thousands of jobs available from the world’s most reputable companies.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
                {data?.companies?.array?.map((company, index) => (
                    <motion.div
                        key={index}
                        className="p-4 bg-white shadow-md rounded-lg border border-gray-200 flex items-center justify-center w-40 h-40"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <img
                            src={company.logo}
                            alt={`${company.name} logo`}
                            className="w-20 h-20 object-contain"
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default TrustedCompanies;
