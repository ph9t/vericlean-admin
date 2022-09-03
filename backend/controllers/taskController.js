// @desc    Get scheduled tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = (req, res) => {
    res.status(200).json({ message: 'Get tasks.' })
}

// @desc    Create a scheduled task
// @route   POST /api/tasks
// @access  Private
const setTask = (req, res) => {
    res.status(200).json({ message: 'Set a task.' })
}

// @desc    Update a scheduled task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = (req, res) => {
    res.status(200).json({ message: `Update task ${req.params.id}` })
}

// @desc    Delete a scheduled task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = (req, res) => {
    res.status(200).json({ message: `Delete task ${req.params.id}` })
}

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask
}