const express = require('express')
const router = express.Router()
const { 
    getTasks,
    setTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController.js')

router.get('/', getTasks)
router.post('/', setTask)
router.put('/:id', updateTask) 
router.delete('/:id', deleteTask)

module.exports = router