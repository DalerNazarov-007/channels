const Joi = require("joi")

const messageValid = Joi.object({
    text: Joi.string().min(1).max(500).required(),
    channelId: Joi.string().required(),
    ownerId: Joi.string().forbidden(),
})

const messageValidUpdate = Joi.object({
    text: Joi.string().min(1).max(500),
    channelId: Joi.string(),
})

module.exports = {messageValid, messageValidUpdate}