import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import data from "../data/data.json";
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchJobQuery } from '@/store/slices/jobSlice';
import { motion } from 'framer-motion';

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = (query) => {
    dispatch(setSearchJobQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-20 px-4 md:px-8">
      <Carousel className="w-full max-w-xl mx-auto ">
        <CarouselContent>
          {
            data.jobCategories.array.map((cat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <CarouselItem className="flex justify-center md:basis-1/2 lg:basis-1/3 px-2">
                  <Button 
                    onClick={() => searchJobHandler(cat)} 
                    className="py-3 px-6 text-lg font-semibold bg-blue-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:bg-blue-600"
                  >
                    {cat}
                  </Button>
                </CarouselItem>
              </motion.div>
            ))
          }
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white hover:bg-blue-500 transition-all duration-300 p-2 rounded-full">
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CarouselPrevious>
        
        <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white hover:bg-blue-500 transition-all duration-300 p-2 rounded-full">
          {/* Custom Next Arrow Icon */}
          <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </CarouselNext>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
