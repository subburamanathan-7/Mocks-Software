import axios from "axios";
const API_URL  = "http://localhost:5000/api/interviewer/"

export const gradeInterview = async(gradeData)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${gradeData.token}`,
        },
    }
    const response = await axios.post(API_URL+'grade_interview/'+gradeData.interview,gradeData,config);
    // console.log(response.data)
    return response.data
}

export const getInterview = async(id,token)=>{
    // console.log({id,token})
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL+'interview/'+id,config)
    // console.log(response.data)
    return response.data 
}

export const updateInterviewScores = async(formData)=>{
    // console.log(formData)
    const config = {
        headers:{
            Authorization:`Bearer ${formData.token}`
        }
    }
    const response =  await axios.post(API_URL+'interview/'+formData.id,formData.data,config)
    // console.log(response.data)
    return response.data
}
