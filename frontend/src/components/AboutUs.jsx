import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    Briefcase,
    Globe,
    Target,
    Users,
    Quote
} from 'lucide-react';
import { FaLinkedinIn, FaTwitterSquare } from 'react-icons/fa';

const AboutUs = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const teamMembers = [
        {
            name: "Sarah Chen",
            role: "Founder & CEO",
            image: "/api/placeholder/200/200",
            fallback: "SC",
            bio: "Tech entrepreneur with 15 years of experience in HR technology and startup scaling. Previously led innovative talent solutions at top-tier tech companies.",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
        },
        {
            name: "Michael Rodriguez",
            role: "CTO",
            image: "/api/placeholder/200/200",
            fallback: "MR",
            bio: "Machine learning expert specializing in AI-driven recruitment technologies. PhD in Computer Science with multiple patents in intelligent matching algorithms.",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
        },
        {
            name: "Emily Kim",
            role: "Head of Product",
            image: "/api/placeholder/200/200",
            fallback: "EK",
            bio: "Product design veteran with a passion for creating user-centric platforms. Previously led product teams at leading job and talent marketplaces.",
            linkedin: "https://linkedin.com",
            twitter: "https://twitter.com"
        }
    ];

    const companyValues = [
        {
            icon: <Briefcase className="w-10 h-10 text-blue-600" />,
            title: "Professional Connection",
            description: "Bridging talent with opportunity through intelligent matching.",
            detailedDescription: "Our platform goes beyond traditional job searching by creating meaningful connections that consider not just skills, but potential, cultural fit, and career aspirations."
        },
        {
            icon: <Globe className="w-10 h-10 text-green-600" />,
            title: "Global Reach",
            description: "Connecting job seekers and employers across industries and borders.",
            detailedDescription: "We leverage advanced technology to break down geographical barriers, enabling talent and opportunities to find each other regardless of location or background."
        },
        {
            icon: <Target className="w-10 h-10 text-purple-600" />,
            title: "Precision Matching",
            description: "Using advanced algorithms to find the perfect job-candidate fit.",
            detailedDescription: "Our proprietary AI-driven matching system analyzes multiple dimensions - skills, experience, potential, and cultural alignment - to create optimal professional connections."
        }
    ];

    const handleMemberSelect = (member) => {
        setSelectedMember(member);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center mb-16 text-gray-900 
            bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Reimagining Professional Connections
                </h1>

                <Card className="mb-16 shadow-xl">
                    <CardContent className="py-12">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="space-y-6 px-6">
                                <Quote className="w-16 h-16 text-blue-500 opacity-50" />
                                <p className="text-2xl font-semibold text-gray-800 italic">
                                    "Worklync isn't just a job platform. It's a career catalyst that transforms how professionals and companies discover and connect with each other."
                                </p>
                                <div className="flex items-center">
                                    <div>
                                        <h4 className="font-bold text-lg">Vishal Dhakrey</h4>
                                        <p className="text-gray-600">Founder & CEO</p>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8">
                                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Our Core Purpose</h3>
                                    <p className="text-gray-700">
                                        We believe that every professional deserves a workplace where they can thrive,
                                        and every company deserves team members who are truly passionate and aligned
                                        with their mission.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {companyValues.map((value, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 
                            border-2 border-transparent hover:border-blue-200"
                        >
                            <CardContent className="p-6 text-center">
                                <div className="flex justify-center mb-6">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-4 text-gray-800">{value.title}</h3>
                                <p className="text-gray-600 mb-4">{value.description}</p>
                                <p className="text-sm text-gray-500">{value.detailedDescription}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-12 text-gray-800">
                        Meet the Visionaries Behind Worklync
                    </h2>
                    <div className="flex justify-center space-x-8">
                        {teamMembers.map((member, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <div
                                        onClick={() => handleMemberSelect(member)}
                                        className="cursor-pointer hover:scale-105 transition-transform"
                                    >
                                        <Avatar className="w-28 h-28 mx-auto mb-4 ring-4 ring-blue-200">
                                            <AvatarImage src={member.image} alt={member.name} />
                                            <AvatarFallback>{member.fallback}</AvatarFallback>
                                        </Avatar>
                                        <h4 className="text-xl font-semibold">{member.name}</h4>
                                        <p className="text-gray-600">{member.role}</p>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="text-center">{selectedMember?.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid md:grid-cols-3 gap-6 p-6">
                                        <div className="col-span-1 flex flex-col items-center">
                                            <Avatar className="w-40 h-40 mb-4">
                                                <AvatarImage src={selectedMember?.image} alt={selectedMember?.name} />
                                                <AvatarFallback>{selectedMember?.fallback}</AvatarFallback>
                                            </Avatar>
                                            <p className="font-semibold text-lg">{selectedMember?.role}</p>
                                            <div className="flex space-x-4 mt-4">
                                                <a href={selectedMember?.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <FaLinkedinIn className="w-6 h-6 text-blue-600 hover:text-blue-800" />
                                                </a>
                                                <a href={selectedMember?.twitter} target="_blank" rel="noopener noreferrer">
                                                    <FaTwitterSquare className="w-6 h-6 text-blue-400 hover:text-blue-600" />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-gray-700">{selectedMember?.bio}</p>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;