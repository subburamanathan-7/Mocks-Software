import { useState } from 'react'
import {useMutation} from '@tanstack/react-query'
import {toast} from 'react-hot-toast'

import {addResume} from '../features/admin/AdminServices'
function AddResumeModal() {
    const [formData,setFormData] = useState({
        regNo:'',
        resumeFile:''
    });
    const [buttonState,setButtonState] = useState(false)

    const handleChange= (e)=>{
        const {name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}));

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        setButtonState(true)
        addResumeMutation.mutate({
            regNo:formData.regNo,
            resumeFile:formData.resumeFile,
            token:sessionStorage.getItem('user')
        })

    }
    const addResumeMutation  = useMutation({
        mutationFn:addResume,
        onSuccess:(data)=>{
            toast.success('resume added succesfully')
            setButtonState(false)
        },
        onError:(data)=>{
            toast.error(data.response.data.message)
            setButtonState(false)
        }
    })
    return (
        <>
             <div className="">
                <div className="contianer mx-auto">
                    <div className='flex flex-col py-10 px-12'>
                        <h3 className=' font-base text-xl'>Add Resume</h3>
                        <hr className='my-[2%]'/>
                        <div className='flex justify-center my-[2%]'>
                            <form className=' w-[70%] relative rounded-md overflow-hidden  '>
                                <div className=' px-[3%] py-[0.5%] flex items-center justify-center bg-opacity-75 rounded-md border-2 border'>
                                   
                                    <input type='text' 
                                    placeholder='Enter the 13 digit registration number' 
                                    className='placeholder-[#000000] w-full px-2 rounded-full appearance-none focus:outline-none border-none '
                                    id="regNo"
                                    name="regNo"
                                    required
                                    onChange={handleChange} 
                                    value={formData.regNo} />
                                </div>

                                <div className=' px-[3%] py-[0.5%] flex items-center justify-center bg-opacity-75 rounded-md border-2 border'>
                                    <input type='text' 
                                    placeholder='Enter the resume drive link' 
                                    className='placeholder-[#000000] w-full px-2 rounded-full appearance-none focus:outline-none border-none '
                                    id="resumeFile"
                                    name="resumeFile"
                                    onChange={handleChange}
                                    required
                                    value={formData.resumeFile} />
                                </div>
                                
                                
                                <div className='flex items-center justify-center mt-5 text-white'>
                                    <button className='px-[2%] py-2 cursor-pointer bg-red focus:outine-none font-medium text-sm rounded-lg text-center w-full mx-2 hover:scale-95 duration-150'
                                    type='submit' id='cancel' onClick={()=>{}}>
                                        Cancel
                                    </button>
                                    <button className=' px-[2%] py-2 cursor-pointer bg-green focus:outine-none font-medium text-sm rounded-lg  text-center w-full mx-2 hover:scale-95 duration-150'
                                    disabled={buttonState || !formData.regNo || !formData.resumeFile} type='submit' id = 'submit' onClick={handleSubmit}>
                                        Assign Student 
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddResumeModal