import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import data from "../data/data.json"
import { useDispatch } from 'react-redux'
import { setSearchJobQuery } from '@/store/slices/jobSlice'

const filterData = [data.cities, data.jobCategories, data.salary]

const FilterCard = () => {
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = useState("")
    
    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchJobQuery(selectedValue))
        return () => {
            dispatch(setSearchJobQuery(""))
        }
    }, [selectedValue])
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.type}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard