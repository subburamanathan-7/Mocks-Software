const bcrypt  = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const generateToken = require('../config/generateToken')

const Interview = require('../models/interviewModel');
const User = require('../models/userModel');
const Student = require('../models/studentModel');

// @desc registerUser
// @route POST api/user/register
// @access Private {Admin}
const registerUser = asyncHandler(async(req,res)=>{
    const {formData} = req.body;

    if(!formData.name || !formData.email || !formData.password || !formData.role ){
        res.status(400)
        throw new Error('enter all the necessary fields')
    }
    const userExists = await User.findOne({email:formData.email})
    if(userExists){
        res.status(401)
        throw new Error('user already exists, please login')
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password,salt);

    // console.log(formData)
    const newUser = await User.create({
        name:formData.name,
        role:formData.role,
        email:formData.email,
        password:hashedPassword,
        companyName: formData.companyName?formData.companyName:null,
        interviewer: formData.interviewer?formData.interviewer:null,
        incharge: formData.incharge?formData.incharge:null,
    })

    if(newUser){
        res.status(201).json({
            name:newUser.name,
            role:newUser.role,
            email:newUser.email,
            companyName:newUser.companyName?newUser.companyName:null,
            interviewer:newUser.interviewer?newUser.interviewer:new Array(),
            incharge:newUser.incharge?newUser.incharge:null,

            token: generateToken(newUser._id)
        })
    }
    else{
        res.status(400)
        throw new Error('user creation failed')
    }

})

// @desc loginUser
// @route POST api/user/login
// @access Public 
const loginUser = asyncHandler(async(req,res)=>{
    const {email, password, role} = req.body;
     if(!email || !password || !role){
        res.status(401)
        throw new Error('enter all the necessary details')
    }

    const currentUser = await User.findOne({email});
    if(currentUser && (await bcrypt.compare(password, currentUser.password)) && currentUser.role===role){
        res.status(200).json({
            _id:currentUser._id,
            name:currentUser.name,
            role:currentUser.role,
            email:currentUser.email,
            companyName:currentUser.companyName?currentUser.companyName:null,
            interviewer:currentUser.interviewer?currentUser.interviewer:null,
            incharge:currentUser.incharge?currentUser.incharge:null,

            token:generateToken(currentUser._id),
        })
    }
    else{
        res.status(400)
        throw new Error('unsuccessful credentials')
    }
})

// @desc getMe
// @route GET api/user/get_user/:id
// @access Private {Users} 
const getUser = asyncHandler(async(req,res)=>{
    let user = await User.findById(req.params.id,{
        _id:1,
        name:1,
        role:1,
        email:1,
        incharge:1,
        companyName:1
    });
    if(!user){
        res.status(400)
        throw new Error('invalid user')
    }
    res.status(200).json({user})
})

// @desc getStudent
// @route POST api/user/student/:id
// @access Private {Interviewer}
const getStudent = asyncHandler(async(req,res)=>{
    if(req.user.role!=='Incharge'){
        const student  = await Student.findById(req.params.id);
        if(!student){
            res.status(404)
            throw new Error('student not found')
        }
        res.status(200).json(student)
    }
    else{
        throw new Error('incharge not authorized')
    }
})

// @desc listInterviews
// @route GET api/user/list_interviews
// @access Private {Incharge, Interviewer, Admin}
const listInterviews = asyncHandler(async(req,res)=>{

    if(req.user.role==='Incharge'){
        const id = req.params.id;
        const myArr = id.split(',')
        console.log(id)
        console.log(myArr)

        const interviews = await Interview.find({$and:[{interviewer:{$in:myArr}},{status:{$ne:'Cancelled'}}]},{
            interviewer:1,
            student:1,
            incharge:1,
            status:1
        }).sort({status:-1}).populate({path:'student', select:['name', 'regNo', 'dept', 'section', 'gd_total', 
            'aptitude_total','interview_count']})

        if(!interviews){
            res.status(400)
            throw new Error('interviews yet to be assigned');
        }
        res.status(200).json(interviews)
    }
    else if(req.user.role==='Interviewer'){
        const interviews = await Interview.find({$and:[{interviewer:req.user._id},{status:{$ne:'Cancelled'}}]},{
            interviewer:1,
            student:1,
            incharge:1,
            status:1
        }).sort({status:-1}).populate({path:'student', select:['name', 'regNo', 'dept', 'section', 'gd_scores','gd_total', 
            'aptitude_scores','aptitude_total','interview_count','resumeFile']})

        if(!interviews){
            res.status(400)
            throw new Error('interviews yet to be assigned');
        }
       
        res.status(200).json(interviews)
       
    }
    else {
        // console.log(req.params.id)
        const interviews = await Interview.find({$and:[{interviewer:req.params.id},{status:{$ne:'Cancelled'}}]},{
            interviewer:1,
            student:1,
            incharge:1,
            status:1,
            scores:1,
            comments:1
        }).sort({status:1}).populate({path:'student', select:['name', 'regNo', 'dept', 'section', 'gd_scores','gd_total', 
            'aptitude_scores','aptitude_total','resumeFile']})

        if(!interviews){
            res.status(400)
            throw new Error('interviews yet to be assigned');
        }
        // let interviewList;
        // interviews.map(async(interview)=>{
        //     interviewList = new Array();
        //     let getstudent = await Student.find({regNo:interview.student});
        //     // console.log(getstudent[0])
        //     let interviewItem = {...interview._doc, studentdets:{
        //         name:getstudent[0].name,
        //         dept:getstudent[0].dept,
        //         section:getstudent[0].section,
        //         gd_scores:getstudent[0].gd_scores,
        //         aptitude_scores:getstudent[0].aptitude_scores,

        //     }}
        //     // let newItem = new Object(interviewItem);
        //     interviewList.push(interview)
        // })
        res.status(200).json(interviews)
       
    }
})

// @desc listStudents
// @route GET api/user/list_students
// @access Private {Incharge, Interviewer}
const listStudents = asyncHandler(async(req,res)=>{
    if(req.user.role==='Incharge'){
        let students = await Student.find({},{
            regNo:1,
            name:1,
            dept:1,
            aptitude_total:1,
            gd_total:1,
            interviewCount:1
        });

        if(!students){
            res.status(400)
            throw new Error('students yet to be added');
        }
        res.status(200).json(students)
    }
    else if(req.user.role==='Interviewer' || req.user.role==='Admin'){
        let students = await Student.find({},{
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
            throw new Error('students yet to be added');
        }
        res.status(200).json(students)
    }
})

const uploadFiles = asyncHandler(async(req,res)=>{
    console.log(req)
    // console.log(req.file)
    res.send("HI")
})

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getStudent,
    listInterviews,
    listStudents,
    uploadFiles
}