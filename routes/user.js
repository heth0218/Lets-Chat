const express = require('express')

const router = express.Router()

const { createUser, login } = require('../controller/user')

router.post('/', createUser)

router.post('/login', login)

module.exports = router
