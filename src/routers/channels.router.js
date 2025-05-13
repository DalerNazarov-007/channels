const express = require('express');
const authenticateToken = require('../middleware/auth.middleware');
const { getAllChannels, getOneById, createNewChannel, editChannel, deleteChannel, addAdminToChannel, removeAdminFromChannel, addMemberToChannel, removeMemberFromChannel, joinChannelAsMember, leaveChannelAsMember } = require('../controllers/channels.controller');

const channelsRouter = express.Router();

channelsRouter.get("/", authenticateToken, getAllChannels)
channelsRouter.get("/:id", authenticateToken, getOneById)
channelsRouter.post("/", authenticateToken, createNewChannel)
channelsRouter.put("/:id", authenticateToken, editChannel)
channelsRouter.delete("/:id", authenticateToken, deleteChannel)
channelsRouter.post("/:channelId/admin/:adminId", authenticateToken, addAdminToChannel)
channelsRouter.delete("/:channelId/admin/:adminId", authenticateToken, removeAdminFromChannel)
channelsRouter.post("/:channelId/member/:memberId", authenticateToken, addMemberToChannel)
channelsRouter.delete("/:channelId/member/:memberId", authenticateToken, removeMemberFromChannel)
channelsRouter.post("/:channelId/join", authenticateToken, joinChannelAsMember)
channelsRouter.delete("/:channelId/leave", authenticateToken, leaveChannelAsMember) 




module.exports = channelsRouter

