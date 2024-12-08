import { Bookmark } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Import Framer Motion

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <motion.div
      className="p-6 rounded-lg shadow-xl bg-white border border-gray-200 cursor-pointer"
      whileHover={{
        scale: 1.05, 
        y: -10, 
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{
        duration: 0.4, 
        ease: "easeOut", 
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs text-gray-500">
          {daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" size="icon" className="rounded-full">
          <Bookmark size={18} />
        </Button>
      </div>
      <div className="flex items-center gap-4 my-3">
        <div className="p-1 bg-gray-100 rounded-full">
          <Avatar className="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full">
            <AvatarImage
              src={job?.company?.logo || "https://via.placeholder.com/80/gray/808080?text=Logo"}
              alt={`${job?.company?.name} logo`}
              className="w-10 h-10 object-cover rounded-full"
            />
            <AvatarFallback className="text-xs text-gray-500">Co</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h1 className="text-xl font-semibold text-gray-800">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 flex-wrap mb-4">
        <Badge className="bg-blue-100 text-blue-700 font-medium px-3 py-1 rounded-full" variant="ghost">
          {job?.position} Positions
        </Badge>
        <Badge className="bg-red-100 text-red-700 font-medium px-3 py-1 rounded-full" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="bg-purple-100 text-purple-700 font-medium px-3 py-1 rounded-full" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
      <div className="flex items-center mt-4 gap-4">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full md:w-auto bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium"
        >
          Details
        </Button>
        <Button className="w-full md:w-auto bg-purple-700 hover:bg-purple-800 text-white font-medium">
          Save for Later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job;
