import React, { useEffect } from 'react'
import {APPLICATION_API_END_POINT} from "@/utils/constant"
import { useDispatch } from 'react-redux'
import { setAllAppliedJobs } from '@/store/slices/jobSlice'
import axios from 'axios'

const useGetAppliedJobs = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials: true
                })
                if(res.data.success) {
                    dispatch(setAllAppliedJobs(res.data.applications))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAppliedJobs()
    }, [])
}

export default useGetAppliedJobs