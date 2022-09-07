const express = require('express')
const router = express.Router()

const { registerCleaner, loginCleaner, allCleaners, getMe } = require('../controllers/cleanerController.js')
const { protect } = require('../middleware/authMiddleware.js')
const { adminProtect } = require('../middleware/headAuthMiddleware.js')

router.post('/', adminProtect, registerCleaner)
router.post('/login', loginCleaner)
router.get('/all', adminProtect, allCleaners)
router.get('/me', protect, getMe) // tentative

module.exports = router