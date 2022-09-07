const express = require('express')
const router = express.Router()
const { loginHead, headMe } = require('../controllers/headController.js')

router.post('/login', loginHead)

module.exports = router