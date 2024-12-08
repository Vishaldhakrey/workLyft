import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import {COMPANY_API_END_POINT} from "../../utils/constant"
import { toast } from 'sonner'
import axios from 'axios'


const CreateCompany = () => {
    const navigate = useNavigate()
    const [companyName, setCompanyName] = useState("")

    const registerCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': "application/json"
                },
                withCredentials: true
            })
            if(res.data.success) {
                toast.success(res.data.message)
                const companyId = res?.data?.company?._id
                navigate(`/admin/companies/${companyId}`)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Company Name</h1>
                    <p className='text-gray-500'>What would you like to give Company Name? you can change it later also.</p>
                </div>
                <label>Company Name</label>
                <Input type="text" className="my-2" placeholder="company name" onChange={(e) => setCompanyName(e.target.value)} />
                <div className=''>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CreateCompany