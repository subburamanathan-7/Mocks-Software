const asyncHandler = require('express-async-handler');

const Interview = require('../models/interviewModel');
const User = require('../models/userModel');
const Student = require('../models/studentModel');

// @desc gradeInterview
// @route POST api/interviewer/grade_interview/:id
// @access Private {Interviewer}
const gradeInterview = asyncHandler(async(req,res)=>{
    // console.log(req.params.id)
    const {gradeData} = req.body;
    
    const interview = await Interview.findById(req.params.id);

    if(!interview){
        res.status(400)
        throw new Error('invalid interview') 
    }

    const value = {$set:{scores:{
        appearence:gradeData.question1,
        aptitude:gradeData.question2,
        awarness:gradeData.question3,
        technical:gradeData.question4,
        communication:gradeData.question5,
        confidence:gradeData.question6
    }, comments:gradeData.comments, status:'Completed'}};
    await Interview.updateOne({_id:req.params.id},value)

    const gradedInterview = await Interview.findById(req.params.id);
    if(gradedInterview){
        res.status(200).json({
            interviewer:gradedInterview.interviewer,
            student:gradedInterview.student,
            incharge:gradedInterview.incharge,
            scores:gradedInterview.scores,
            comments:gradedInterview.comments,
            status:gradedInterview.status
        })
    }
    else{
        res.status(400)
        throw new Error('grading interview failed');
    }
})

// @desc getInterview
// @route GET api/interviewer/interview/:id
// @access Private {Interviewer}
const getInterview = asyncHandler(async(req,res)=>{
    // console.log(req.params.id)

    const interview  = await Interview.find({interviewer: req.user._id,student:req.params.id});
    if(!interview){
        res.status(404)
        throw new Error('interview not found')
    }
    // console.log(interview)
    res.status(200).json(interview)
})

// @desc updateInterview
// @route POST api/interviewer/interview/:id
// @access Private {Interviewer}
const updateInterviewScores = asyncHandler(async(req,res)=>{
    const interview = await Interview.findById(req.params.id);

    if(!interview){
        res.status(402)
        throw new Error('interview does not exist')
    }

    const updatedInterview = await Interview.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(201).json({updatedInterview})
})

module.exports = {
    gradeInterview,
    getInterview,
    updateInterviewScores
}