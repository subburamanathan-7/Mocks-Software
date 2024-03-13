const asyncHandler = require('express-async-handler');
 
const Interview = require('../models/interviewModel');
const Student = require('../models/studentModel');
const User = require('../models/userModel');
const Config = require('../models/configModel')

// @desc allocateStudent
// @route POST api/incharge/allocate_student
// @access Private {Incharge}

const allocateStudent = asyncHandler(async(req,res)=>{
    const configData = await Config.findOne({id:'1'}); 

    if(!configData){
        res.status(400)
        throw new Error('config does not exists')
    }

    const dbCount = configData.interviewCount;
    console.log(dbCount)
    let {studentregNo,interviewer,interviewerEmail} = req.body;
    let currentIncharge, interviewerDets;

    // console.log({studentregNo,interviewer,interviewerEmail})
    if(req.user.role==='Incharge'){
        currentIncharge = req.user._id;
    }
    else{
        interviewerDets = await User.findOne({email:interviewerEmail})
        console.log(interviewerDets)
        if(!interviewerDets && req.user.role==='Admin' ){
            res.status(404)
            throw new Error('invalid email')
        }
        if(interviewerDets.role !=='Interviewer'){
            res.status(404)
            throw new Error('invalid interviewer')
        }
        interviewer = interviewerDets._id
        currentIncharge = interviewerDets.incharge
    }

    const currentStudent =  await Student.findOne({regNo:studentregNo})
     
    if(!currentStudent || !interviewer){
        res.status(401)
        throw new Error('invalid student details')
    }
    // console.log({interviewer,currentIncharge,currentStudent})
    const interviewExists = await Interview.findOne({$and:[{student:currentStudent._id},{interviewer:interviewer}]})
    if(interviewExists){
        if(interviewExists.status==='Cancelled' && currentStudent.interviewCount<dbCount ){

            const value = {$set:{status:'Pending'}}
            const value1 = {$inc:{interviewCount:currentStudent.interviewCount+1}}

            await Interview.updateOne({_id:interviewExists._id},value)
            await Student.updateOne({_id:currentStudent._id},value1)

            const updatedInterview = await Interview.findOne({_id:interviewExists._id})
            const updatedStudent = await Student.findOne({_id:currentStudent._id})

            if(updatedInterview && updatedStudent){
                // console.log(updatedStudent)
                res.status(200).json({
                    status:updatedInterview.status,
                    interviewer:updatedInterview.interviewer,
                    interviewName:updatedInterview.student,
                    incharge:updatedInterview.incharge,
                    interviewCount:updatedStudent.interviewCount
                })
            }
            else{
                res.status(400)
                throw new Error('allocation failed')
            }
        }
        else{
            res.status(402)
            throw new Error('allocations exists')
        }
    }
    else{
        // console.log(currentStudent.interviewCount+1)
        if(currentStudent.interviewCount<dbCount){

            const value = {$set:{interviewCount:currentStudent.interviewCount+1}}
            await Student.updateOne({_id:currentStudent._id},value)

            const updatedStudent = await Student.findOne({_id:currentStudent._id})

            // console.log(updatedStudent)
            const newInterview  = await Interview.create({
                interviewer:interviewer,
                student:currentStudent._id,
                incharge:currentIncharge,
            })
    
            if(newInterview && updatedStudent){
                res.status(201).json({
                    interviewer:newInterview.interviewer,
                    student:newInterview.student,
                    incharge:newInterview.incharge,
                    status:newInterview.status,
                    interviewCount:updatedStudent.interviewCount    
                })
            }
            else{
                res.status(400)
                throw new Error('allocation failed')
            }
        }
        else{
            res.status(405)
            throw new Error('maximum interviews allocated')
        }
    }
})

// @desc deallocateStudent
// @route POST api/incharge/deallocate_student
// @access Private {Incharge}

const deallocateStudent = asyncHandler(async(req,res)=>{
    const {studentregNo, interviewer} = req.body;
    const currentIncharge = req.user;

    // console.log(studentregNo,interviewer)
    const currentStudent =  await Student.findOne({regNo:studentregNo})

    if(!currentStudent|| interviewer===null){
        res.status(401)
        throw new Error('invalid student details')
    }
    const interviewExists = await Interview.findOne({$and:[{student:currentStudent._id},{interviewer:interviewer}]})
    // console.log(interviewExists)

    if(!interviewExists){
        res.status(401)
        throw new Error('invalid interview')
    }
    
    if(interviewExists.status==='Completed' || interviewExists.status==='Cancelled' ){
        res.status(403)
        throw new Error('deallocation not possible')
    }
    
    if(currentStudent.interviewCount>0){
        const value = {$set:{status:'Cancelled'}}
        const value1 = {$set:{interviewCount:currentStudent.interviewCount-1}}

        await Interview.updateOne({_id:interviewExists._id},value)
        await Student.updateOne({_id:currentStudent._id},value1)
        
        const updatedInterview = await Interview.findById(interviewExists._id)
        const updatedStudent = await Student.findOne({_id:currentStudent._id})

        if(updatedInterview && updatedStudent){
            res.status(200).json({
                status:updatedInterview.status,
                interviewer:updatedInterview.interviewer,
                interviewName:updatedInterview.student,
                incharge:updatedInterview.incharge,
                interviewCount:updatedStudent.interviewCount
            })
        }
        else{
            res.status(400)
            throw new Error('deallocation failed')
        }
    }
    else{
        res.status(400)
        throw new Error('try again later')
    }
})

const getUsers = asyncHandler(async(req,res)=>{

    const data = req.params.data;
    const myArr = data.split(',')
    // console.log(myArr)
    if(!data){
        res.status(402)
        throw new Error('invalid input')
    }
    const users = await User.find({_id:{$in:myArr}},{
        name:1,
        role:1,
        email:1,
        companyName:1,
    })
    if(!users){
        res.status(404)
        throw new Error('users not found')
    }   
    res.status(200).json(users)
})

module.exports = {
    allocateStudent,
    deallocateStudent,
    getUsers
}