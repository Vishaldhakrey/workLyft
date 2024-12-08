import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import MyFooter from './shared/MyFooter'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TrustedCompanies from './TrustedCompanies'
import Reviews from './Reviews'
import PostReview from './PostReview'

const Home = () => {
  useGetAllJobs()
  const {user} = useSelector(store => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if(user?.role === 'recruiter') {
      navigate('/admin/companies')
    }
  },[])
  
  return (
    <div className='bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 min-h-screen'>
        <HeroSection />
        <CategoryCarousel />
        <LatestJobs />
        <TrustedCompanies />
        <Reviews />
        <PostReview />
        <MyFooter />
    </div>
  )
}

export default Home