import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"

import {assign_slot,discharge_slot} from '../features/admin/AdminServices'

function ConnectDialog() {
    const [formData, setFormData] = useState({
        interviewerEmail:'',
        inchargeEmail:''
    })
    const [isChecked, setIsChecked] = useState(false)
    const [buttonState, setButtonState] = useState(false)


    const assignSlotMutation = useMutation({
        mutationFn:assign_slot,
        onSuccess:(data)=>{
            toast.success('slot assigned successfully')
            setButtonState(false)
        },
        onError:(message)=>{
            toast.error(message.response.data.message)
            setButtonState(false)

        }
    })

    const deAssignSlotMutation = useMutation({
        mutationFn:discharge_slot,
        onSuccess:(data)=>{
            toast.success('deallocated succesfully')
            setButtonState(false)

        },
        onError:(message)=>{
            toast.error(message.response.data.message)
            setButtonState(false)
        }
    })

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked)
    }
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setFormData((prev)=>({...prev,[name]:value}));
    }

    const handleSubmit =  (e)=>{
        e.preventDefault()
        setButtonState(true)
        // console.log(formData)
        if(isChecked===false){
            assignSlotMutation.mutate({
                token:sessionStorage.getItem('user'),
                formData:formData
            })
        }
        else{
            deAssignSlotMutation.mutate({
                token:sessionStorage.getItem('user'),
                formData:formData
            })

        }
    }
    return (
        <>
            <div className="">
                <div className="contianer mx-auto">
                    <div className='flex flex-col py-10 px-12'>
                        <h3 className=' font-base text-xl'>Assign/Discharge Slot</h3>
                        <hr className='my-[2%]'/>
                        <div className='flex justify-center my-[2%]'>
                            <div className=' w-[70%] relative rounded-md overflow-hidden '>
                                <div className=' px-[3%] py-[0.5%] my-2 flex items-center justify-center bg-opacity-75 rounded-md'>
                                       
                                    <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md  p-1 rounded-full bg-color2 bg-opacity-5'>
                                        <input
                                        type='checkbox'
                                        className='sr-only'
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        />
                                        <span
                                        className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                                            !isChecked ? ' rounded-md bg-blue text-white bg-opacity-60' : 'bg-[#]'
                                        }`}>
                                         {/* False- BY Name */}
                                        
                                            Allocate
                                        </span>
                                        <span
                                            className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                                                isChecked ? 'rounded-md bg-blue text-white bg-opacity-60' : 'bg-[#]'
                                            }`}>
                                        {/* // True- BY Number */}
                                        
                                            Deallocate
                                        </span>
                                    </label>
                                </div>
                                <div className=' px-[3%] py-[0.5%] my-2 flex items-center justify-center bg-opacity-75 rounded-md border-2 border'>
                                    <input type='text' placeholder='Enter Interviewer Email' className='placeholder-[#000000] w-full px-2 rounded-full appearance-none focus:outline-none border-none '
                                    onChange={handleChange} name="interviewerEmail" value={formData.interviewerEmail} />
                                    
                                    {/* <button type="button" className="px-[2%] py-1 my-2 mx-2 rounded-lg cursor-pointer border-2 border-blue  shadow-md"
                                        onClick={()=>{
                                            if(formData.interviewerEmail? !formData.interviewerEmail.includes('@forese.co.in'):false){
                                                setFormData((prev)=>({...prev, interviewerEmail:formData.interviewerEmail+'@forese.co.in'}))
                                            }
                                        }}
                                    >@forese.co.in</button> */}
                                </div>
                                
                                <div className=' px-[3%] py-[0.5%] my-2 flex items-center justify-center bg-opacity-75 rounded-md border-2 border'>
                                    <input type='text' placeholder='Enter Incharge Email' className='placeholder-[#000000] w-full px-2 rounded-full appearance-none focus:outline-none border-none '
                                    onChange={handleChange} name="inchargeEmail" value={formData.inchargeEmail} />
                                    
                                    <button type="button" className="px-[2%] py-1 my-2 mx-2 rounded-lg cursor-pointer border-2 border-blue  shadow-md"
                                        onClick={()=>{
                                            if(formData.inchargeEmail ? !formData.inchargeEmail.includes('@forese.co.in'):false){
                                            
                                                setFormData((prev)=>({...prev, inchargeEmail:formData.inchargeEmail+'@forese.co.in'}))

                                            }
                                        }}
                                    >@forese.co.in</button>
                                   
                                </div>
                                <div className='flex items-center justify-center mt-5 text-white'>
                                    <button className='px-[2%] py-2 cursor-pointer bg-red focus:outine-none font-medium text-sm rounded-lg text-center w-full mx-2 hover:scale-95 duration-150'
                                    type='submit' id='cancel' onClick={()=>{}}>
                                        Cancel
                                    </button>
                                    <button className=' px-[2%] py-2 cursor-pointer bg-green focus:outine-none font-medium text-sm rounded-lg  text-center w-full mx-2 hover:scale-95 duration-150'
                                    disabled={buttonState} type='submit' id = 'submit' onClick={handleSubmit}>
                                      {isChecked?'Discharge':'Assign'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConnectDialog