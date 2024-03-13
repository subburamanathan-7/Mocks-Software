import { useEffect, useState } from 'react'
import jsPDF from 'jspdf'

function ReportGenerator({interviewDetails,interviewer,onClose}) {
    const forese = require('../assets/forese.png')
    const [count,setCount] = useState(0)

    console.log(interviewDetails)
    console.log(interviewer)

    const generatePDF = ()=>{
        let doc = new jsPDF('l','pt','a4')
       
        doc.html(document.querySelector("#content"),{
            callback:function(pdf){
                pdf.save(`report-${interviewDetails.student.name}-${interviewer.name}.pdf`)
            }
        })
    }

    useEffect(()=>{
        if(count===0){
            generatePDF();
            onClose();
            setCount(1);
        }
    },count,setCount)

    return (
        <>{
            count<0?(
                    <div className='text-lg font-semibold p-4'>Download Initiating....</div> 
            ):(
                <div id='content' className='mx-2 my-[2%] '>
                <nav  className='flex justify-between items-center w-[92%] py-2'>
                    <div>
                        <img className='w-16'
                        alt='forese-logo'
                        src={forese} />
                    </div>
                    <div className='pl-[9%]'>
                        <h2 className='font-bold uppercase'> Online Mocks Report '24</h2>
                    </div>
                    <div className='text-white'>
                    <h2> Online </h2>

                    </div>
               </nav>
               <div className='mx-2'>
                    <div className='text-center py-2 grid grid-cols-1 border'>
                        <div className='font-bold px-2'>PERSONAL <span className='pl-2 text-white '>Hi</span>REPORT</div>
                    </div>
                </div>
                <div className='mx-2'>
                    <div className='text-center py-2 grid grid-cols-4 border'>
                        <div className='font-bold'>Candidate Name :</div>
                        <div className='font-semibold border-r-2'>{interviewDetails.student.name}</div>
                        <div className='font-bold border-l-2'>Date : </div>
                        <div className='font-semibold'>{`17 / 03 / 2024`}</div>
                    </div>
                </div>
               

                <div className='mx-2'>
                    <div className='text-center py-2 grid grid-cols-4 border'>
                        <div className='font-bold'>Register Number : </div>
                        <div className='font-semibold border-r-2'>{interviewDetails.student.regNo}</div>
                        <div className='font-bold border-l-2'>Department & Section :</div>
                        <div className='font-semibold '>{`${interviewDetails.student.dept} - ${interviewDetails.student.section}`}</div>
                    </div>
                </div>
                <div className='mx-2'>
                    <div className=' text-center py-2 grid grid-cols-4 border'>
                        <div className='font-bold'>Interviewer's Name :</div>
                        <div className='font-semibold border-r-2'>{interviewer.name}</div>
                        <div className='font-bold border-l-2'>Interviewer's Company :</div>
                        <div className='font-semibold'>{interviewer.companyName}</div>
                    </div>
                </div>

                <div className='mx-2 my-[2%]'>
                        <table className='cursor-default shadow-md border w-[80%]'>
                            {/* <caption className="text-xl font-bold underline">Interview Scores</caption> */}
                            <thead className=''>
                                <tr className='p-2 text-lg font-semibold  '>
                                    <th className='p-3 tracking-wide text-left border'>Professional Appearance</th>
                                    <th className='p-3 tracking-wide text-left border'>Managerial Competence</th>
                                    <th className='p-3 tracking-wide text-left border'>General Intelligence</th>
                                    <th className='p-3 tracking-wide text-left border'>Technical Knowledge</th>
                                    <th className='p-3 tracking-wide text-left border'>Communication Skills</th>
                                    <th className='p-3 tracking-wide text-left border'>Self-Confidence </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='p-2 text-lg font-semibold  '>
                                    <td className='p-3 text-md tracking-wide text-center border whitespace-nowrap '>{interviewDetails.scores.appearence}/5</td>
                                    <td className='p-3 text-md tracking-wide text-center border whitespace-nowrap '>{interviewDetails.scores.aptitude}/5</td>
                                    <td className='p-3 text-md tracking-wide text-center border whitespace-nowrap '>{interviewDetails.scores.awarness}/5</td>
                                    <td className='p-3 text-md tracking-wide text-center border whitespace-nowrap '>{interviewDetails.scores.technical}/5</td>
                                    <td className='p-3 text-md tracking-wide text-center border whitespace-nowrap '>{interviewDetails.scores.communication}/5</td>
                                    <td className='p-3 text-md tracking-wide text-center border whitespace-nowrap '>{interviewDetails.scores.confidence}/5</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mx-2'>
                    <div className='px-[2%] text-center py-[2%] grid grid-cols-2 border'>
                        <div className='font-bold text-left px-2'>Comments : </div>
                        <div className=' text-left font-semibold '>{interviewDetails.comments}</div>
                    </div>
                </div>
            </div> 
            )
        }
           
        </>
    )
}

export default ReportGenerator