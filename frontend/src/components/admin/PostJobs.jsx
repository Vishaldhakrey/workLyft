import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: "",
    companyId: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector(store => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='flex items-center justify-center w-full my-8'>
        <form onSubmit={submitHandler} className='p-6 max-w-xl border border-gray-200 shadow rounded-lg bg-white'>
          <h2 className="text-xl font-semibold mb-4 text-center">Post a New Job</h2>
          <div className='space-y-4'>
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                name="title"
                placeholder="Enter job title (e.g., Frontend Developer)"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                placeholder="job description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                placeholder="Job requirements..."
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div className='flex gap-4'>
              <div className='w-1/2'>
                <Label>Salary</Label>
                <Input
                  type="number"
                  name="salary"
                  placeholder="Salary in rupees"
                  value={input.salary}
                  onChange={changeEventHandler}
                />
              </div>
              <div className='w-1/2'>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='w-1/2'>
                <Label>Job Type</Label>
                <Input
                  type="text"
                  name="jobType"
                  placeholder="Full-time, Part-time, etc."
                  value={input.jobType}
                  onChange={changeEventHandler}
                />
              </div>
              <div className='w-1/2'>
                <Label>Experience Level</Label>
                <Input
                  type="text"
                  name="experience"
                  placeholder="Experience level"
                  value={input.experience}
                  onChange={changeEventHandler}
                />
              </div>
            </div>
            <div>
              <Label>Number of Positions</Label>
              <Input
                type="number"
                name="position"
                placeholder="Positions available"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
            {companies.length > 0 ? (
              <div>
                <Label>Select Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem key={company._id} value={company.name.toLowerCase()}>{company.name}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <p className='text-xs text-red-500 mt-2 text-center'>Please register a company first.</p>
            )}
          </div>
          <div className="mt-6">
            {loading ? (
              <Button className="w-full flex items-center justify-center">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting Job...
              </Button>
            ) : (
              <Button type="submit" className="w-full">Post New Job</Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
