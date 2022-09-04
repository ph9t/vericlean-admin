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
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Task', taskSchema)