import React, { useEffect } from 'react'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from "../hooks/useGetAllJobs"
import { setSearchJobQuery } from '@/store/slices/jobSlice'

const Browse = () => {
  useGetAllJobs()
  const dispatch = useDispatch()
  const {allJobs} = useSelector(store => store.job)

  useEffect(() => {
    return () => {
      dispatch(setSearchJobQuery(""))
    }
  },[])
  return (
    <div>
      <div className='max-w-7xl outer-container h-full overflow-hidden mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Result ({allJobs.length})</h1>
        <div className='grid lg:grid-cols-3 md:grid-cols-2 gap-4'>
          {
            allJobs?.map((job) => {
              return (
                <Job key={job._id} job={job}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Browse