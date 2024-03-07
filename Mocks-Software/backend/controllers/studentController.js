const asyncHandler = require('express-async-handler');

const Student = require('../models/studentModel')

// @desc addStudent
// @route POST api/student/add
// @access Private {Admin}
const addStudent = asyncHandler(async(req,res)=>{
    const {studentData} = req.body;

    const studentExists = await Student.findOne({regNo:studentData.regNo});
    if(studentExists){
        res.status(401)
        throw new Error('student already exists')
    }
    let apt_total=0,gd_tot=0;
    apt_total = Number(studentData.core) + Number(studentData.coding) + Number(studentData.verbal) + Number(studentData.quants);
    gd_tot = Number(studentData.subject) + Number(studentData.communication) + Number(studentData.body_language) + Number(studentData.active) + Number(studentData.listening);

    const newStudent = await Student.create({
        name:studentData.name, 
        regNo:studentData.regNo,
        email:studentData.email,
        dept:studentData.department,
        section:studentData.section,
        gd_scores:{
            subject:studentData.subject,
            communication:studentData.communication,
            body_language:studentData.body_language,
            active:studentData.active,
            listening:studentData.listening,
        }, 
        aptitude_scores:{
            core:studentData.core,
            verbal:studentData.verbal,
            quants:studentData.quants,
            coding:studentData.coding,
        },
        gd_total:gd_tot,
        aptitude_total:apt_total
    });

    if(newStudent){
        res.status(200).json({
            name:newStudent.name,
            regNo:newStudent.regNo,
            email:newStudent.email,
            dept:newStudent.dept,
            section:newStudent.section,
            gd_scores:new Array(newStudent.gd_scores),
            aptitude_scores: new Array(newStudent.aptitude_scores),
            gd_total:newStudent.gd_tot,
            aptitude_total:newStudent.apt_total
        })
    }
    else{
        res.status(401)
        throw new Error('student creation failed')
    }
})

module.exports = {
    addStudent,
}