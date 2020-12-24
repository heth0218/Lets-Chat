const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now(),
    },
});

const ChatSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    messages: [MessageSchema],
});

module.exports = model('Chat', ChatSchema);