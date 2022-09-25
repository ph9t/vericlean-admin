const express = require('express')
const router = express.Router()
const { loginHead, registerHead } = require('../controllers/headController.js')

router.post('/login', loginHead)
router.post('/register', registerHead)

module.exports = router