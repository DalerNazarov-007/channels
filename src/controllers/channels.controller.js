const express = require("express");
const Joi = require("joi");
const channelModel = require("../models/channels.model");
const { channelValid, channelValidUpdate } = require("../validation/channels.validation");
const userModel = require("../models/users.model");


async function getAllChannels(req, res) {
    const channels = await channelModel.find().populate("ownerId").populate("members").populate("admins");
    if (!channels) {
        return res.status(404).send({ message: "No channels found." });
    }
    res.status(200).send(channels);
}

async function getOneById(req, res) {
    const id = req.params.id;
    const channel = await channelModel.findById(id).populate("ownerId").populate("members").populate("admins");
    if (!channel) {
        return res.status(404).send({ message: "Channel not found." });
    }
    res.status(200).send(channel);
}

async function createNewChannel(req, res) {
    const data = await channelValid.validateAsync(req.body)
    const userId = req.user.id

    const newChannel = new channelModel({
        ...data,
        ownerId: userId
    }) 

    await newChannel.save()
    res.send(newChannel)
}

async function editChannel(req, res) {
    const channel = req.params.id;
    const userId = req.user.id;
    const channelToUpdate = await channelModel.findById(channel);
    if (channelToUpdate.ownerId.toString() === userId) {
        const data = await channelValidUpdate.validateAsync(req.body);
        await channelModel.findByIdAndUpdate(channel, data)
        res.status(200).send({ message: "Channel successfully edited!" });
    }
    if (!channelToUpdate) {
        return res.status(404).send({ message: "Channel not found." });
    }
    if (channelToUpdate.ownerId.toString() !== userId) {
        return res.status(403).send({ message: "You are not authorized to edit this channel." });
    }
}

async function deleteChannel(req, res) {
    const channelId = req.params.id;
    const userId = req.user.id;

        const channelToDelete = await channelModel.findById(channelId)
        if (channelToDelete.ownerId.toString() === userId) {
            await channelModel.findByIdAndDelete(channelId);
            return res.status(200).send({ message: "Channel successfully deleted!" });
        }else{
            return res.status(403).send({ message: "You are not authorized to delete this channel." });
        }
}

async function addAdminToChannel(req, res) {
    const channelId = req.params.channelId;
    const adminId = req.params.adminId;
    const channel = await channelModel.findById(channelId);
    channel.admins.push(adminId);
    await channel.save();
    res.status(200).send({ message: "Admin successfully added to channel!" });
}

async function removeAdminFromChannel(req, res) {
    const channelId = req.params.channelId;
    const adminId = req.params.adminId;
    const channel = await channelModel.findById(channelId);
    channel.admins = channel.admins.filter((admin) => admin.toString() !== adminId);
    await channel.save();
    res.status(200).send({ message: "Admin successfully removed from channel!" });
}

async function addMemberToChannel(req, res) {
    const channelId = req.params.channelId;
    const memberId = req.params.memberId;
    const channel = await channelModel.findById(channelId)
    channel.members.push(memberId)
    await channel.save()
    res.status(200).send({ message: "Member successfully added to channel!" })
}

async function removeMemberFromChannel(req, res) {
    const channelId = req.params.channelId;
    const memberId = req.params.memberId;
    const channel = await channelModel.findById(channelId)
    channel.members = channel.members.filter((member) => member.toString() !== memberId)
    await channel.save()
    res.status(200).send({ message: "Member successfully removed from channel!" })
}

async function joinChannelAsMember(req, res) {
    const channelId = req.params.channelId;
    const userId = req.user.id;

    const channel = await channelModel.findById(channelId);
    if (!channel) {
        return res.status(404).send({ message: "Channel not found." });
    }

    const isAlreadyMember = channel.members.some(member => member.toString() === userId);
    if (isAlreadyMember) {
        return res.status(400).send({ message: "You are already a member of this channel." })
    }

    channel.members.push(userId)
    await channel.save()

    res.status(200).send({ message: "You have successfully joined the channel." });
}


async function leaveChannelAsMember(req, res) {
    const channelId = req.params.channelId;
    const userId = req.user.id;

    const channel = await channelModel.findById(channelId)
    if (!channel) {
        return res.status(404).send({ message: "Channel not found." })
    }
    const isMember = channel.members.some(member => member.toString() === userId)
    if (!isMember) {
        return res.status(400).send({ message: "You are not a member of this channel." })
    }
    channel.members = channel.members.filter(member => member.toString() !== userId)
    await channel.save()
    res.status(200).send({ message: "You have successfully left the channel." })
}




module.exports = {
    getAllChannels, getOneById, createNewChannel, editChannel, deleteChannel, addAdminToChannel, removeAdminFromChannel, addMemberToChannel, removeMemberFromChannel,
    joinChannelAsMember, leaveChannelAsMember
}