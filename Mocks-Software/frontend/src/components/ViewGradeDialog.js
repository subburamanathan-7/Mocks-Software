import { useEffect, useState } from "react"
import toast from 'react-hot-toast';

import {useMutation, useQuery} from '@tanstack/react-query';
import { getInterview, gradeInterview } from "../features/interviewer/InterviewerServices";

function ViewGradeDialog(currentInterview) {
    const [gradeData,setGradeData] = useState({
        question1:0,
        question2:0,
        question3:0,
        question4:0,
        question5:0,
        question6:0,
        comments:''
    })
    const [studentDetails, setStudentDetails] = useState(currentInterview.currentInterview);
    useEffect(()=>{
        setGradeData({
            question1:currentInterview.currentInterview.scores.appearence,
            question2:currentInterview.currentInterview.scores.aptitude,
            question3:currentInterview.currentInterview.scores.awarness,
            question4:currentInterview.currentInterview.scores.technical,
            question5:currentInterview.currentInterview.scores.communication,
            question6:currentInterview.currentInterview.scores.confidence,
            comments:currentInterview.currentInterview.comments
        })
    },gradeData)
    return (
       <>
            <div className="">
                <div className="container mx-auto">
                    <div className='flex flex-col py-10 px-12'>
                        
                        <table className='w-[40%] text-xl'>
                            <tr>
                                <td><div className='text-left font-medium '>Register Number :</div></td>
                                <td><div className='text-left  font-bold  hover:cursor-pointer  '>{studentDetails.regNo}</div></td>
                            </tr>
                            <tr>
                                <td><div className=' text-left font-medium'>Student Name :</div></td>
                                <td><div className=' text-left font-bold  hover:cursor-pointer  '>{studentDetails.name}</div></td>
                            </tr>
                            <tr>
                                <td><div className=' text-left font-medium'>Student Department :</div></td>
                                <td><div className=' text-left font-bold  hover:cursor-pointer  '>{studentDetails.dept}</div></td>
                            </tr>
                        </table>
                        <hr className='my-[2%]'/>
                        
                        <div className=" text-xl font-bold underline my-[3%]">Interview Scores</div>
                        <div className="flex flex-row justify-between flex-wrap">
                            <div className='px-[3%] pb-[2%] grow text-xl font-semibold '>
                                <div>Professional Appearance</div>
                                <div className='px-[3%] py-[2%]'>
                                    {
                                        [...Array(5)].map((star, index) => {
                                            index += 1
                                            return (
                                                <button type='button' 
                                                key={index}
                                                className={index <= (gradeData.question1) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                ></button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='px-[3%] pb-[2%]  grow text-xl font-semibold'>
                                Managerial Aptitude
                                <div className='px-[3%] py-[2%]'>
                                    {
                                        [...Array(5)].map((star, index) => {
                                            index += 1
                                            
                                        
                                            return (
                                            <button type='button' 
                                            key={index}
                                            className={index <= ( gradeData.question2) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                            ></button>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className='px-[3%] pb-[2%]  grow text-xl font-semibold'>
                                General Intelligence 
                                <div className='px-[3%] py-[2%]'>
                                    {
                                        [...Array(5)].map((star, index) => {
                                            index += 1
                                            
                                        
                                            return (
                                                <button type='button' 
                                                key={index}
                                                className={index <= (gradeData.question3) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                ></button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='px-[3%] pb-[2%]  grow text-xl font-semibold'>
                                Techical Knowledge  
                                <div className='px-[3%] py-[2%]'>
                                    {
                                        [...Array(5)].map((star, index) => {
                                            index += 1
                                            
                                        
                                            return (
                                                <button type='button' 
                                                key={index}
                                                className={index <= (gradeData.question4) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                ></button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='px-[3%] pb-[2%]  grow text-xl font-semibold'>
                                Communication Skills   
                                <div className='px-[3%] py-[2%]'>
                                    {
                                        [...Array(5)].map((star, index) => {
                                            index += 1
                                            
                                        
                                            return (
                                                <button type='button' 
                                                key={index}
                                                className={index <= (gradeData.question5) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                ></button>
                                            )
                                        })
                                    }
                                </div>
                            </div>

                            <div className='px-[3%] pb-[2%]  grow text-xl font-semibold'>
                                Self-Confidence    
                                <div className='px-[2%] py-[2%]'>
                                    {
                                        [...Array(5)].map((star, index) => {
                                            index += 1
                                            
                                        
                                            return (
                                                <button type='button' 
                                                key={index}
                                                className={index <= (gradeData.question6) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                >
                                                </button>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <form className="flex flex-col">
                            <label>Comments</label>
                            <input disabled={true} className="px-2 -py-4 w-[75%] h-20 border" 
                            name='comments' value={gradeData.comments} 
                            placeholder="Comments for the student(Strengths, Weakness, Areas of Improvement)" type="textbox" />
                        </form>
                    </div>
                </div>
            </div>
       </>
    )
}

export default ViewGradeDialog