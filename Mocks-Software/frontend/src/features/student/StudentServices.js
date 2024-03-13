import axios from "axios";
const API_URL  = "http://localhost:5000/api/student/"

export const addStudent = async(studenData)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${studenData.token}`,
        },
    }
    const response = await axios.post(API_URL+'add',studenData,config)
    // console.log(response.data)
    return response.data
}
