const express = require('express')
const router = express.Router()
const { nocache } = require('../middleware/agoraMiddleware.js')
const { generateRTCToken } = require('../controllers/rtcController.js')

router.get('/:channel/:role/:tokentype/:uid', nocache, generateRTCToken)

module.exports = router