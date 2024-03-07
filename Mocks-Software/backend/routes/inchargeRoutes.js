const express = require('express');
const router = express.Router();

const {authUser} = require('../middlewares/authMiddleware');
const { allocateStudent, deallocateStudent, getUsers } = require('../controllers/inchargeController');

router.route('/allocate_student').post(authUser, allocateStudent);
router.route('/deallocate_student').post(authUser, deallocateStudent);
router.route('/get_users/:data').get(authUser, getUsers);

module.exports = router; 