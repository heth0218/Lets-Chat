const express = require('express')
const router = express.Router()

const { create, getChats, getSingleChat, newMessage } = require('../controller/chat');

router.post('/createChats', create);

router.post('/getAllChats', getChats);

router.get('/:id', getSingleChat)

router.post('/newMessage', newMessage)

module.exports = router