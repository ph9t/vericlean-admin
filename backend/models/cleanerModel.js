const mongoose = require('mongoose')

const cleanerSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Missing name.']
    },
    email: {
        type: String,
        required: [true, 'Missing email.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Missing password.']
    },
    contract_start: {
        type: Date,
        required: [true, 'Missing start contract date.']
    },
    contract_end: {
        type: Date,
        required: [true, 'Missing end contract date.']
    },
    role: {
        type: String,
        required: [true, 'Missing role.']
    }
},
{
    timestamp: true
})

module.exports = mongoose.model('Cleaner', cleanerSchema)