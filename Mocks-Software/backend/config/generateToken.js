const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

module.exports = generateToken