import React, { useState } from 'react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  const handleResumeClick = (e) => {
    if (!user?.profile?.resume) {
      e.preventDefault();
      alert("Resume not available or failed to load.");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-bold text-2xl text-gray-800">{user?.fullName}</h1>
              <p className="text-gray-600">{user?.profile?.bio || 'No bio available'}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} className="mt-4 md:mt-0 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition duration-300">
            <Pen className="mr-2" /> Edit Profile
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h2 className="font-semibold text-xl text-gray-700">Contact Information</h2>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail className="text-blue-500" />
              <span>{user?.email || 'Email not available'}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Contact className="text-blue-500" />
              <span>{user?.phoneNumber || 'Phone number not available'}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold text-xl text-gray-700">Skills</h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {user?.profile?.skills?.length ? (
                user.profile.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                    {skill}
                  </Badge>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid">
          <Label className="font-semibold text-xl text-gray-700">Resume</Label>
          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-500"
              onClick={handleResumeClick}
              aria-label="View Resume"
            >
              {user.profile.resumeOriginalName || 'View Resume'}
            </a>
          ) : (
            <span className="text-gray-500">No resume uploaded</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-10 border border-gray-200">
        <h2 className="font-bold text-2xl text-gray-800 mb-5">Applied Jobs</h2>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Profile;
