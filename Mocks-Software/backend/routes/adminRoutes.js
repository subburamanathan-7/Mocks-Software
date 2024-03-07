const express = require('express')
const router  = express.Router();

const {authAdmin, authUser} = require('../middlewares/authMiddleware');
const { assignSlot, dischargeSlot, listStudentsByDept, listInterviewsByStudent, listUsers } = require('../controllers/adminControllers');

router.route('/assign_slot').post(authUser, authAdmin,assignSlot);
router.route('/discharge_slot').post(authUser, authAdmin,dischargeSlot);

router.route('/list_students_by_dept').post(authUser, authAdmin,listStudentsByDept);
router.route('/list_interviews_by_student/:id').get(authUser, authAdmin,listInterviewsByStudent);
router.route('/list_users').get(authUser,authAdmin,listUsers);

module.exports = router;

