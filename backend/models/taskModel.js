const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    cleaning_tasks: {
        type: String,
        required: [true, 'Missing field: cleaning_tasks']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)