import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '@radix-ui/react-radio-group'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import axios from "axios";
import { toast } from "sonner"
import { GoEye, GoEyeClosed } from "react-icons/go"
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setUser, setLoading } from '@/store/slices/authSlice'

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: ""
  })

  const [showPassword, setShowPassword] = useState(false);
  const {loading, user} = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const submitFormHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/")
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if(user) {
      navigate("/")
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className='bg:white flex items-center justify-center px-4 md:px-0'>
        <form onSubmit={submitFormHandler} className='w-full max-w-md md:max-w-lg lg:max-w-2xl border border-gray-200 rounded-md p-6 md:p-8 my-10'>
          <h1 className='text-center font-bold text-2xl md:text-3xl mb-6'>Login</h1>
          <div className='my-4'>
            <label className="block mb-1 text-gray-700 font-bold">Email</label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="w-full"
            />
          </div>
          <div className='my-4'>
            <label className="block mb-1 text-gray-700 font-bold">Password</label>
            <div className='flex items-center relative'>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Password"
                required
                className="w-full pr-10" // Adds padding to the right to make space for the icon
              />

              <span
                className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <GoEye /> : <GoEyeClosed />}
              </span>
            </div>
          </div>


          <div className='my-6'>
            <RadioGroup className='flex items-center justify-center gap-4'>
              <div className='flex items-center space-x-2'>
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  required
                  className="cursor-pointer"
                />
                <label htmlFor="role-student" className="text-gray-700 font-medium">Student</label>
              </div>
              <div className='flex items-center space-x-2 '>
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  required
                  className="cursor-pointer"
                />
                <label htmlFor="role-recruiter" className="text-gray-700 font-medium">Recruiter</label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? 
            <Button className="w-full py-3 my-4"> <Loader2 className='mr-2 h-4, w-4 animate-spin'> Please wait </Loader2></Button> :
            <Button type="submit" className="w-full py-3 my-4 text-lg">Login</Button>
          }
          <p className="mt-6 text-md text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to={"/signup"} className="text-blue-700 font-semibold hover:text-blue-900">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login;
