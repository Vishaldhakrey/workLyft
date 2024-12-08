import React, { useEffect } from 'react'
import { setCompanies, setSingleCompany } from '../store/slices/companySlice'
import { COMPANY_API_END_POINT } from '../utils/constant'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const useGetAllCompanies = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        const fetchAllCompanies = async() => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
                    withCredentials: true
                })
                if(res.data.success) {
                    dispatch(setCompanies(res.data.companies))
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllCompanies()
    }, [dispatch])
}

export default useGetAllCompanies