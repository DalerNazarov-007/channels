const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  text: {
    type: String,
    required: false,
  },
  channelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Channel',
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, 
{
  timestamps: true,
});

const messageModel = mongoose.model('Message', MessageSchema);
module.exports = messageModel;