const express = require('express')
const router = express.Router()
const { cleanerProtect } = require('../middleware/cleanerAuthMiddleware.js')
const { boundTask } = require('../middleware/taskTimeBoundMiddleware.js')
const { scanQr, getQr } = require('../controllers/qrController.js')

router.route('/:id').get(cleanerProtect, getQr).put(cleanerProtect, boundTask, scanQr)

module.exports = router