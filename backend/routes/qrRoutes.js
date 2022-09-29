const express = require('express')
const router = express.Router()
const { cleanerProtect } = require('../middleware/cleanerAuthMiddleware.js')
const { scanQr, getQr } = require('../controllers/qrController.js')

router.post('/:task_id', cleanerProtect, scanQr)
router.get('/:task_id', cleanerProtect, getQr)

module.exports = router