const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    cleaners_assigned: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cleaner'
    }],
    cleaning_tasks: {
        type: String,
        required: [true, 'Missing field: cleaning_tasks']
    },
    task_head: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Missing field: task_head'],
        ref: 'Head'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)