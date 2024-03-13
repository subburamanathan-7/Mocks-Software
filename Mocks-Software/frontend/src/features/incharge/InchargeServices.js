import axios from 'axios';
const API_URL = "http://localhost:5000/api/incharge/"

export const allocateStudent = async(allocateData)=>{
    const config = {
        headers: {
          Authorization: `Bearer ${allocateData.token}`,
        },
    }
    const response = await axios.post(API_URL+'allocate_student',allocateData,config);
    // console.log(response.data)

    return response.data
}

export const deallocateStudent = async(deallocateData)=>{
  // console.log(deallocateData)
  const config = {
      headers: {
        Authorization: `Bearer ${deallocateData.token}`,
      },
  }
  const response = await axios.post(API_URL+'deallocate_student',deallocateData,config);
  // console.log(response.data)
  return response.data
}

export const getUsers = async(data,token)=>{
    // console.log(data)
    // console.log(token)
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
  	const response = await axios.get(API_URL+'get_users/'+data,config)
  	// console.log(response)
  	return response.data
}
