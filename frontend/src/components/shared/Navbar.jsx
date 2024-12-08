import React, { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"
import { LogOut, User2, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { USER_API_END_POINT } from "@/utils/constant"
import { toast } from "sonner"
import { setUser } from "@/store/slices/authSlice"
import axios from "axios"

const Navbar = () => {
    const { user } = useSelector((store) => store.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const getInitials = (fullName) => {
        return fullName
            ? fullName
                .split(" ")
                .map((name) => name[0].toUpperCase())
                .slice(0, 2)
                .join("")
            : ""
    }

    const handleLogout = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, {
                withCredentials: true,
            })
            if (res.data.success) {
                dispatch(setUser(null))
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Logout failed.")
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const NavLinks = () => (
        <ul className="flex flex-col md:flex-row font-medium items-start md:items-center gap-6">
            {user && user.role === "recruiter" ? (
                <>
                    <li>
                        <Link to="/admin/companies" className="hover:text-[#6A38C2]" onClick={() => setIsMenuOpen(false)}>
                            Companies
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/jobs" className="hover:text-[#6A38C2]" onClick={() => setIsMenuOpen(false)}>
                            Jobs
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-[#6A38C2]" onClick={() => setIsMenuOpen(false)}>
                            AboutUs
                        </Link>
                    </li>
                </>
            ) : (
                <>
                    <li>
                        <Link to="/" className="hover:text-[#6A38C2]" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/jobs" className="hover:text-[#6A38C2]" onClick={() => setIsMenuOpen(false)}>
                            Jobs
                        </Link>
                    </li>
                    <li>
                        <Link to="/browse" className="hover:text-[#6A38C2]" onClick={() => setIsMenuOpen(false)}>
                            Browse
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-[#6A38C2]" onClick={() => setIsMenuOpen(false)}>
                            AboutUs
                        </Link>
                    </li>
                </>
            )}
        </ul>
    )

    return (
        <div className="top-0 w-full z-50 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg">
            <div className="relative flex items-center justify-between mx-auto max-w-7xl px-4 py-2">
                <Link to="/" className="text-2xl font-bold text-gray-800">
                    Work<span className="text-[#6A38C2]">Lyft</span>
                </Link>

                {/* Mobile menu button */}
                <button
                    className="md:hidden p-2 rounded-md"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                <div className="hidden md:flex items-center gap-8">
                    <NavLinks />
                    {!user ? (
                        <div className="flex items-center gap-3">
                            <Link to="/login">
                                <Button variant="outline">Login</Button>
                            </Link>
                            <Link to="/signup">
                                <Button className="bg-[#6A38C2] text-white hover:bg-[#5b30a6]">
                                    Signup
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className="h-10 w-10 bg-gray-200 text-black flex items-center justify-center rounded-full cursor-pointer">
                                    {user?.profile?.profilePhoto ? (
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    ) : (
                                        <AvatarFallback className="text-black font-bold">
                                            {getInitials(user?.fullName)}
                                        </AvatarFallback>
                                    )}
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 shadow-lg rounded-lg bg-white border border-gray-200">
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar className="h-12 w-12 bg-gray-200 text-black flex items-center justify-center rounded-full">
                                        {user?.profile?.profilePhoto ? (
                                            <AvatarImage src={user.profile.profilePhoto} />
                                        ) : (
                                            <AvatarFallback className="text-black font-bold">
                                                {getInitials(user?.fullName)}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium text-gray-800">
                                            {user?.fullName}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {user?.profile?.bio}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 text-gray-600">
                                    {user && user.role === "student" && (
                                        <div className="flex items-center gap-2 cursor-pointer">
                                            <User2 />
                                            <Link to="/profile" className="hover:text-[#6A38C2]">
                                                View Profile
                                            </Link>
                                        </div>
                                    )}
                                    <div
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={handleLogout}
                                    >
                                        <LogOut />
                                        <span className="hover:text-[#F83002]">Logout</span>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden p-4 border-t">
                        <div className="flex flex-col gap-4">
                            <NavLinks />
                            {!user ? (
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                        <Button variant="outline" className="w-full">Login</Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                                        <Button className="w-full bg-[#6A38C2] text-white hover:bg-[#5b30a6]">
                                            Signup
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3 border-t pt-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10 bg-gray-200 text-black flex items-center justify-center rounded-full">
                                            {user?.profile?.profilePhoto ? (
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                            ) : (
                                                <AvatarFallback className="text-black font-bold">
                                                    {getInitials(user?.fullName)}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div>
                                            <h4 className="font-medium text-gray-800">
                                                {user?.fullName}
                                            </h4>
                                        </div>
                                    </div>
                                    {user && user.role === "student" && (
                                        <Link to="/profile" className="flex items-center gap-2 text-gray-600 hover:text-[#6A38C2]" onClick={() => setIsMenuOpen(false)}>
                                            <User2 size={20} />
                                            <span>View Profile</span>
                                        </Link>
                                    )}
                                    <button
                                        className="flex items-center gap-2 text-gray-600 hover:text-[#F83002]"
                                        onClick={() => {
                                            handleLogout()
                                            setIsMenuOpen(false)
                                        }}
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar