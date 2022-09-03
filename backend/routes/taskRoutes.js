const express = require('express')
const router = express.Router()
const { 
    getTasks,
    setTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController.js')

router.route('/').get(getTasks).post(getTasks)
router.route('/:id').put(updateTask).delete(deleteTask)

module.exports = router