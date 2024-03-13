const express = require('express');
const { createConfig, updateConfig } = require('../controllers/configController');
const {authAdmin, authUser} = require('../middlewares/authMiddleware')

const router  = express.Router();

router.route('/create').post(authUser, authAdmin, createConfig);
router.route('/reset').post(authUser, authAdmin, updateConfig);


module.exports = router;
