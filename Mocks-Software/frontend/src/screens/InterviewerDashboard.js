import { useState, useEffect } from 'react';

import{useQuery, useQueryClient} from '@tanstack/react-query';

import DashNavbar from "../components/DashNavbar";
import Modal from "../components/Modal";

import {getUser, listInterviews} from "../features/access/AccessServices";
import GradeDialog from '../components/GradeDialog';
import UpdateGradeDialog from '../components/UpdateGradeDialog';
import { useNavigate } from 'react-router-dom';


function InterviewerDashboard() {
    let content;
    let [count,setCount] = useState(0);
    const deptsMap = {
        'AUT':'Automobile Engineering',
        'ADS':'AI & DS',
        'BIO':'Biotechnology',
        'CHE':'Chemical Engineering',
        'CIV':'Civil Engineering',
        'CSE':'Computer Science Engineering',
        'ECE':'Electronics & Communication Engineering',
        'EEE':'Electronics & Electrical Engineering',
        'INT':'Information Technology',
        'MEC':'Mechanical Engineering',
        'MAR':'Marine Engineering',

    }
    const [inchargeDetails, setInchargeDetails]=useState(null);
    const [currentInterview,setCurrentInterview] = useState(null);

    const [showGradeModal,setShowGradeModal]=useState(Boolean(false));
    const [showUpdateGradeModal,setShowUpdateGradeModal]=useState(Boolean(false));

    const [currentStatus,setCurrentStatus] = useState('Pending');
    const queryClient = useQueryClient()
    const navigate = useNavigate();


    useEffect(()=>{
        if(!sessionStorage.getItem('role') || sessionStorage.getItem('role')!=='Interviewer' ){
          navigate('/ilogin');
        }
    },[]);
    

    // List Interviews
    const listInterviewsQuery = useQuery({
        queryKey:['interviews'],
        queryFn:()=>{
            return listInterviews('data',sessionStorage.getItem('user'))
        },

        enabled:!!sessionStorage.getItem('user'),
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
        notifyOnChangeProps: ['data', 'error']
    })

    if(listInterviewsQuery.isLoading || listInterviewsQuery.isFetching){}
    
    else if(listInterviewsQuery.isFetched){
        content = listInterviewsQuery.data;

        content.sort(function(a, b) {
            let keyA = new String(a.status),
                keyB = new String(b.status);
            // Compare the 2 keys
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });
        
        content = content.map((interview)=>{
            if(interview.status===currentStatus){
                count++;
                return(
                    <tr className=''>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{count}</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.regNo}</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.name}</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{deptsMap[interview.student.dept]}</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.aptitude_total}/50</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.gd_total}/50</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.status==='Completed'?(
                           
                           <button 
                           className='bg-black text-white p-2 hover:scale-95 duration-150'
                           onClick={()=>{
                               setCurrentInterview({student:interview.student, interview:interview._id})
                               setShowUpdateGradeModal(true)
                           }}>
                           Edit Scores</button>
                        ):(
                            <button 
                            className='bg-black text-white p-2 hover:scale-95 duration-150'
                            onClick={()=>{
                                setCurrentInterview({student:interview.student, interview:interview._id})
                                setShowGradeModal(true)
                            }}>
                            Grade Student</button>
                        )}
                        </td>
                    </tr>
                )
            }
            else if(currentStatus === 'all'){
                count++;
                return(
                    <tr className=''>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{count}</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.regNo}</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.name}</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{deptsMap[interview.student.dept]}</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.aptitude_total}/50</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.gd_total}/50</td>
                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.status==='Completed'?(
                            <button 
                            className='bg-black text-white p-2 hover:scale-95 duration-150'
                            onClick={()=>{
                                setCurrentInterview({student:interview.student, interview:interview._id})
                                setShowUpdateGradeModal(true)
                            }}>
                            Edit Scores</button>
                        ):(
                            <button 
                            className='bg-black text-white p-2 hover:scale-95 duration-150'
                            onClick={()=>{
                                setCurrentInterview({student:interview.student, interview:interview._id})
                                setShowGradeModal(true)
                            }}>
                            Grade Student</button>
                        )}
                        </td>
                    </tr>
                )

            }
        })
    }

    //Get User
    const getUserQuery = useQuery({
        queryKey:['user',sessionStorage.getItem('interviewer')],
        queryFn:()=>{
            return getUser(sessionStorage.getItem('incharge'),sessionStorage.getItem('user'))
        },
        enabled:!!sessionStorage.getItem('user'),
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
    })
    if(getUserQuery.isLoading || getUserQuery.isFetching){}
    else if(getUserQuery.isFetched){
        if(inchargeDetails===null){
            // console.log(getUserQuery.data)
            setInchargeDetails(getUserQuery.data.user)
        }
    }

    const handleChange = (event)=>{
        const value = event.target.value;
		setCurrentStatus(value)
    }
   
    return (
        <>
            <DashNavbar/>
            <div>
                <div className="mx-[5%]">
                    <table className=' mt-[3%] mx-6 text-xl'>
                        <tr>
                            <td><div className='font-medium pr-2'>Your Incharge :</div></td>
                            <td><div className='font-bold hover:underline hover:cursor-pointer  '>{inchargeDetails?inchargeDetails.name:''}</div></td>
                        </tr>
                    </table>
                    <hr className='my-[2%]'/>
                    <div className='mx-[2&] flex justify-end'>
                    <div className=''>
                        <select name="status" id="status" className= {`py-1 px-6 border border-blue rounded`}
								value={currentStatus} onChange={handleChange}
								>
								<option className='' value='' disabled selected hidden >Select Category...</option>
								<option value="all">All Interviews</option>
								<option value="Pending">Pending</option>
								<option value="Completed">Completed</option>
							</select>
						</div>
                    </div>
                    <div className='overflow-auto rounded-lg shadow-md my-[2%]'>
                            <table className='cursor-default w-full'>
                                <thead className=''>
                                    <tr className='py-[5%] text-lg font-semibold '>
                                        <th className='p-2 tracking-wide text-center'>SNO</th>
                                        <th className='p-2 tracking-wide text-center'>Registration Number</th>
                                        <th className='p-2 tracking-wide text-center'>Name</th>
                                        <th className='p-2 tracking-wide text-center'>Department</th>
                                        <th className='p-2 tracking-wide text-center'>Aptitude Score</th>
                                        <th className='p-2 tracking-wide text-center'>GD Score</th>
                                        <th className='p-2 tracking-wide text-center'>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide font-medium'>
                                    {/* <tr className=''>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>1</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2127210801096</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>Shreya</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>INT</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>49/50</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>49/50</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '><button className='bg-black text-white p-2' onClick={()=>{}}>Grade Student</button></td>

                                    </tr> */}
                                    {/* <tr className=''>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2127210801088</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>Sp Ramanathan</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>INT</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>49/50</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>49/50</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '><button className='bg-black text-white p-2' onClick={()=>{}}>Grade Student</button></td>
                                    </tr> */}
                                    {content}
                                </tbody>
                            </table>  
                        </div>
                </div>
            </div>
            <Modal isVisible={showGradeModal} onClose={()=>{setShowGradeModal(false)}}>
                <GradeDialog currentInterview = {currentInterview}/>
            </Modal>
            <Modal isVisible={showUpdateGradeModal} onClose={()=>{setShowUpdateGradeModal(false)}}>
                <UpdateGradeDialog currentInterview = {currentInterview}/>
            </Modal>
        </>
    )
}
export default InterviewerDashboard