const mongoose = require('mongoose');

const interviewSchema = mongoose.Schema({
    interviewer:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user', //Model Name
        required: [true,'please add the interviewer']
    },
    incharge:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user', //Model Name
        required: [true,'please add the incharge']
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'student', //Model Name
        required: [true,'please add the student']
    },
   
    scores:{
        appearence:{
            type:Number
        },
        aptitude:{
            type:Number
        },
        awarness:{
            type:Number
        },
        technical:{
            type:Number
        },
        communication:{
            type:Number
        },
        confidence:{
            type:Number
        }
    },
    comments: {
        type: String,
        // required: [true,'please add comments']
    },
    status:{
        type:String,
        enum:['Pending','Completed','Cancelled'],
        default: 'Pending',
        required: [true,'please add the status']
    }
},
{ timestamps: true }
)

module.exports = mongoose.model('interview',interviewSchema)
