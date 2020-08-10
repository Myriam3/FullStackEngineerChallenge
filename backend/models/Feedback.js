const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review',
        required: 'The review is required'
    },
    //TODO: author name (if employee is deleted)
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: 'The author is required'
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        required: 'The review is required'
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);