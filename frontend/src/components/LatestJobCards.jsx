import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/description/${job._id}`)} className="p-6 rounded-lg shadow-lg bg-white border border-gray-200 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-gradient-to-r hover:from-blue-500 hover:via-purple-500 hover:to-pink-500">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          {job?.company?.name}
        </h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-2">{job?.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <Badge
          className="bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full"
          variant="ghost"
        >
          {job?.position} Positions
        </Badge>
        <Badge
          className="bg-red-100 text-red-800 font-medium px-3 py-1 rounded-full"
          variant="ghost"
        >
          {job?.jobType}
        </Badge>
        <Badge
          className="bg-purple-100 text-purple-800 font-medium px-3 py-1 rounded-full"
          variant="ghost"
        >
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
