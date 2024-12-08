import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from './ui/badge'
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const {allAppliedJobs} = useSelector(store => store.job)
  return (
    <Table>
      <TableCaption>A List of your applied Jobs</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Job Role</TableHead>
          <TableHead>Company</TableHead>
          <TableHead className="text-right">status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          allAppliedJobs.length<=0 ? <span>You haven't applied yet to any job.</span> : 
            allAppliedJobs?.map((appliedJob) => (
            <TableRow key={appliedJob._id}>
              <TableCell className="font-medium">{appliedJob?.createdAt.split("T")[0]}</TableCell>
              <TableCell>{appliedJob?.job?.title}  </TableCell>
              <TableCell>{appliedJob?.job?.company?.name}</TableCell>
              <TableCell className="text-right"><Badge className={appliedJob?.status === "accepted" ? "bg-blue-500 hover:bg-blue-700" : appliedJob?.status === "rejected" ? "bg-red-500 hover:bg-red-700" : "bg-black hover:bg-black"}>{appliedJob?.status}</Badge></TableCell>
            </TableRow>
          ))
        }
      </TableBody>
    </Table>
  );
};

export default AppliedJobTable;
