const express = require('express')
const router = express.Router()
const { 
    getTasks,
    setTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController.js')
const { protect } = require('../middleware/authMiddleware.js')
const { adminProtect } = require('../middleware/headAuthMiddleware.js')

router.route('/').get(protect, getTasks).post(adminProtect, setTask)
router.route('/:id').put(adminProtect, updateTask).delete(adminProtect, deleteTask)

module.exports = router