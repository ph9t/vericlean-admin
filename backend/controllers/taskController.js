const asyncHandler = require('express-async-handler')
const Task = require('../models/taskModel.js')
const Head = require('../models/headModel.js')

// @desc    Get scheduled tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    let tasks
    
    if (req.head){
        tasks = await Task.find({ task_head: req.head._id })
    }
    else if (req.cleaner){
        tasks = await Task.find({ cleaners_assigned: req.cleaner._id })
    }
    res.status(200).json(tasks)
})

// @desc    Create a scheduled task
// @route   POST /api/tasks
// @access  Private
const setTask = asyncHandler( async (req, res) => {
    if (!req.body.cleaning_tasks){
        res.status(400)
        throw new Error("'cleaning_tasks' field missing.")
    }

    const task = await Task.create({
        cleaners_assigned: req.body.cleaners_assigned,
        cleaning_tasks: req.body.cleaning_tasks,
        task_head: req.head._id
    })
    res.status(200).json(task)
})

// @desc    Update a scheduled task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task){
        res.status(400)
        throw new Error('Task not found in the database.')
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { 
        new: true
    })
    res.status(200).json(updatedTask)
})

// @desc    Delete a scheduled task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id)
    if (!task){
        res.status(400)
        throw new Error('Task not found in the database.')
    }
    await task.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask
}