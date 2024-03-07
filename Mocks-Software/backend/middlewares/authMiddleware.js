const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const authUser = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]
            token = token.substring(1,token.length-1)
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(decoded.id)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }
        catch(error){
            res.status(401)
            console.log(error)
            throw new Error('User Not Authorized')
        }
    }
    if(!token){
        res.status(402)
        throw new Error('Token Not Found')
    }
})

const authInterviewer = (req,res,next)=>{
    if(req.user && req.user.role ==='Interviewer'){
        next()
    }
    else{
        res.status(401)
        throw new Error('User not an Interviewer')
    }
}

const authAdmin = (req,res,next)=>{
    if(req.user && req.user.role ==='Admin'){
        next()
    }
    else{
        res.status(401)
        throw new Error('User not an Admin')
    }
}

module.exports = {authUser, authInterviewer, authAdmin}