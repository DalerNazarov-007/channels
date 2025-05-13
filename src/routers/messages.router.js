const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');
const { getAllMessages, writeNewMessage, editMessage, deleteMessage } = require('../controllers/messages.controller');

const messagesRouter = express.Router();

messagesRouter.get("/", authenticateToken, getAllMessages)
messagesRouter.post("/", authenticateToken, writeNewMessage)
messagesRouter.put("/:id", authenticateToken, editMessage)
messagesRouter.delete("/:id", authenticateToken, deleteMessage)


module.exports = messagesRouter

