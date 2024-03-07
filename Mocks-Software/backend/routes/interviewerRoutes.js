const express = require('express');
const router = express.Router();

const{authUser, authInterviewer} = require('../middlewares/authMiddleware');
const {gradeInterview, getInterview, updateInterviewScores } = require('../controllers/interviewerController');

router.route('/grade_interview/:id').post(authUser,authInterviewer,gradeInterview)
router.route('/interview/:id').get(authUser,authInterviewer,getInterview).post(authUser,authInterviewer,updateInterviewScores)

module.exports = router;