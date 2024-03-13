import { useEffect, useState } from "react"
import toast, { ErrorIcon } from 'react-hot-toast';

import {useMutation, useQuery} from '@tanstack/react-query';
import { getInterview, gradeInterview, updateInterviewScores } from "../features/interviewer/InterviewerServices";

function  GradeDialog(currentInterview) {
    let content;

    const [gradeData,setGradeData] = useState({
        question1:0,
        hover1:0,

        question2:0,
        hover2:0,

        question3:0,
        hover3:0,

        question4:0,
        hover4:0,

        question5:0,
        hover5:0,

        question6:0,
        hover6:0,

        comments:''

    })
    const [studentDetails, setStudentDetails] = useState(currentInterview.currentInterview.student);
    const [buttonState, setButtonState] = useState(false)
    const getScoresQuery = useQuery({
        queryKey:['scores',studentDetails.regNo],
        queryFn:()=>{
            return getInterview(studentDetails._id,sessionStorage.getItem('user'))
        },
        enabled:!!sessionStorage.getItem('user'),
        refetchOnMount:false,
        refetchOnReconnect:false,
        refetchOnWindowFocus:false,
    });

    if(getScoresQuery.isLoading || getScoresQuery.isFetching){}
    else if(getScoresQuery.isFetched){
        // console.log(getScoresQuery.data[0])

        const currentScore={
            question1:getScoresQuery.data[0].scores.appearence,
            hover1:0,
    
            question2:getScoresQuery.data[0].scores.aptitude,
            hover2:0,
    
            question3:getScoresQuery.data[0].scores.awarness,
            hover3:0,
    
            question4:getScoresQuery.data[0].scores.technical,
            hover4:0,
    
            question5:getScoresQuery.data[0].scores.communication,
            hover5:0,
    
            question6:getScoresQuery.data[0].scores.confidence,
            hover6:0,
    
            comments:getScoresQuery.data[0].comments
        }
        // console.log(currentScore)
        if(gradeData.question1===0){
            setGradeData(currentScore)
        }
    }   
    
    const gradeInterviewMutation = useMutation({
        mutationFn:gradeInterview,
        onSuccess:(data)=>{
            // console.log(data)
            toast.success('student scored successfully')
        },
        onError:(error)=>{
            toast.success('something went wrong')
            console.log(error)
        }
    })

    // Update Scores
    const updateScoresMutation = useMutation({
        mutationFn:updateInterviewScores,
        onSuccess: (data) =>{
          // Object.keys(responseData).forEach(v => responseData[v] = 0)
          // queryClient.invalidateQueries(["contacts"])
          // queryClient.invalidateQueries(["teamcontacts"])
          // queryClient.invalidateQueries(["globalContacts"])
        //   console.log(data)
            toast.success('scores updated successfully')
            setButtonState(false)
      },    
        onError:(message)=>{
            toast.error(message.response.data.message)    
            setButtonState(false)
        }
    })
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setGradeData((prevGradeData) => ({ ...prevGradeData, [name]: value }));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!gradeData.question1 || !gradeData.question2 || !gradeData.question3  || !gradeData.question4 
            || !gradeData.question5 || !gradeData.question6  ){
                toast('Kindly assign a score to each parameter.');
        }
        else{
            setButtonState(true)
            updateScoresMutation.mutate({
                token:sessionStorage.getItem('user'),
                id:currentInterview.currentInterview.interview,
                data:{
                    scores:{
                        appearence:gradeData.question1,
                        aptitude:gradeData.question2,
                        awarness:gradeData.question3,
                        communication:gradeData.question4,
                        confidence:gradeData.question5,
                        technical:gradeData.question6
                    },
                    comments:gradeData.comments
                },
            })
        }
    }
    return (
       <>
            <div className="">
                <div className="container mx-auto">
                    <div className='flex flex-col py-10 px-12'>
                        
                        <table className='w-[40%] text-xl'>
                            <tr>
                                <td><div className='text-left font-medium '>Student Name :</div></td>
                                <td><div className='text-left  font-bold  hover:cursor-pointer  '>{studentDetails.name}</div></td>
                            </tr>
                            <tr>
                                <td><div className=' text-left font-medium'>Student Department :</div></td>
                                <td><div className=' text-left font-bold  hover:cursor-pointer  '>{studentDetails.dept}</div></td>
                            </tr>
                        </table>
                        <hr className='my-[2%]'/>
                        <div className="flex justify-around">
                            {
                                !studentDetails.resumeFile?(
                                    <div className=' p-2 bg-blue text-white text-left font-bold  hover:cursor-pointer hover:scale-95  '>{'No Resume Found'}</div>
                                ):(
                                    <div className=' p-2 bg-blue text-white text-left font-bold  hover:cursor-pointer hover:scale-95  '><a target="_blank" href={studentDetails.resumeFile}>{'View Resume'}</a></div>
                                )
                            }
                        </div>

                        <div className="flex justify-between ">
                        <table className='cursor-default w-full border'>
                            <caption className="text-xl font-bold underline my-[2%]">Aptitude Scores</caption>
                            <thead className=" shadow-mg bg-gray text-white">
                                    <th className='p-2 tracking-wide border-black text-center text-center '>PARAMETER</th>
                                    <th className='p-2 text-sm tracking-wide text-center border-black whitespace-nowrap border '>SCORE</th>
                            </thead>
                            <tbody className='divide-y divide font-semibold'>
                                <tr className='border '>
                                    <th className='p-2 tracking-wide text-center border'>CORE</th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.aptitude_scores.core}/20</td>
                                </tr>
                                <tr className='border '>
                                    <th className='p-2 tracking-wide text-center border'>CODING </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.aptitude_scores.coding}/10</td>
                                </tr>
                                <tr className='border '>
                                    <th className='p-2 tracking-wide text-center border'>VERBAL </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.aptitude_scores.verbal}/10</td>
                                </tr>
                                <tr className='border '>
                                    <th className='p-2 tracking-wide text-center border'>QUANTS </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.aptitude_scores.quants}/10</td>
                                </tr>
                                <tr className=' py-[4%] text-lg font-bold border '>
                                    <th className='p-2 tracking-wide text-center border'>TOTAL </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.aptitude_total}/50</td>
                                </tr>
                            </tbody>
                        </table>

                        <table className='cursor-default w-full border'>
                            <caption className="text-xl font-bold underline my-[2%]">GD Scores</caption>
                            <thead className=" shadow-md bg-gray text-white">
                                    <th className='p-2 tracking-wide border-black text-center text-center '>PARAMETER</th>
                                    <th className='p-2 text-sm tracking-wide text-center border-black whitespace-nowrap border '>SCORE</th>
                    
                            </thead>
                            <tbody className='divide-y divide font-semibold'>
                                <tr className=''>
                                    <th className='p-2 tracking-wide text-center border'>SUBJECT KNOWLEDGE</th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.gd_scores.subject}/10</td>
                                </tr>
                                <tr>
                                    <th className='p-2 tracking-wide text-center border'>COMMUNICATION SKILLS</th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.gd_scores.communication}/10</td>
                                </tr>
                                <tr>
                                    <th className='p-2 tracking-wide text-center border'>BODY LANGUAGE</th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.gd_scores.body_language}/10</td>
                                </tr>
                                <tr>
                                    <th className='p-2 tracking-wide text-center border'>ACTIVE PARTICIPATION</th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.gd_scores.active}/10</td>
                                </tr>
                                <tr>
                                    <th className='p-2 tracking-wide text-center border'>LISTENING SKILLS</th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.gd_scores.listening}/10</td>
                                </tr>
                                <tr className='py-[5%] text-lg font-bold border '>
                                    <th className='p-2 tracking-wide text-center border'>TOTAL </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails.gd_total}/50</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>

                        <div className="text-xl font-bold underline my-[3%]">Interview Scores</div>
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
                                                    className={index <= (gradeData.hover1 || gradeData.question1) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                    onClick= {() => {setGradeData((prevGradeData) => ({ ...prevGradeData, question1:index }))} }  
                                                    onMouseEnter={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover1:index}))} }
                                                    onMouseLeave={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover1:gradeData.question1}))} }>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='px-[3%] pb-[2%]  grow text-xl font-semibold'>
                                    Managerial Competence
                                    <div className='px-[3%] py-[2%]'>
                                        {
                                            [...Array(5)].map((star, index) => {
                                                index += 1
                                                
                                            
                                                return (
                                                <button type='button' 
                                                key={index}
                                                className={index <= (gradeData.hover2 || gradeData.question2) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                onClick= {() => {setGradeData((prevGradeData) => ({ ...prevGradeData, question2:index }))} }  
                                                onMouseEnter={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover2:index}))} }
                                                onMouseLeave={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover2:gradeData.question2}))} }>
                                                </button>
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
                                                    className={index <= (gradeData.hover3 || gradeData.question3) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                    onClick= {() => {setGradeData((prevGradeData) => ({ ...prevGradeData, question3:index }))} }  
                                                    onMouseEnter={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover3:index}))} }
                                                    onMouseLeave={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover3:gradeData.question3}))} }>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className='px-[3%] pb-[2%]  grow text-xl font-semibold'>
                                    Technical Knowledge  
                                    <div className='px-[3%] py-[2%]'>
                                        {
                                            [...Array(5)].map((star, index) => {
                                                index += 1
                                                
                                            
                                                return (
                                                    <button type='button' 
                                                    key={index}
                                                    className={index <= (gradeData.hover4 || gradeData.question4) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                    onClick= {() => {setGradeData((prevGradeData) => ({ ...prevGradeData, question4:index }))} }  
                                                    onMouseEnter={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover4:index}))} }
                                                    onMouseLeave={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover4:gradeData.question4}))} }>
                                                    </button>
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
                                                    className={index <= (gradeData.hover5 || gradeData.question5) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                    onClick= {() => {setGradeData((prevGradeData) => ({ ...prevGradeData, question5:index }))} }  
                                                    onMouseEnter={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover5:index}))} }
                                                    onMouseLeave={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover5:gradeData.question5}))} }>
                                                    </button>
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
                                                    className={index <= (gradeData.hover6 || gradeData.question6) ? 'text-3xl text-[#FFDB58] fa-solid fa-star' : 'text-3xl fa-regular fa-star text-[#EADDCA]'}   
                                                    onClick= {() => {setGradeData((prevGradeData) => ({ ...prevGradeData, question6:index }))} }  
                                                    onMouseEnter={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover6:index}))} }
                                                    onMouseLeave={() => {setGradeData((prevGradeData) => ({ ...prevGradeData, hover6:gradeData.question6}))} }>
                                                    </button>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>

                            <label>Comments</label>
                            <textarea className="px-2 -py-4 w-[75%] h-20 border" 
                            name='comments' value={gradeData.comments} onChange={handleChange}
                            placeholder="Comments (Strengths, Weakness, Areas of Improvement)" type="textbox" />
                        <div className=" flex flex-row justify-end mx-[2%] mt-[2%]">
                           
                            <button className="bg-red text-white py-2 px-4 mx-2 hover:scale-95 duration-250"
                            id='cancel' onClick={()=>{}} type='submit'
                            >Cancel </button>
                         
                            <button className="bg-green text-white py-2 px-4 mx-2 hover:scale-95 duration-250"
                            id='submit' onClick={handleSubmit} type='submit'
                            disabled={!gradeData.question1 || !gradeData.question2 || !gradeData.question3 || !gradeData.question4 || !gradeData.question5 || !gradeData.question6 || buttonState} 
                            >Update</button>
                        </div>

                    </div>

                </div>
            </div>
       </>
    )
}
export default GradeDialog