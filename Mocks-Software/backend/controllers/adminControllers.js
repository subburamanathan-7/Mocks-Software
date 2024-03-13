const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Student = require('../models/studentModel');
const Interview = require('../models/interviewModel');

// @desc assignSlot
// @route POST api/admin/assign_slot
// @access Private {Admin}

const assignSlot = asyncHandler(async(req,res)=>{

    const {formData} = req.body;
    console.log(formData)

    if(!formData.inchargeEmail || !formData.interviewerEmail){
        res.status(401)
        throw new Error('enter all neccesary details')
    }

    const currentInterviewer = await User.findOne({email:formData.interviewerEmail});
    const currentIncharge = await User.findOne({email:formData.inchargeEmail});

    // console.log(Array.isArray(currentIncharge.interviewer) )
    // console.log(currentIncharge.interviewer.length===0)
    if(currentIncharge && currentInterviewer && currentIncharge.role==='Incharge' 
    && currentInterviewer.role ==='Interviewer'){
        if(currentIncharge.interviewer? currentIncharge.interviewer.length===0:false || currentIncharge.interviewer===null){
            let newInterviewers = new Array();
            newInterviewers.push(currentInterviewer._id)
    
            const value1 = {$set:{interviewer:newInterviewers}}
            await User.updateOne({_id:currentIncharge._id},value1)
        }
        else{
            let newInterviewers = new Array();
            currentIncharge.interviewer.map((hr)=>{
                newInterviewers.push(hr)
            })
            console.log(currentIncharge.interviewer)
    
            currentIncharge.interviewer.map((hr)=>{
                let newHr = new String(hr);
                
                if(newHr.toString() === currentInterviewer._id.toString()){
                    res.status(403)
                    throw new Error('allocation already exists')
                }
            })
            newInterviewers.push(currentInterviewer._id)

    
            const value1 = {$set:{interviewer:newInterviewers}}
            await User.updateOne({_id:currentIncharge._id},value1)
        }
    
        const value2 = {$set:{incharge:currentIncharge._id}}
        await User.updateOne({_id:currentInterviewer._id},value2)
    
        const updatedIncharge = await User.findById(currentIncharge._id)
        const updatedInterviewer = await User.findById(currentInterviewer._id)
    
        if(updatedIncharge && updatedInterviewer){
            res.status(200).json({
                inchargeName:updatedIncharge.name,
                interviewer:updatedIncharge.interviewer,
    
                interviewName:updatedInterviewer.name,
                incharge:updatedInterviewer.incharge
            })
        }
        else{
            res.status(400)
            throw new Error('assigning slot failed')
        }
    }
    else{
        res.status(404)
        throw new Error('users not found')
    }
   
})

// @desc assignSlot
// @route POST api/admin/discharge_slot
// @access Private {Admin}

const dischargeSlot =  asyncHandler(async(req,res)=>{
    const {formData} = req.body;
    console.log(formData)

    if(!formData.inchargeEmail || !formData.interviewerEmail){
        res.status(401)
        throw new Error('enter all neccesary details')
    }

    const currentInterviewer = await User.findOne({email:formData.interviewerEmail});
    const currentIncharge = await User.findOne({email:formData.inchargeEmail});

    if(currentIncharge && currentInterviewer && currentIncharge.role==='Incharge' 
    && currentInterviewer.role ==='Interviewer'){

        let existingInterviewers = new Array();
        if(currentIncharge.interviewer!==null){
            currentIncharge.interviewer.map((hr)=>{
                let newHr = new String(hr);
                
                if(newHr.toString() !== currentInterviewer._id.toString()){
                    existingInterviewers.push(hr)
                }
            })
        const value1 = {$set:{interviewer:existingInterviewers}}
        await User.updateOne({_id:currentIncharge._id},value1)

        const value2 = {$set:{incharge:null}}
        await User.updateOne({_id:currentInterviewer._id},value2)

        const updatedIncharge = await User.findById(currentIncharge._id)
        const updatedInterviewer = await User.findById(currentInterviewer._id)

        if(updatedIncharge && updatedInterviewer){
            res.status(200).json({
                inchargeName:updatedIncharge.name,
                interviewer:updatedIncharge.interviewer,

                interviewName:updatedInterviewer.name,
                incharge:updatedInterviewer.incharge
            })
        }
        else{
            res.status(400)
            throw new Error('discharging slot failed')
        }

        }
        else{
            res.status(400)
            throw new Error('discharging not possible')
        }
    }
    else{
        res.status(404)
        throw new Error('users not found')
    }


    
    

    // if(currentIncharge && currentInterviewer){


    //     const value1 = {$set:{interviewer:null}}
    //     await User.updateOne({_id:currentIncharge._id},value1)

        

    //     const updatedIncharge = await User.findById(currentIncharge._id)
    //     const updatedInterviewer = await User.findById(currentInterviewer._id)

    //     if(updatedIncharge && updatedInterviewer){
    //         res.status(200).json({
    //             inchargeName:updatedIncharge.name,
    //             interviewer:updatedIncharge.interviewer,

    //             interviewName:updatedInterviewer.name,
    //             incharge:updatedInterviewer.incharge
    //         })
    //     }
    //     else{
    //         res.status(400)
    //         throw new Error('discharging slot failed')
    //     }
    // }
    // else{
    //     res.status(401)
    //     throw new Error('invalid users')
    // }

})

const listStudentsByDept = asyncHandler(async(req,res)=>{
    const {dept} = req.body;
    let students = await Student.find({dept:dept},{
        regNo:1,
        name:1,
        dept:1,
        aptitude_total:1,
        gd_total:1,
        interviewCount:1,
        resumeFile:1
    });

    if(!students){
        res.status(400)
        throw new Error('students yet to be added in this dept');
    }
    res.status(200).json(students)
})

// @desc listInterviewsByStudent
// @route GET api/admin/list_interviews_by_student/:id
// @access Private {Admin}

const listInterviewsByStudent = asyncHandler(async(req,res)=>{
    const interviews  = await Interview.find({$and:[{student:req.params.id},{status:{$ne:'Cancelled'}}]},{
        interviewer:1,
        student:1,
        incharge:1,
        status:1,
        scores:1,
        comments:1
    }).sort({updatedAt:-1}).populate({path:'interviewer', select:['name', 'companyName', 'incharge', '_id']})

    if(!interviews){
        res.status(400)
        throw new Error('interviews yet to be assigned');
    }
    res.status(200).json(interviews)
})

const listUsers = asyncHandler(async(req,res)=>{
    const users = await  User.find({role:{$ne:'Admin'}},{
        name:1,
        role:1,
        email:1,
        companyName:1,
        interviewer:1,
        incharge:1
    }).populate({path:'interviewer', select:['name', 'companyName']}).populate({path:'incharge',select:['name', 'companyName']});
    
    if(!users){
        res.status(400)
        throw new Error('users yet to be assigned');
    }
    res.status(200).json(users)
})

module.exports={
    assignSlot,
    dischargeSlot,
    listStudentsByDept,
    listInterviewsByStudent,
    listUsers
}