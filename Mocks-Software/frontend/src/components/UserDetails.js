import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../features/access/AccessServices';
import { useState, useEffect } from 'react';
import DashNavbar from './DashNavbar';
import toast from 'react-hot-toast';

import { listInterviews } from '../features/access/AccessServices';
import AModal from './AModal';
import AdminStudentAllocation from './AdminStudentAllocation';
import AdminStudentDeallocation from './AdminStudentDeallocation';
import ReportGenerator from './ReportGenerator';

function UserDetails() {
    let content;
    const navigate = useNavigate()

    useEffect(()=>{
        if(!sessionStorage.getItem('role') || sessionStorage.getItem('role')!=='Admin' ){
          navigate('/alogin');
        }
    },[]);

    const [showAllocationModal, setShowAllocationModal] =useState(false);
    const [showDeAllocationModal,setShowDeallocationModal] = useState(false);
    const [showDownloadModal, setShowDownloadModal] = useState(false)


    const [interviewerDetails, setInterviewerDetails]= useState(null);
    const [downloadDets,setDownloadDets] = useState(null)
    const [studentregNo, setStudentregNo] = useState('')
    let [count,setCount] = useState(0);

    const params = useParams()
    let parameter = params.id;
    parameter = parameter.substring(1,parameter.length);

    const getUserQuery = useQuery({
        queryKey:['user',parameter],
        queryFn:()=>{
            return getUser(parameter,sessionStorage.getItem('user'))
        },
        enabled:!!parameter,
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
    });

    if(getUserQuery.isLoading || getUserQuery.isFetching){}
    else if(getUserQuery.isFetched){
        if(interviewerDetails===null){
            // console.log(getUserQuery.data.user)
            setInterviewerDetails(getUserQuery.data.user)
        }
    }

    const listInterviewsByInterviewerQuery = useQuery({
        queryKey:['interviews',parameter],
        queryFn:()=>{
            return listInterviews(parameter,sessionStorage.getItem('user'))
        },
        enabled:!!parameter,
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
    })
    if(listInterviewsByInterviewerQuery.isLoading || listInterviewsByInterviewerQuery.isFetching){}
    else if(listInterviewsByInterviewerQuery.isFetched){
        content = listInterviewsByInterviewerQuery.data;
        // console.log(content)
        content = content.map((interview)=>{
            count++;
            return(
                <tr className=''>
                    <td className='p-2 py-4 text-sm tracking-wide text-center whitespace-nowrap '>{count}</td>
                    <td className='p-2 py-4 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.regNo}</td>
                    <td className='p-2 py-4 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.name}</td>
                    <td className='p-2 py-4 text-sm tracking-wide text-center whitespace-nowrap '>{interview.student.dept}</td>
                    <td className='p-2 py-4 text-sm tracking-wide text-center whitespace-nowrap '>{interview.status==='Pending'?(
                        <button className='bg-black text-white  px-6 py-2 hover:scale-95 duration-150' 
                        onClick={()=>{
                            setStudentregNo(interview.student.regNo)
                            setShowDeallocationModal(true)

                        }} > Deallocate</button>
                    ):(<> Cannot Deallocate</>)}</td>

                    <td className='p-2 py-4 text-sm tracking-wide text-center whitespace-nowrap '>{interview.status === 'Completed'?(
                        <i className=" cursor-pointer text-md fa-solid fa-download hover:text-blue"
                        onClick={()=>{
                            setDownloadDets(interview)
                            setShowDownloadModal(true)
                        }}></i>
                    ):('Pending')} </td>
                </tr> 
            )
        })
    }

    return (
        <>
            <DashNavbar/>
            <div className=''> 
                <div className='mx-[5%]'>
                    {/* <table className='cursor-default w-full text-lg font-bold'>
                        <caption className="text-xl font-bold underline my-[2%]">Interviewer Details</caption>

                        <tr className=''>
                            <th><div className='p-2 tracking-wide text-left '>Name :</div></th>
                            <td><div className='font-bold hover:cursor-pointer'>{interviewerDetails?interviewerDetails.name:null}</div></td>
                        </tr>
                        <tr>
                            <th><div className='p-2 tracking-wide text-left '>Company Name:</div></th>
                            <td><div className='font-bold hover:cursor-pointer'>{interviewerDetails?interviewerDetails.companyName:null}</div></td>
                        </tr>
                    </table> */}
                    <table className=' mt-[3%] mx-6 text-xl'>
                        {/* <caption className="text-xl font-bold underline my-[2%]">Interviewer Details</caption> */}

                        <tr>
                            <td><div className='font-medium pr-2'>Name :</div></td>
                            <td><div className=' px-2 font-bold hover:underline hover:cursor-pointer'>{interviewerDetails?interviewerDetails.name:null}</div></td>
                        </tr>
                        <tr>
                            <td><div className='font-medium pr-2'>Company Name:</div></td>
                            <td><div className='px-2 font-bold hover:underline hover:cursor-pointer'>{interviewerDetails?interviewerDetails.companyName:null}</div></td>
                        </tr>
                    </table>
                </div>

                <div className='mx-[5%]'>
                    <div className='my-[4%] flex justify-between'>
                    <button className='bg-blue text-white p-2' onClick={()=>{
                            setShowAllocationModal(true)
                            
                        }}>Add Student</button>
                        {/* <div className=''>
                            <select name="dept" id="dept" className= {`py-1 px-4 border border-blue rounded`}
                                value={''} onChange={()=>{}}
                                >
                                <option className='' value='' disabled selected hidden>Search Interview...</option>
                                <option value="all">Every Department</option>
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
                        </div> */}
                    </div>
                    <div className='overflow-auto rounded-lg shadow-md my-[2%]'>
                        <table className='cursor-default w-full'>
                            <thead className=''>
                                <tr className='py-[5%] text-lg font-semibold '>
                                    <th className='p-2 tracking-wide text-center'>SNO</th>
                                    <th className='p-2 tracking-wide text-center'>Register Number</th>
                                    <th className='p-2 tracking-wide text-center'>Student Name</th>
                                    <th className='p-2 tracking-wide text-center'>Dept</th>
                                    <th className='p-2 tracking-wide text-center'>Action</th>
                                    <th className='p-2 tracking-wide text-center'>Report</th>

                                </tr>
                            </thead>
                            <tbody className='divide-y divide font-medium'>
                                {/* <tr className=''>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>1</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2127210801088</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>Ram</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>INT</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '><button 
                                    className='bg-black text-white py-2 px-4' onClick={()=>{}}>View</button></td>

                                </tr> */}
                                {/* <tr className=''>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2127210801096</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>Shreya</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>INT</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '><button 
                                    className='bg-black text-white py-2 px-4' onClick={()=>{}}>View </button></td>
                                </tr> */}
                                {content}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AModal isVisible={showAllocationModal} onClose={()=>setShowAllocationModal(false)}>
                <AdminStudentAllocation interviewerDetails = {interviewerDetails} />
            </AModal>

            <AModal isVisible={showDeAllocationModal} onClose={()=>setShowDeallocationModal(false)} >
                <AdminStudentDeallocation currentInterview = {interviewerDetails} student={studentregNo}/>
            </AModal>

            <AModal isVisible={showDownloadModal} onClose={()=>setShowDownloadModal(false)} >
                <ReportGenerator interviewDetails={downloadDets} interviewer = {interviewerDetails} onClose={()=>setShowDownloadModal(false)} />
            </AModal>
        </>

    )
}

export default UserDetails