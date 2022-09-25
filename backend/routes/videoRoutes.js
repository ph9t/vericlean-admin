const express = require('express')
const router = express.Router()
const { cleanerProtect } = require('../middleware/cleanerAuthMiddleware.js')
const { uploadVideo } = require('../controllers/videoController.js')

router.post('/:task_id', cleanerProtect, uploadVideo)

module.exports = router