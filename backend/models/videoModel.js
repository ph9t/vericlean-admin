const mongoose = require('mongoose')

const videoSchema = mongoose.Schema({
    cleaner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Cleaner'
    },
    video_path: [{
        type: String,
        required: [true, 'Missing field: video path(s)']
    }],
}, {
    timestamps: true
})

module.exports = mongoose.model('Video', videoSchema)