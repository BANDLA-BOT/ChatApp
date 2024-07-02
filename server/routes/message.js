const express = require('express')
const {sendMessage, getMessage} = require('../controllers/messageController.js')
const protectRoute = require('../middleware/protectRoute.js')
const router = express.Router()
router.get('/:id', protectRoute, getMessage)
router.post('/send/:Id', protectRoute, sendMessage)
module.exports = router