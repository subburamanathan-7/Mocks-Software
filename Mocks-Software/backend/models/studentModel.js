const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        uppercase: true,
        required:[true, 'Please add a name']
    },
    regNo:{
        type:String,
        required:[true, 'Please add a register number']
    },
    email: {
        type: String,
        required:[true, 'Please add a email']
    },
    dept:{
        type:String,
        enum:['ADS','AUT','BIO','CSE','CIV','CHM','EEE','ECE','INT','MEC','MAR'],
        required:[true, 'Please add a department']
    },
    section: {
        type: String, 
        enum: ['notknown','A', 'B', 'C'],
        required:[true, 'Please add a section']
    },
    gd_scores: {
        subject:{
            type:Number,
        },
        communication:{
            type:Number,
        },
        body_language:{
            type:Number,
        },
        active:{
            type:Number,
        },
        listening:{
            type:Number,
        },
    },
    gd_total:{
        type:Number
    },   
    aptitude_scores: {
        core:{
            type:Number,
        },
        verbal:{
            type:Number,
        },
        quants:{
            type:Number,
        },
        coding:{
            type:Number,
        },
    },
    aptitude_total:{
        type:Number
    }, 
    interviewCount:{
        type:Number,
        default:0,
        required:[true, 'Please add the interview count']
    },
    resumeFile:{
        type:String,
    }
})

module.exports = mongoose.model('student',studentSchema)
