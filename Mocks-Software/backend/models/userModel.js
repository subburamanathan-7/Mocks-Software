const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please add a name']
        },
        role:{
            type:String,
            enum:['Incharge','Interviewer','Admin'],
            required:[true, 'Please specify the role']
        },
        email:{
            type:String,
            required:[true,'Please add a email']
        },
        password:{
            type:String,
            required:[true,'Please add a password']
        },   
        companyName:{
            type:String,
            required:[
                ()=>{
                    return this.role === 'Interviewer'
                }
            ]
        },
        interviewer:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'user', //Model Name
            
        }],
        incharge:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'user', //Model Name
        },
    }
)

module.exports = mongoose.model('user',userSchema)