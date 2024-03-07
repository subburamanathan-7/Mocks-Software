import axios from 'axios';
const API_URL = "http://localhost:5000/api/admin/";
 

export const listStudentsByDept = async(data)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${data.token}`
        }
    }

    const response = await axios.post(API_URL+'list_students_by_dept',data,config)
    // console.log(response.data)
    return response.data
}

export const listInterviewsByStudent = async(studentId, token)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+'list_interviews_by_student/'+studentId,config)
    // console.log(response.data)

    return response.data
}

export const listUsers = async(token)=>{
    // console.log(token)
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+'list_users',config)
    // console.log(response.data)

    return response.data
}

export const assign_slot = async(data)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${data.token}`
        }
    }
    const response = await axios.post(API_URL+'assign_slot',data,config)
    console.log(response.data)
    return response.data

}
export const discharge_slot = async(data)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${data.token}`
        }
    }
    const response = await axios.post(API_URL+'discharge_slot',data,config)
    console.log(response.data)
    return response.data

}
