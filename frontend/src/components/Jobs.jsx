import { useEffect, useState } from "react";
import Job from "./Job";
import FilterCard from "./filterCard";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchJobQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false); // State for toggling filters

  useEffect(() => {
    if (searchJobQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchJobQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchJobQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchJobQuery]);

  return (
    <div className="px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto mt-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Button for Small Screens */}
          <div className="lg:hidden">
            <button
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600"
              onClick={() => setShowFilters(true)} // Show filters on button click
            >
              Open Filters
            </button>
          </div>

          {/* Sidebar for Filters */}
          <div
            className={`${
              showFilters ? "fixed" : "hidden"
            } lg:block bg-white shadow-md p-4 rounded-lg lg:w-1/4 z-20 top-0 left-0 w-4/5 h-full lg:static lg:h-auto`}
          >
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                className="text-gray-600 text-xl font-bold"
                onClick={() => setShowFilters(false)} // Hide filters on button click
              >
                &times;
              </button>
            </div>
            <FilterCard />
          </div>

          {/* Job Cards */}
          <div className="flex-1">
            {filterJobs.length <= 0 ? (
              <span className="text-lg text-gray-600 block text-center">
                No jobs found
              </span>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filterJobs.map((job) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-blue-400 hover:border rounded-lg"
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
