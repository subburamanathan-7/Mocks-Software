import { useState, useEffect } from "react";

import DashNavbar from "./DashNavbar";
import { useQuery } from "@tanstack/react-query";
import { listUsers } from "../features/admin/AdminServices";

import AModal  from './AModal';
import AddUserDialog from "./AddUserDialog";
import ConnectDialog from "./ConnectDialog";
import { useNavigate } from "react-router-dom";


function AdminUsers() {
    let content;
    const [currentUser, setCurrentUser] = useState(''); 
    const [showAddUserDialog, setShowAddUserDialog] = useState(Boolean(false));
    const [showConnectDialog, setShowConnectDialog] = useState(Boolean(false));

    const navigate = useNavigate()
    
    const handleChange=(e)=>{
        const value = e.target.value;
        setCurrentUser(value);
    };
    useEffect(()=>{
        if(!sessionStorage.getItem('role') || sessionStorage.getItem('role')!=='Admin' ){
          navigate('/alogin');
        }
    },[]);

    const listUsersQuery = useQuery({
        queryKey:['users'],
        queryFn:()=>{
            return listUsers(sessionStorage.getItem('user'))
        },
        enabled:!!sessionStorage.getItem('user'),
        refetchOnMount:true,
		refetchOnReconnect:true,
		refetchOnWindowFocus:false,
    });

    if(listUsersQuery.isLoading || listUsersQuery.isFetching){}

    else if(listUsersQuery.isFetched){
        content = listUsersQuery.data;
        // console.log(content)

        content = content.map((user)=>{
            if(user.role===currentUser){
                if(user.role==='Incharge'){
                
                    return(
                        <tr key={user._id} className=''>
                            <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{user.name?user.name:''}</td>
                            <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{user.email?user.email:''}</td>
                            <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{user.interviewer?user.interviewer.map((hr)=>hr.name+','):''}</td>
                            <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{user.interviewer?user.interviewer.map((hr)=>hr.companyName+','):''}</td>
                        </tr>
                    )

                }
                if(user.role==='Interviewer'){
                    return(
                        <tr key={user._id} className=''>
                        
                            <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{user.name?user.name:''}</td>
                            <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{user.companyName?user.companyName:''}</td>
                            <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>{user.incharge?user.incharge.name:''}</td>
                            <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>
                                <button onClick={()=>{navigate(`/adashboard/users/user/:${user._id}`)}}
                                className="bg-blue text-white  px-6 py-2 hover:scale-95 duration-150">View</button>
                            </td>
                        </tr>
                    )

                }
                
            }
        })
    }

    return (
        <>
        	<DashNavbar/>
			<div>
				<div className="mx-[5%]">
					<div className='mx-[2%] flex justify-between'>
						<button className='bg-blue text-white px-4 py-2' onClick={()=>{
                            setShowAddUserDialog(true)
						}}>Add User</button>

                        <button className='bg-blue text-white px-4 py-2' onClick={()=>{
                            setShowConnectDialog(true)
						}}>Connect Interviewer/Incharge</button>
						<div className=''>
							<select name="dept" id="dept" className= {`py-1 px-4 border border-blue rounded`}
								value={currentUser} onChange={handleChange}
								>
								<option className='' value='' disabled selected hidden>Select User...</option>
								<option value="Interviewer">Interviewer/HR</option>
								<option value="Incharge">Incharge</option>

							</select>
						</div>
					</div>
                    {
                        currentUser==='Incharge'?(
                            <div className='overflow-auto rounded-lg shadow-md  mx-[2%] my-[2%]'>
                                <table className='cursor-default w-full'>
                                <thead className=''>
                                    <tr key={1} className='py-[5%] border bg-lgray  text-md font-semibold '>

                                        <th className='p-2 tracking-wide text-center border border-gray'>Name</th>
                                        <th className='p-2 tracking-wide text-center border border-gray'>Email</th>
                                        <th className='p-2 tracking-wide text-center border border-gray'>Interviewer</th>
                                        <th className='p-2 tracking-wide text-center border border-gray'>Interviewer's Company</th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide font-medium'>
                                     {/* <tr>  
                                        <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Shreya</td>
                                        <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>shreya@forese.co.in</td>
                                        <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Eashwar</td>
                                        <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>SVCE</td>
                                    </tr>
                                    <tr>  
                                        <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Sp Ramanathan</td>
                                        <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>ram@forese.co.in</td>
                                        <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Eashwar</td>
                                        <td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>SVCE</td>
                                    </tr> */}
                                    {content}
                                </tbody>
                                </table>
					        </div>

                        ):(
                            <div className='overflow-auto rounded-lg shadow-md  mx-[2%] my-[2%]'>
						
						<table className='cursor-default w-full'>
						<thead className=''>
							<tr key={1} className='py-[5%] border bg-lgray  text-md font-semibold '>

								<th className='p-2 tracking-wide text-center border border-gray'>Name</th>
								<th className='p-2 tracking-wide text-center border border-gray'>Company</th>
								<th className='p-2 tracking-wide text-center border border-gray'>Incharge</th>
								<th className='p-2 tracking-wide text-center border border-gray'>View</th>
							</tr>
						</thead>
						<tbody className='divide-y divide font-medium'>
							{/* <tr className=''>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Shreya</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>SVCE</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Ram</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap  underline '>View</td>

							
							</tr>
							<tr className=''>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Eashwar</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>SVCE</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap '>Sp Ramanathan</td>
							<td className='p-2 text-sm tracking-wide text-center border border-gray whitespace-nowrap  underline '>View</td>
							</tr> */}
							{content}
						</tbody>
						</table>
					</div>
                        )
                    }
					
				</div>
			</div>
            <AModal isVisible={showAddUserDialog} onClose={()=>setShowAddUserDialog(false)}> 
                    <AddUserDialog/>
            </AModal>

            <AModal isVisible={showConnectDialog} onClose={()=>setShowConnectDialog(false)}> 
                    <ConnectDialog/>
            </AModal>
			
        </>
    )
}

export default AdminUsers