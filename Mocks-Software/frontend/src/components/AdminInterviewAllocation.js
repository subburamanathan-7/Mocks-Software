import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"

import { allocateStudent } from "../features/incharge/InchargeServices";

function AdminInterviewAllocation({student}) {
    const [interviewerEmail, setInterviewerEmail] = useState('')
    const [buttonState,setButtonState] = useState(false)

    const allocateStudentMutation = useMutation({
        mutationFn:allocateStudent,
        onSuccess:(data)=>{
            toast.success('allocation successful')
            setButtonState(false)
        },
        onError:(message)=>{
            toast.error(message.response.data.message)
            setButtonState(false)
            
        }
    })

    const handleChange =(e)=>{
        const value = e.target.value
        setInterviewerEmail(value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        setButtonState(true)
        allocateStudentMutation.mutate({
            interviewerEmail:interviewerEmail,
            studentregNo:student,
            token:sessionStorage.getItem('user')
        })
    }

    return (
        <>
        <div className="">
            <div className="contianer mx-auto">
                <div className='flex flex-col py-10 px-12'>
                    <h3 className=' font-base text-xl'>Assign Interview</h3>
                    <hr className='my-[2%]'/>
                    <div className='flex justify-center my-[2%]'>
                        <form className=' w-[70%] relative rounded-md overflow-hidden  '>
                            <div className=' px-[3%] py-[0.5%] flex items-center justify-center bg-opacity-75 rounded-md border-2 border'>
                                <input type='text' placeholder='Enter Interviewer Email' className='placeholder-[#000000] w-full px-2 rounded-full appearance-none focus:outline-none border-none '
                                onChange={handleChange} value={interviewerEmail} />
                            </div>
                            <div className='flex items-center justify-center mt-5 text-white'>
                                <button className='px-[2%] py-2 cursor-pointer bg-red focus:outine-none font-medium text-sm rounded-lg text-center w-full mx-2 hover:scale-95 duration-150'
                                type='submit' id='cancel' onClick={()=>{}}>
                                    Cancel
                                </button>
                                <button className=' px-[2%] py-2 cursor-pointer bg-green focus:outine-none font-medium text-sm rounded-lg  text-center w-full mx-2 hover:scale-95 duration-150'
                                disabled={buttonState} type='submit' id = 'submit' onClick={handleSubmit}>
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

export default AdminInterviewAllocation