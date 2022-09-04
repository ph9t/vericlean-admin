const express = require('express')
const router = express.Router()

const { registerCleaner, loginCleaner, getMe } = require('../controllers/cleanerController.js')

router.post('/', registerCleaner)
router.post('/login', loginCleaner)
router.get('/me', getMe)

module.exports = router