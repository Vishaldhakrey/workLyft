import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchJobQuery } from "@/store/slices/jobSlice";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchJobQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 my-10"
      >
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium shadow-md">
          #1 Career Platform for Students
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-5xl font-bold mt-5 leading-tight"
      >
        Discover Your <span className="text-[#6A38C2]">Perfect Job</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
      >
        Whether you’re looking for internships, part-time, or full-time positions, we connect students with top companies. Start your journey to career success here.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-white flex w-[90%] md:w-[40%] shadow-lg border border-purple-300 hover:border-purple-500 pl-3 rounded-full items-center gap-4 mx-auto my-12 transition duration-300"
      >
        <input
          type="text"
          placeholder="Find Jobs..."
          className="outline-none border-none w-full text-gray-800 rounded-l-full"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={searchJobHandler} className="rounded-r-full py-0 bg-[#6A38C2]">
          <Search className='h-5 w-5' />
        </Button>
      </motion.div>
    </div>
  );
};

export default HeroSection;
