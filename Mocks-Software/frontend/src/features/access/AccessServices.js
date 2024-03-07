import axios from 'axios';
const API_URL = 'http://localhost:5000/api/user/' 

export const register = async(data)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
    }
    const response = await axios.post(API_URL+'register',data,config)
    console.log(response.data)

    return response.data
}


export const login = async(formData)=>{
    const response = await axios.post(API_URL+'login',formData)
        .catch(function(error){
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data.message);
                throw new Error(error.response.data.message) 
                // console.log(error.response.status);
                // console.log(error.response.headers);
            }  
            else if (error.request) {
                // console.log(error.request);
            } 
            else {
                // console.log('Error', error.message);
            }
            // console.log(error.config);
        })
        if(response.data){
            sessionStorage.setItem('user',JSON.stringify(response.data.token))
            return response.data
        }
    // console.log(response.data)
}

export const getUser = async(userId,token)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+'get_user/'+userId,config)
    // console.log(response)
    return response.data
}

export const getStudent = async(studentId,token)=>{
    // console.log(studentId)
    // studentId = studentId.substring(1,substring.length)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+'student/'+studentId,config);
    // console.log(response.data)
    return response.data
}


export const listInterviews = async(id,token)=>{
    console.log(id)
    
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL+'list_interviews/'+id,config)
    // console.log(response.data)
    return response.data
}

export const listStudents = async(token)=>{
    const config = {
        headers:{
            Authorization:`Bearer ${token}`
        },
    }
    const response = await axios.get(API_URL+'list_students',config)
    // console.log(response.data)
    return response.data
}

export const uploadFiles = async(file)=>{
    console.log(file)

    const response = await axios.post(API_URL+'upload_files')
    console.log(response.data)
    return response.data

}