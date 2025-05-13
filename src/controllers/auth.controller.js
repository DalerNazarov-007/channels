const userModel = require("../models/users.model")
const jwt = require("jsonwebtoken")
const { SECRET_KEY_ACCESS, SECRET_KEY_REFRESH } = require("../configuration/configuration")
const express = require("express")
const { authSchemaLogin, authSchemaRegister } = require("../validation/auth.validation")


async function registerNewUser(req, res) {
    const data = await authSchemaRegister.validateAsync(req.body)

    const existingEmail = await userModel.findOne({email: data.email})
    if (existingEmail) {
        return res.status(400).send({message: "User with this email already exists"})
    }
    const existingUsername = await userModel.findOne({username: data.username})
    if (existingUsername) {
        return res.status(400).send({message: "User with this username already exists"})
    }

    const user = new userModel(data)
    await user.save()

    const accessToken = jwt.sign({id: user._id, role: user.role}, SECRET_KEY_ACCESS, {
        expiresIn: "30m"
    })
    const refreshToken = jwt.sign({id: user._id, role: user.role}, SECRET_KEY_REFRESH, {
        expiresIn: "24h"
    })
    
    res.send({data: user, accessToken, refreshToken})

}

async function loginUser(req, res, next) {
    const data = await authSchemaLogin.validateAsync(req.body)

    const { username, password } = data
    if (!username || !password) {
        return res.status(400).send("Username and password are required");
    }

    const user = await userModel.findOne({ username });

    if (!user) {
        return res.status(401).send("Unauthorized: User not found");
    }

    if (user.password !== password) {
        return res.status(403).send("Unauthorized: Incorrect password");
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY_ACCESS, {
        expiresIn: "15m"
    });

    const refreshToken = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY_REFRESH, {
        expiresIn: "24h"
    });

    res.send({ accessToken, refreshToken });
}

module.exports = {
    registerNewUser,
    loginUser
}