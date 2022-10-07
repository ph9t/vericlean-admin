const express = require('express')
const router = express.Router()
const { cleanerProtect } = require('../middleware/cleanerAuthMiddleware.js')
const { scanQr, getQr } = require('../controllers/qrController.js')

router.route('/:task_id').get(cleanerProtect, getQr).put(cleanerProtect, scanQr)

module.exports = router