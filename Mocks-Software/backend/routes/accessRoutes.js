const express = require('express');
const router = express.Router();

// Admin & Volunteers
const { registerUser, loginUser, getUser,getStudent, listInterviews, listStudents, uploadFiles } = require('../controllers/accessController');
const {authAdmin, authUser} = require('../middlewares/authMiddleware')

// Only Admin -> registers volunteer or HR
router.route('/register').post(authUser,authAdmin,registerUser)

// Everyone
router.route('/login').post(loginUser)
router.route('/get_user/:id').get(authUser,getUser)
router.route('/student/:id').get(authUser,getStudent)

router.route('/list_interviews/:id').get(authUser,listInterviews)
router.route('/list_students').get(authUser,listStudents)

// router.route('/upload_files').post(upload.single('file'),uploadFiles)

module.exports = router;
