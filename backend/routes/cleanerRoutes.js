const express = require('express')
const router = express.Router()

const { registerCleaner, loginCleaner, allCleaners, getMe } = require('../controllers/cleanerController.js')
const { protect } = require('../middleware/authMiddleware.js')
const { headProtect } = require('../middleware/headAuthMiddleware.js')

router.post('/', headProtect, registerCleaner)
router.post('/login', loginCleaner)
router.get('/all', headProtect, allCleaners)
router.get('/me', protect, getMe) // tentative

module.exports = router