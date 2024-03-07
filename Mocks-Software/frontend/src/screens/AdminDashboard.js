import React, {useEffect} from 'react'
import DashNavbar from '../components/DashNavbar'
import { useNavigate } from "react-router-dom"


function AdminDashboard() {

    const navigate = useNavigate();
    useEffect(()=>{
        if(!sessionStorage.getItem('role') || sessionStorage.getItem('role')!=='Admin' ){
          navigate('/alogin');
        }
    },[]);
    
    return (
        <>
            <DashNavbar/> 
        </>   
    )
} 

export default AdminDashboard