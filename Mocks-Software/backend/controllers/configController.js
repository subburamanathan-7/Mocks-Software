const asyncHandler = require('express-async-handler');

const Config = require('../models/configModel')

// @desc createInterviewCount
// @route POST api/config/create
// @access Private {Admin}

const createConfig = asyncHandler(async(req,res)=>{
    const {interviewCount} = req.body;
    const newConfig = await Config.create({
        interviewCount
    })

    if(!newConfig){
        res.status(403)
        throw new Error('config not created')
    }
    res.status(200).json({
        interviewCount:newConfig.interviewCount
    })
})

// @desc update InterviewCount
// @route POST api/config/update
// @access Private {Admin}

const updateConfig = asyncHandler(async(req,res)=>{
    const {interviewCount} = req.body;
    const currentConfig = await Config.findOne({id:'1'});

    // console.log(currentConfig);
    if(!currentConfig){
        res.status(403)
        throw new Error('config not found')
    }
    const value = {$set:{interviewCount:interviewCount}}
    // console.log(value)
    await Config.updateOne({id:'1'},value);
    
    const updatedConfig = await Config.find({id:'1'});

    if(!updatedConfig){
        res.status(403)
        throw new Error('config not updated')
    }
    // console.log(updateConfig)
    res.status(200).json({
        interviewCount:updateConfig.interviewCount
    })

})

module.exports = {
    createConfig,
    updateConfig
}