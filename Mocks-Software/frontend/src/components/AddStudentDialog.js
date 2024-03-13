import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

import {addStudent} from '../features/student/StudentServices';

function AddStudentDialog() {
    const [formData,setFormData] = useState({
        regNo:'',
        name:'',
        department:'',
        section:'',
        email:'',

        subject:'',
        communication:'',
        body_language:'',
        active:'',
        listening:'',

        core:'',
        coding:'',
        quants:'',
        verbal:'',
    })

    const [buttonState, setButtonState] = useState(false);

    const addStudentMutation = useMutation({
        mutationFn:addStudent,
        onSuccess:(data)=>{
            toast.success('student added succesfully')
            setButtonState(false)
            // console.log(data)
        },
        onError:(message)=>{
            toast.error(message.response.data.message)
            setButtonState(false)
            // console.log(message)
        }
    }) 

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setButtonState(true)
        addStudentMutation.mutate({
            token:sessionStorage.getItem('user'),
            studentData:formData
        })  
    }

    return (
        <>
         <div className=''>
            <div className='container mx-auto'>
                <div className='flex flex-col py-12 px-10 text-blue'>
                    <h3 className='text-xl font-bold mb-4 text-center '>Add Student</h3>
                    <form>
                        <div className='grid grid-cols-4 gap-2 mt-2 font-semibold'>
                           <div>Registration Number</div>
                           <div>Name</div>
                           <div>Department</div>
                           <div>Section</div>

                        </div>
                        <div className='grid grid-cols-4 gap-2 mt-2 '>
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-2 ${true?'border-green':'border-red'} rounded`} placeholder='Enter Register Number'
                            type='text' name='regNo' value={formData.regNo} onChange={handleChange} />
                        
                            <input className={`placeholder-[#000000] rounded-md border py-1 px-4 ${true?'border-green':'border-red'} rounded `} placeholder='Enter Name'
                            type='text' name='name' value={formData.name} onChange={handleChange} />

                            <select name="department" id="department" className= {`py-1 px-4 ${true?'border border-green':'border border-red'} rounded`}
                            value={formData.department} onChange={handleChange}
                            >
                                <option className='text-color1 ' value='' disabled selected hidden>Select Department...</option>
                                <option value="ADS">AI & DS</option>
                                <option value="AUT">Automobile Engineering</option>
                                <option value="BIO">Biotechnology</option>
                                <option value="CHM">Chemical Engineering</option>
                                <option value="CIV">Civil Engineering</option>
                                <option value="CSE">Computer Science Engineering</option>
                                <option value="ECE">Electronics & Communication Engineering</option>
                                <option value="EEE">Electricial and Electronic Engineering</option>
                                <option value="INT">Information Technology</option>
                                <option value="MEC">Mechanical Engineering</option>
                                <option value="MAR">Marine Engineering</option>

                            </select>

                            <select name="section" id="section" className='border py-1 px-2 border-[#A9A9A9] rounded'
                            value={formData.section} onChange={handleChange}
                            >
                                <option className='text-color1' value='' disabled selected hidden>Section...</option>
                                <option value="notknown">Not Known</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>

                        </div>

                        <div className='font-semibold my-2'>Email</div>
                        <div className='my-2'>
                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='Email'
                            type='email' name='email' value={formData.email} onChange={handleChange}/>
                        </div>

                        <div className='font-semibold my-6 text-lg text-center underline decoration-3'>Aptitude Scores</div>
                        <div className='grid grid-cols-4 gap-2 mt-2 font-semibold'>
                           <div>Core(20)</div>
                           <div>Coding(10)</div>
                           <div>Verbal(10)</div>
                           <div>Quants(10)</div>

                        </div>
                        <div className='grid grid-cols-4 gap-2 mt-2'>
                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='core'
                            type='number' name='core' value={formData.core} onChange={handleChange} min={0} max={20}/>

                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='coding'
                            type='number' name='coding' value={formData.coding} onChange={handleChange} min={0} max={10}/>

                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='verbal'
                            type='number' name='verbal' value={formData.verbal} onChange={handleChange} min={0} max={10}/>
            
                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='quants'
                            type='number' name='quants' value={formData.quants} onChange={handleChange} min={0} max={10}/>

                        </div>
                        <div className='font-semibold my-6 text-lg underline decoration-3 text-center'>GD Scores</div>
                        <div className='grid grid-cols-5 gap-2 mt-2 font-bold'>
                           <div>Subject(10)</div>
                           <div>Commnunication(10)</div>
                           <div>Body Language(10)</div>
                           <div>Active(10)</div>
                           <div>Listening(10)</div>
                        </div>
                        <div className='grid grid-cols-5 gap-2 mt-2'>
                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='subject knowledge'
                            type='number' name='subject' value={formData.subject} onChange={handleChange} min={0} max={10}/>

                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='communication'
                            type='number' name='communication' value={formData.communication} onChange={handleChange} min={0} max={10}/>

                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='body language'
                            type='number' name='body_language' value={formData.body_language} onChange={handleChange} min={0} max={10}/>
            
                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='active participation'
                            type='number' name='active' value={formData.active} onChange={handleChange} min={0} max={10}/>
                            
                            <input className='placeholder-[#000000] rounded-md border py-1 px-2 border-[#A9A9A9] w-full rounded' placeholder='listening skills'
                            type='number' name='listening' value={formData.listening} onChange={handleChange} min={0} max={10}/>
                        </div>
                        
                    </form>
                    <div className='flex items-center justify-center mt-10'>
                        <button className='bg-blue  text-white  focus:outine-none font-medium text-sm rounded-lg px-5 py-2.5 text-center w-full mx-2 hover:scale-95 duration-150'
                        disabled = {buttonState || !formData.name || !formData.regNo || !formData.email || !formData.department ||
                            !formData.section || !formData.core || !formData.quants || !formData.verbal ||
                            !formData.coding || !formData.active || !formData.body_language || !formData.communication ||
                            !formData.listening || !formData.subject} 
                        type='submit' id ='submit' onClick={handleSubmit}>
                            Add Student
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default AddStudentDialog