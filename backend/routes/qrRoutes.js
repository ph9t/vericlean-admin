const express = require('express')
const router = express.Router()
const { cleanerProtect } = require('../middleware/cleanerAuthMiddleware.js')
const { scanQr } = require('../controllers/qrController.js')

router.post('/:task_id', cleanerProtect, scanQr)

module.exports = router