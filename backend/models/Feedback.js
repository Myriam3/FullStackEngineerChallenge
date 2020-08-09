const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Review = require('../models/Review');

const feedbackSchema = mongoose.Schema({
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Review,
        required: 'The review is required'
    },
    //TODO: author name (if employee is deleted)
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee,
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