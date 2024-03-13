import { useState, useEffect } from 'react';
import{useQuery, useMutation, useQueryClient} from '@tanstack/react-query'
import Modal from './Modal';
import AModal from './AModal';


import DashNavbar from "./DashNavbar";
import AddStudentDialog from './AddStudentDialog';
import { listStudents } from '../features/access/AccessServices';
import {listStudentsByDept} from '../features/admin/AdminServices';
import { useNavigate } from 'react-router-dom';
import AddResumeModal from './AddResumeModal';

function AdminStudents() {
	let content;
	const navigate = useNavigate();

	const[showAddStudentModal, setShowAddStudentModal] =useState(false);
	const [currentStudent,setCurrentStudent] = useState(false);
	const [currentDepartment,setCurrentDepartment] = useState('');
	const [showResumeModal, setShowResumeModal] = useState(false)


	useEffect(()=>{
        if(!sessionStorage.getItem('role') || sessionStorage.getItem('role')!=='Admin' ){
          navigate('/alogin');
        }
    },[]);

	const handleChange = (event) => {
        const value = event.target.value;
			setCurrentDepartment(value)
    };

	const listStudentsQuery= useQuery({ 
		queryKey:['students'],
		queryFn:()=>{
			return listStudents(sessionStorage.getItem('user'))
		},
		enabled:!!sessionStorage.getItem('user'),
		refetchOnMount:true,
		refetchOnReconnect:true,
		refetchOnWindowFocus:false,
	})

	if(listStudentsQuery.isFetching ||listStudentsQuery.isLoading){

	}
	else if(listStudentsQuery.isFetched){
		content = listStudentsQuery.data

		content=content?content.map((student)=>{

			if(student.dept===currentDepartment){
				return(
					<tr key={student._id} className=''>
					
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.regNo}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.name}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.dept}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.aptitude_total===-1?('AB'):(student.aptitude_total+'/50')}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.gd_total===-1?('AB'):(student.gd_total+'/50')}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.interviewCount}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap'>
							<button  onClick={()=>{navigate(`/adashboard/students/student/:${student._id}`)}}
							className=' bg-blue text-white py-1 px-5 hover:bg-opacity-75 duration-250'>View</button>
						</td>
					</tr>
				)
			}
			else if(currentDepartment ==='all'){
				return(
					<tr key={student._id} className=''>
					
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.regNo}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.name}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.dept}</td> 
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.aptitude_total===-1?('AB'):(student.aptitude_total+'/50')}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.gd_total===-1?('AB'):(student.gd_total+'/50')}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{student.interviewCount}</td>
						<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap'>
							<button onClick={()=>{navigate(`/adashboard/students/student/:${student._id}`)}}
							className=' bg-blue text-white py-1 px-5 hover:bg-opacity-75 duration-250'>View</button></td>
					</tr>
				)
			}	
		}):null
	}
	return (
        <>
        	<DashNavbar/>
			<div>
				<div className="mx-[5%]">
					<div className='mx-[2%] flex justify-between'>
						<button className='bg-blue text-white p-2' onClick={()=>{
							setShowAddStudentModal(true)
						}}>Add Student</button>
						 <button className='bg-blue text-white px-4 py-2' onClick={()=>{
                            setShowResumeModal(true)
						}}>Add Resumes</button>
						<div className=''>
							<select name="dept" id="dept" className= {`py-1 px-4 border border-blue rounded`}
								value={currentDepartment} onChange={handleChange}
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
						</div>
					</div>
					<div className='overflow-auto rounded-lg shadow-md  mx-[2%] my-[2%]'>
						
						<table className='cursor-default w-full'>
						<thead className=''>
							<tr key={1} className='py-[5%] border bg-lgray  text-md font-semibold '>

								<th className='p-2 tracking-wide text-center border border-gray'>Registration Number</th>
								<th className='p-2 tracking-wide text-center border border-gray'>Name</th>
								<th className='p-2 tracking-wide text-center border border-gray'>Department</th>
								<th className='p-2 tracking-wide text-center border border-gray'>Aptitude Scores</th>
								<th className='p-2 tracking-wide text-center border border-gray'>GD Scores</th>
								<th className='p-2 tracking-wide text-center border border-gray'>Interviews</th>
								<th className='p-2 tracking-wide text-center border border-gray'>View</th>
							</tr>
						</thead>
						<tbody className='divide-y divide font-medium'>
							{/* <tr className=''> */}
							{/* <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>2127210801096</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Shreya</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>INT</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>49</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>49</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>1</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap text-blue underline '>View</td>

							
							</tr>
							<tr className=''>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>2127210801088</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Sp Ramanathan</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>INT</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>49</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>49</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>1</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap text-blue underline '>View</td>
							</tr> */}
							{content}
						</tbody>
						</table>
					</div>
				</div>
			</div>

			<Modal isVisible={showAddStudentModal} onClose={()=>setShowAddStudentModal(false)}>
				<AddStudentDialog/>
			</Modal>

			<AModal isVisible={showResumeModal} onClose={()=>setShowResumeModal(false)}>
				<AddResumeModal/>
			</AModal>
        </>
  )
}

export default AdminStudents