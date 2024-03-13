import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import DashNavbar from './DashNavbar';
import Modal from './Modal';
import AModal from './AModal';

import ViewGradeDialog from './ViewGradeDialog';

import { getStudent } from '../features/access/AccessServices';
import {listInterviewsByStudent} from '../features/admin/AdminServices'
import AdminDeallocationDialog from './AdminDeallocationDialog';
import AdminInterviewAllocation from './AdminInterviewAllocation';

function StudentDetails() {
    let content;
    
    const navigate = useNavigate();

    let [count, setCount] = useState(0);
    

    const [studentDetails,setStudentDetails] = useState(null);
    const [interviewDetails,setInterviewDetails] = useState(null);

    const [showGradeModal,setShowGradeModal] = useState(Boolean(false));
    const [showAllocationModal, setShowAllocateModal] = useState(Boolean(false));
    const [showDeallocateModal,setShowDeallocateModal] = useState(Boolean(false));

	useEffect(()=>{
        if(!sessionStorage.getItem('role') || sessionStorage.getItem('role')!=='Admin' ){
          navigate('/alogin');
        }
    },[]);

    const params = useParams()
    let parameter = params.id;
    parameter = parameter.substring(1,parameter.length);

    const getStudentQuery  = useQuery({
        queryKey:['student',parameter],
        queryFn: ()=>{
            return(getStudent(parameter, sessionStorage.getItem('user')))
        },
        enabled:!!parameter,
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
    })
    if(getStudentQuery.isLoading || getStudentQuery.isFetching){}
    else if(getStudentQuery.isFetched){
        if(studentDetails===null){
            // console.log(getStudentQuery.data)
            setStudentDetails(getStudentQuery.data)
        }
    }

    const listInterviewsByStudentQuery = useQuery({
        queryKey:['interviews',parameter],
        queryFn:()=>{
            return listInterviewsByStudent(parameter,sessionStorage.getItem('user'))
        },
        enabled:!!parameter, 
        refetchOnMount:true,
        refetchOnReconnect:true,
        refetchOnWindowFocus:false,
    })

    if(listInterviewsByStudentQuery.isLoading || listInterviewsByStudentQuery.isFetching){}
    
    else if(listInterviewsByStudentQuery.isFetched){
        content = listInterviewsByStudentQuery.data;
        // console.log(content)
        content = content.map((interview)=>{
            count++;
            return(
                <tr>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{count}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.interviewer.name}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.interviewer.companyName}</td>
                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>{interview.status==='Completed'?(
                        <button className='bg-black text-white  px-6 py-2 hover:scale-95 duration-150' onClick={()=>{
                            setShowGradeModal(true)
                            setInterviewDetails({
                                name:studentDetails?studentDetails.name:null,
                                regNo:studentDetails?studentDetails.regNo:null,
                                dept:studentDetails?studentDetails.dept:null,
                                comments:interview.comments,
                                _id:interview._id,
                                scores:{
                                    appearence:interview.scores.appearence,
                                    aptitude:interview.scores.aptitude,
                                    awarness:interview.scores.awarness,
                                    technical:interview.scores.technical,
                                    communication:interview.scores.communication,
                                    confidence:interview.scores.confidence,
                                }
                            })
                        }}>View</button>
                    ):(
                        
                        <button className='bg-black text-white px-4 py-2 hover:scale-95 duration-150' onClick={()=>{
                            setInterviewDetails({
                                _id:interview._id,
                                interviewer_id:interview.interviewer._id
                            })
                            setShowDeallocateModal(true);
                        }}>Deallocate</button>
                    )}
                    </td>
                    {/* <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '> <i class="fa-solid fa-download"></i></td> */}
                </tr>
            )
        })
    }
  
    return (
        <>
            <DashNavbar/>

            <div className=''>
                <div className='mx-[5%] flex flex-row justify-between'>
                    <table className='cursor-default w-full text-lg font-bold'>
                        <caption className="text-xl font-bold underline my-[2%]">Student Details</caption>

                        <tr className=''>
                            <th><div className='p-2 tracking-wide text-left '>Register Number:</div></th>
                            <td><div className='font-bold hover:cursor-pointer'>{studentDetails?studentDetails.regNo:null}</div></td>
                        </tr>
                        <tr>
                            <th><div className='p-2 tracking-wide text-left '>Name:</div></th>
                            <td><div className='font-bold hover:cursor-pointer'>{studentDetails?studentDetails.name:null}</div></td>
                        </tr>
                        <tr>
                            <th><div className='p-2 tracking-wide text-left '>Department:</div></th>
                            <td><div className='font-bold hover:cursor-pointer'>{studentDetails?studentDetails.dept:null}</div></td>
                        </tr>
                        <tr>
                            <th><div className='p-2 tracking-wide text-left '>Section:</div></th>
                            <td><div className='font-bold hover:cursor-pointer'>{studentDetails?studentDetails.section:null}</div></td>
                        </tr>
                    </table>
                    
                    <table className='cursor-default w-full border'>
                            <caption className="text-xl font-bold underline my-[2%]">Aptitude Scores</caption>
                            <thead className=" shadow-mg bg-gray text-white">
                                    <th className='p-2 tracking-wide border-black text-center text-center '>PARAMETER</th>
                                    <th className='p-2 text-sm tracking-wide text-center border-black whitespace-nowrap '>SCORE</th>
                            </thead>
                            <tbody className=''>
                                <tr className='py-[5%] text-lg font-bold border '>
                                    <th className='p-2 tracking-wide text-center border'>CORE</th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.aptitude_scores.core:null}</td>
                                </tr>
                                <tr className='py-[5%] text-lg font-bold border '>
                                    <th className='p-2 tracking-wide text-center border'>CODING </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.aptitude_scores.coding:null}</td>
                                </tr>
                                <tr className='py-[5%] text-lg font-bold border '>
                                    <th className='p-2 tracking-wide text-center border'>VERBAL </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.aptitude_scores.verbal:null}</td>
                                </tr>
                                <tr className='py-[5%] text-lg font-bold border '>
                                    <th className='p-2 tracking-wide text-center border'>QUANTS </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.aptitude_scores.quants:null}</td>
                                </tr>
                                <tr className='py-[5%] text-lg font-bold border '>
                                    <th className='p-2 tracking-wide text-center border'>TOTAL </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.aptitude_total:null}/50</td>
                                </tr>
                            </tbody>
                    </table>

                    <table className='cursor-default w-full border'>
                        <caption className="text-xl font-bold underline my-[2%]">GD Scores</caption>
                        <thead className=" shadow-mg bg-gray text-white">
                                <th className='p-2 tracking-wide border-black text-center text-center '>PARAMETER</th>
                                <th className='p-2 text-sm tracking-wide text-center border-black whitespace-nowrap '>SCORE</th>
                
                        </thead>
                        <tbody className='divide-y divide font-semibold'>
                            <tr className=''>
                                <th className='p-2 tracking-wide text-center border'>SUBJECT KNOWLEDGE</th>
                                <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.gd_scores.subject:null}</td>
                            </tr>
                            <tr>
                                <th className='p-2 tracking-wide text-center border'>COMMUNICATION SKILLS</th>
                                <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.gd_scores.communication:null}</td>
                            </tr>
                            <tr>
                                <th className='p-2 tracking-wide text-center border'>BODY LANGUAGE</th>
                                <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.gd_scores.body_language:null}</td>
                            </tr>
                            <tr>
                                <th className='p-2 tracking-wide text-center border'>ACTIVE PARTICIPATION</th>
                                <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.gd_scores.active:null}</td>
                            </tr>
                            <tr>
                                <th className='p-2 tracking-wide text-center border'>LISTENING SKILLS</th>
                                <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.gd_scores.listening:null}</td>
                            </tr>
                            <tr className='py-[5%] text-lg font-bold border '>
                                    <th className='p-2 tracking-wide text-center border'>TOTAL </th>
                                    <td className='p-2 text-sm tracking-wide text-center border whitespace-nowrap '>{studentDetails?studentDetails.gd_total:null}/50</td>
                                </tr>
                        </tbody>
                    </table>
                </div>

                <div className='mx-[5%]'>
                    <div className='my-[4%] flex justify-between'>
                        
                        <button className='bg-blue text-white p-2' onClick={()=>{
                            setShowAllocateModal(true)
                            
                        }}>Add Interviewer</button>
                        {/* <div className=''>
                            <select name="dept" id="dept" className= {`py-1 px-4 border border-blue rounded`}
                                value={''} onChange={()=>{}}
                                >
                                <option className='' value='' disabled selected hidden>Select Department...</option>
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
                                    <th className='p-2 tracking-wide text-center'>Interviewer Name</th>
                                    <th className='p-2 tracking-wide text-center'>Interviewer Company</th>
                                    <th className='p-2 tracking-wide text-center'>Action</th>
                                    {/* <th className='p-2 tracking-wide text-center'>Report</th> */}

                                </tr>
                            </thead>
                            <tbody className='divide-y divide font-medium'>
                                {/* <tr className=''>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>1</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>Ram</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>SVCE</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '><button 
                                    className='bg-black text-white p-2' onClick={()=>{}}>View / Deallocate </button></td>

                                </tr>
                                <tr className=''>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>2</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>Shreya</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '>SVCE</td>
                                    <td className='p-2 text-sm tracking-wide text-center whitespace-nowrap '><button 
                                    className='bg-black text-white p-2' onClick={()=>{}}>View / Deallocate </button></td>

                                </tr> */}
                                {content}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal isVisible={showGradeModal}  onClose = {()=>setShowGradeModal(false)}>
                <ViewGradeDialog currentInterview={interviewDetails}/>
            </Modal>
            
            <AModal isVisible={showAllocationModal} onClose={()=>setShowAllocateModal(false)}>
                <AdminInterviewAllocation  student ={studentDetails?studentDetails.regNo:''} />
            </AModal>

            <AModal isVisible={showDeallocateModal} onClose={()=>setShowDeallocateModal(false)}>
                <AdminDeallocationDialog currentInterview={interviewDetails}  student ={studentDetails?studentDetails.regNo:''}/>
            </AModal>


        </>
    )
}

export default StudentDetails

