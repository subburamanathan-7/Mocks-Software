import toast from 'react-hot-toast';
import { useMutation } from "@tanstack/react-query";
import { useState } from 'react';

import {deallocateStudent} from '../features/incharge/InchargeServices'

function AdminDeallocationDialog({currentInterview,student}) {
    // console.log(currentInterview)
    const [buttonState, setButtonState] = useState(false)

    const deallocateStudentMutation = useMutation({
        mutationFn:deallocateStudent,
        onSuccess:(data)=>{
            // console.log(data)
            toast.success('deallocation successful')
            setButtonState(false)
        },
        onError:(message)=>{
            console.log(message)
            toast.error('something went wrong')
            setButtonState(false)

        }
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        setButtonState(true)
        deallocateStudentMutation.mutate({
            studentregNo:student,
            interviewer:currentInterview.interviewer_id,
            token:sessionStorage.getItem('user')
        })
    }

    return (
        <>
            <div className=''>
                <div className='container mx-auto'>
                    <div className='flex flex-col py-10 px-12'>
                        <h3 className=' my-[1%] text-center font-semibold text-[#000000] text-2xl'>Deallocate Student? </h3>
                        <div className=' px-[3%] py-[2%] text-[#000000] font-base text-xl'>
                            Deallocate?
                        </div>
                        <div className='flex items-center justify-center mt-5 text-white'>
                            <button className='px-[2%] py-2 cursor-pointer bg-green focus:outine-none font-medium text-sm rounded-lg text-center w-full mx-2 hover:scale-95 duration-150'                        
                            type='submit' id='cancel' onClick={()=>{}}>
                                Cancel
                            </button>
                            <button className='px-[2%] cursor-pointer bg-red focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                            disabled={buttonState} type='submit' id='submit' onClick={handleSubmit}>
                                Deallocate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDeallocationDialog