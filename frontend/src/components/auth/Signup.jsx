import React, { useState, useEffect } from "react"
import Navbar from "../shared/Navbar"
import { RadioGroup } from "@radix-ui/react-radio-group"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { USER_API_END_POINT } from "@/utils/constant"
import axios from "axios"
import { GoEye, GoEyeClosed } from "react-icons/go"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "@/store/slices/authSlice"
import { Loader2 } from "lucide-react"

const Signup = () => {
  const {user} = useSelector(store => store.auth)
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  })
  const dispatch = useDispatch()
  const { loading } = useSelector((store) => store.auth)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    phoneNumber: "",
  })

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8
  }

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/
    return phoneRegex.test(phoneNumber)
  }

  const changeEventHandler = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })

    if (name === "email") {
      setErrors({
        ...errors,
        email: validateEmail(value) ? "" : "Invalid email address",
      })
    } else if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value)
          ? ""
          : "Password must be at least 8 characters",
      })
    } else if (name === "phoneNumber") {
      setErrors({
        ...errors,
        phoneNumber: validatePhoneNumber(value)
          ? ""
          : "Phone number must be 10 digits",
      })
    }
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitFormHandler = async (e) => {
    e.preventDefault()

    if (
      !validateEmail(input.email) ||
      !validatePassword(input.password) ||
      !validatePhoneNumber(input.phoneNumber)
    ) {
      alert("Please fix errors before submitting")
      return
    }

    const formData = new FormData()
    formData.append("fullName", input.fullName)
    formData.append("email", input.email)
    formData.append("phoneNumber", input.phoneNumber)
    formData.append("password", input.password)
    formData.append("role", input.role)
    if (input.file) {
      formData.append("file", input.file)
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      console.log(res.data.message)
      if (res.data.success) {
        navigate("/login")
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error.response.data.message)
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }
  useEffect(() => {
    if(user) {
      navigate("/")
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center px-4 md:px-0">
        <form
          onSubmit={submitFormHandler}
          className="w-full max-w-md md:max-w-lg lg:max-w-2xl border border-gray-200 rounded-md p-6 md:p-8 my-10"
        >
          <h1 className="text-center font-bold text-2xl md:text-3xl mb-6">
            Signup
          </h1>

          <div className="my-4">
            <label className="block mb-1 text-gray-700">Full Name</label>
            <Input
              type="text"
              name="fullName"
              value={input.fullName}
              onChange={changeEventHandler}
              placeholder="Your full name"
              className="w-full"
            />
          </div>

          <div className="my-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Email"
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="my-4">
            <label className="block mb-1 text-gray-700">Phone Number</label>
            <Input
              type="text"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              placeholder="Phone Number"
              className="w-full"
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="my-4">
            <label className="block mb-1 text-gray-700">Password</label>
            <div className="flex items-center relative">
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="Password"
                required
                className="w-full pr-10"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">{errors.password}</p>
              )}
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <GoEye /> : <GoEyeClosed />}
              </span>
            </div>
          </div>
          <div className="my-6">
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  required
                  className="cursor-pointer"
                />
                <label htmlFor="role-student" className="text-gray-700">
                  Student
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  required
                  className="cursor-pointer"
                />
                <label htmlFor="role-recruiter" className="text-gray-700">
                  Recruiter
                </label>
              </div>
            </RadioGroup>
          </div>

          <div className="my-4">
            <Label className="block mb-1 text-gray-700">Profile Picture</Label>
            <Input
              accept="image/*"
              type="file"
              onChange={changeFileHandler}
              className="cursor-pointer w-full"
            />
          </div>
          {loading ? (
            <Button className="w-full my-4">
              {" "}
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait{" "}
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Signup
            </Button>
          )}
          <p className="mt-6 text-xs text-gray-600 text-center">
            Already have an account?{" "}
            <Link to={"/login"} className="text-blue-900 font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Signup
