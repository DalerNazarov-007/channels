const Joi = require("joi")

const authSchemaRegister = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    surname: Joi.string().alphanum().min(3).max(30).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().min(5).max(30).required()
})

const authSchemaLogin = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(5).max(20).required()
})

module.exports = {authSchemaRegister, authSchemaLogin}