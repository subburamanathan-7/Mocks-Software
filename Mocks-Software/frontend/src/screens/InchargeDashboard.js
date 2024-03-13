import { useEffect, useState } from 'react';

import{useQuery, useMutation, useQueryClient} from '@tanstack/react-query'

import DashNavbar from "../components/DashNavbar"
import AModal from "../components/AModal"
import AllocationDialog from '../components/AllocationDialog';
import DeAllocationDialog from '../components/DeAllocationDialog';

import {listInterviews} from "../features/access/AccessServices"
import { getUsers } from '../features/incharge/InchargeServices';
import { useNavigate } from 'react-router-dom';

function InchargeDashboard() {
    let content,interviewerlist, filteredData;
    const [interviewerStatus,SetinterviewerStatus] = useState(sessionStorage.getItem('interviewer'));
    const [interviewerDetails,setInterviewerDetails] = useState(null);
    
    const [showAllocationModal,setShowAllocationModal] = useState(Boolean(false))
    const [showDeAllocationModal,setShowDeAllocationModal] = useState(Boolean(false))
    
    const [currentStudent,setCurrentStudent] = useState(null);
    const [currentInterviewer,setCurrentInterviewer] = useState(null)

    let [count,setCount] = useState(0)
    const queryClient = useQueryClient()
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

    const navigate = useNavigate();

    useEffect(()=>{
        if(!sessionStorage.getItem('role') || sessionStorage.getItem('role')!=='Incharge' ){
          navigate('/vlogin');
        }
    },[]);

    // List Interviews
    const listInterviewsQuery = useQuery({
        queryKey:['interviews',sessionStorage.getItem('interviewer')?sessionStorage.getItem('interviewer').toString():null],
        queryFn:()=>{
            return listInterviews(sessionStorage.getItem('interviewer'),sessionStorage.getItem('user'))
        },
        enabled:!!sessionStorage.getItem('interviewer'),
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
        notifyOnChangeProps: ['data', 'error',currentInterviewer]
    })
    if(listInterviewsQuery.isLoading || listInterviewsQuery.isFetching || listInterviewsQuery.isError){}
    else if(listInterviewsQuery.isFetched || listInterviewsQuery.isFetchedAfterMount){
        content = listInterviewsQuery.data
        // console.log(content)

        filteredData = content.filter(item=>
            item.interviewer===currentInterviewer
        )
        
        filteredData.sort(function(a, b) {
            let keyA = new String(a.status),
                keyB = new String(b.status);
            // Compare the 2 keys
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });
        content = filteredData.map((interview)=>{
            count++;
            return(
                <tr className=''>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{count}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.regNo}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.name}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{deptsMap[interview.student.dept]}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.gd_total===-1?('AB'):(interview.student.gd_total+'/50')}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.aptitude_total===-1?('AB'):(interview.student.aptitude_total+'/50')}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.status==='Completed'?(
                        <i className="text-green  text-xl fa-regular fa-square-check"></i>
                    ):(
                        <button 
                        className='bg-orange text-white p-2 hover:scale-95 duration-150'
                        onClick={()=>{
                            setCurrentStudent(interview.student)
                            setShowDeAllocationModal(true)
                        }}>
                        Deallocate</button>
                    )}
                    </td>
                </tr>
            )
        })
    }

    // //Get User
    // const getUserQuery = useQuery({
    //     queryKey:['user',sessionStorage.getItem('interviewer')],
    //     queryFn:()=>{
    //         return getUser(sessionStorage.getItem('interviewer'),sessionStorage.getItem('user'))
    //     },
    //     enabled:!!sessionStorage.getItem('user'),
    //     refetchOnMount:true,
    //     refetchOnReconnect:true,
    //     refetchOnWindowFocus:false,
    // })
    // if(getUserQuery.isLoading || getUserQuery.isFetching){
    // }
    // else if(getUserQuery.isFetched){
    //     if(interviewerDetails===null){
    //         // console.log(getUserQuery.data.user)
    //         setInterviewerDetails(getUserQuery.data.user)
    //     }
    // }

    const getUsersQuery = useQuery({
        queryKey:['interviewers',sessionStorage.getItem('incharge')],
        queryFn:()=>{
            return getUsers(sessionStorage.getItem('interviewer'),sessionStorage.getItem('user'))
        },
        enabled:!!sessionStorage.getItem('user'),
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,

    })
    
    if(getUsersQuery.isLoading || getUsersQuery.isFetching){}
    else if(getUsersQuery.isFetched){
        if(interviewerDetails===null){
            setInterviewerDetails(getUsersQuery.data)
        }
        
        // console.log(interviewerDetails)
        // interviewerDetails.map((interviewer)=>{
        //     console.log(interviewer)
        // })
        
        interviewerlist =  getUsersQuery.data;
        interviewerlist = interviewerlist.map((interviewer)=>{
            return(
                <option value={interviewer._id}>{interviewer.name}</option>
            )
        })
    }
    const handleChange = async(event)=>{
        const value = event.target.value;
        // console.log(value)
		setCurrentInterviewer(value)
        // flag-0;
    }
    // useEffect(()=>{
    //     if(value!==currentInterviewer && flag===0){
    //         listInterviewsQuery.refetch();
    //         flag=1;
    //     }
    //     else{
    //     }
    // },currentInterviewer)

    return (
        <>
            <DashNavbar/>
            <div>
            { 
                !interviewerStatus?(
                    <>
                        <div className='flex rounded-lg w-[90%] justify-center items-center my-[5%] mx-[5%]'>
                            <div className='p-[2%] rounded-lg shadow-md border border-blue w-full max-w-screen text-center'>
                                <div className='font-semibold text-2xl'>
                                    You are yet to be allocated with an Interviewer.
                                </div>
                            </div>
                        </div>
                    </>
                ):(
                    <div className='mx-[5%]'>
                            { 
                                interviewerDetails!==null?interviewerDetails.map((interviewer)=>{
                                    if(interviewer._id === currentInterviewer?currentInterviewer:''){
                                        return(
                                            <table className=' mt-[3%] mx-6 text-xl'>
                                                <tr>
                                                    <td><div className='font-medium pr-2'>Interviewer you are Incharge for:</div></td>
                                                    <td><div className='font-bold hover:underline hover:cursor-pointer  '>{interviewer.name}</div></td>
                                                </tr>
                                                <tr>
                                                    <td><div className='font-medium pr-2'>Interviewer Company:</div></td>
                                                    <td><div className='font-bold hover:underline hover:cursor-pointer'>{interviewer.companyName}</div></td>
                                                </tr>
                                            </table>
                                        )
                                    }
                                }):''
                            }
                        <hr className='my-[2%]'/>

                        <div className='mx-[2&] flex justify-between'>
                        <button className='bg-blue text-white py-2 px-3 hover:scale-95 duration-150' disabled={!currentInterviewer} onClick={()=>setShowAllocationModal(true)}>Add Student</button>
                        
                        <div className=''>
                            <select name="interviewer" id="interviewer" className= {`py-1 px-6 border border-blue rounded`}
								value={currentInterviewer} onChange={handleChange}
								>
								<option className='' value='' disabled selected hidden >Select Interviewer...</option>
                                {interviewerlist}

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
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '><button className='bg-orange text-white p-2'>Deallocate</button></td>

                                    </tr> */}
                                    {/* <tr className=''>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2127210801088</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>Sp Ramanathan</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>INT</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>49/50</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>49/50</td>
                                        <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '><button className='bg-orange text-white p-2'>Deallocate</button></td>
                                    </tr> */}

                                    {content}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
            </div>

            <AModal isVisible={showAllocationModal} onClose={()=>setShowAllocationModal(false)}>
                <AllocationDialog interviewer = {currentInterviewer}/>
            </AModal>

            <AModal isVisible={showDeAllocationModal} onClose={()=>setShowDeAllocationModal(false)}>
                <DeAllocationDialog interviewer = {currentInterviewer} currentStudent ={currentStudent}/>
            </AModal>
        </>
    )
}

export default InchargeDashboard