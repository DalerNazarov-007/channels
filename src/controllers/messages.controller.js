const messageModel = require("../models/messages.model");
const channelModel = require("../models/channels.model"); // Missing import
const { messageValid, messageValidUpdate } = require("../validation/message.validation");

async function getAllMessages(req, res) {
    const messages = await messageModel.find().populate("channelId").populate("ownerId");
    if (!messages || messages.length === 0) {
        return res.status(404).send({ message: "No messages found." });
    }
    res.status(200).send(messages);
}

async function writeNewMessage(req, res) {
    const data = await messageValid.validateAsync(req.body);
    const userId = req.user.id;
    const { channelId } = data;

    const channel = await channelModel.findById(channelId);
    if (!channel) {
        return res.status(404).send({ message: "Channel not found." });
    }

    const isAdminOrOwner = channel.ownerId.toString() === userId || channel.admins.some(admin => admin.toString() === userId);

    if (!isAdminOrOwner) {
        return res.status(403).send({ message: "Only owners or admins can write messages." });
    }

    const message = new messageModel({
        ...data,
        ownerId: userId
    });
        
    await message.save();
    res.status(201).send(message);
}

async function editMessage(req, res) {
    const messageId = req.params.id;
    const userId = req.user.id;

    const messageToUpdate = await messageModel.findById(messageId);
    if (!messageToUpdate) {
        return res.status(404).send({ message: "Message not found." });
    }

    const channel = await channelModel.findById(messageToUpdate.channelId);
    const isAdminOrOwner = channel.ownerId.toString() === userId || channel.admins.some(admin => admin.toString() === userId);

    if (!isAdminOrOwner) {
        return res.status(403).send({ message: "You are not authorized to edit this message." });
    }

    const data = await messageValidUpdate.validateAsync(req.body);
    await messageModel.findByIdAndUpdate(messageId, data);
    res.status(200).send({ message: "Message successfully edited!" });
}

async function deleteMessage(req, res) {
    const messageId = req.params.id;
    const userId = req.user.id;

    const messageToDelete = await messageModel.findById(messageId);
    if (!messageToDelete) {
        return res.status(404).send({ message: "Message not found." });
    }

    const channel = await channelModel.findById(messageToDelete.channelId);
    const isAdminOrOwner = channel.ownerId.toString() === userId || channel.admins.some(admin => admin.toString() === userId);

    if (!isAdminOrOwner) {
        return res.status(403).send({ message: "You are not authorized to delete this message." });
    }

    await messageModel.findByIdAndDelete(messageId);
    res.status(200).send({ message: "Message successfully deleted!" });
}

module.exports = {
    getAllMessages,
    writeNewMessage,
    editMessage,
    deleteMessage
};
