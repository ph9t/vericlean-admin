const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    cleaners_assigned: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cleaner'
    }],
    cleaner_log_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Missing field: cleaner_logs'],
        ref: 'CleanerLog'
    }],
    cleaning_tasks: {
        type: String,
        required: [true, 'Missing field: cleaning_tasks']
    },
    task_head: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Missing field: task_head'],
        ref: 'Head'
    },
    room: {
        type: Number,
        required: [true, 'Missing field: room']
    },
    floor: {
        type: Number,
        required: [true, 'Missing field: floor']
    },
    start_time: {
        type: Date,
        required: [true, 'Missing field: start_time']
    },
    end_time: {
        type: Date,
        required: [true, 'Missing field: start_time']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)