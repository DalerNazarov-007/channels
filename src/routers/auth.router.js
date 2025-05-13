const express = require('express');
const { registerNewUser, loginUser } = require('../controllers/auth.controller');

const  authRouter = express.Router();

authRouter.post("/register", registerNewUser)
authRouter.post("/login", loginUser)

module.exports = authRouter