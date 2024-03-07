const express = require('express');
const router = express.Router();

const { authUser, authAdmin } = require('../middlewares/authMiddleware');

const { addStudent} = require('../controllers/studentController');

router.route('/add').post(authUser, authAdmin, addStudent)
module.exports = router;
