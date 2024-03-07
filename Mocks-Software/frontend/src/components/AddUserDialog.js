import { useState } from "react"
import { useMutation } from "@tanstack/react-query";

import {register} from '../features/access/AccessServices';
import toast from "react-hot-toast";
function AddUserDialog() {
    const [formData,setFormData] = useState({
        name:'', 
        companyName:'',
        role:'',
        email:'',
        password:'',
        interviewer:'',
        incharge:''
    });

    const [buttonState, setButtonState] = useState(false)

    const addUserMutation = useMutation({
        mutationFn:register,
        onSuccess:(data)=>{
            console.log(data)
            toast.success('user created successfully')
            setButtonState(false)
        },
        onError:(message)=>{
            console.log(message)
            toast.error('something went wrong')
            setButtonState(false)

        }
    })
    const handleChange =(e)=>{
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setButtonState(true)
        addUserMutation.mutate({
            token:sessionStorage.getItem('user'),
           formData:formData
        })
    }
    return (
        <>
            <div className=''>
            <div className='container mx-auto'>
                <div className='flex flex-col py-12 px-12'>
                    <h3 className='text-xl mb-4 text-center text-[#00000]'>Add User</h3>
                    <form>
                        <div className='grid grid-cols-2 gap-2 '>
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 ${true?'border-green':'border-red'} rounded `} placeholder='Name'
                            type='text' name='name' value={formData.name} onChange={handleChange} />

                            <select name="role" id="role" className= {`py-1 px-2  ${true?'border border-green':'border border-red'} rounded`}
                            value={formData.role} onChange={handleChange}>
                                <option className='text-color1 ' value='' disabled selected hidden>Select Role...</option>
                                <option value="Interviewer">Interviewer/HR</option>
                                <option value="Incharge">Incharge</option>
                            </select>
                            
                        </div>
                        
                        <div className='grid grid-cols-2 gap-2 mt-2'>
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 ${true?'border-green':'border-red'} rounded `} placeholder='Email'
                            type='email' name='email' value={formData.email} onChange={handleChange} />

                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 ${true?'border-green':'border-red'} rounded `} placeholder='Password'
                            type='text' name='password' value={formData.password} onChange={handleChange} />

                        </div>
                        <div className='grid grid-cols-1 gap-2 mt-2'>
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 ${true?'border-green':'border-red'} rounded `} placeholder='Company'
                            type='text' disabled={formData.role?(formData.role==='Incharge'?true:false):false} name='companyName' value={formData.companyName} onChange={handleChange} />
                        </div>  
                    </form>
                    <div className='flex items-center justify-center mt-5'>
                        <button disabled={!formData.name || !formData.email || !formData.password || !formData.role || buttonState} className='bg-blue text-[#000000]  focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                        type='submit' id ='submit' onClick={handleSubmit}>
                            Save User
                        </button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}


export default AddUserDialog