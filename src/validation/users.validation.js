const Joi = require("joi")

const userValid = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    surname: Joi.string().alphanum().min(3).max(30).required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    role: Joi.string().valid("subscriber", "owner", "admin").default("subscriber"),
    email: Joi.string().email().min(5).max(30).required(),
    password: Joi.string().alphanum().min(5).max(30).required(),
    birthYear:Joi.number().integer().min(1950).max(2024).required()
})

const userValidUpdate = Joi.object({
    name: Joi.string().alphanum().min(3).max(30),
    surname: Joi.string().alphanum().min(3).max(30),
    username: Joi.string().alphanum().min(3).max(30),
    role: Joi.string().valid("subscriber", "owner", "admin").default("subscriber"),
    email: Joi.string().email().min(5).max(30),
    password: Joi.string().alphanum().min(5).max(30),
    birthYear:Joi.number().integer().min(1950).max(2024)
})
module.exports = {userValid, userValidUpdate}