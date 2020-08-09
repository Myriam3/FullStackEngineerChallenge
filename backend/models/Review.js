const mongoose = require('mongoose');
const Employee = require('../models/Employee');

const reviewSchema = mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee,
        required: 'The employee is required'
    },
    //TODO: reviewer name (if reviewer is deleted)
    reviewerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Employee,
        required: 'The reviewer is required'
    },
    date: {
        type: Date,
        default: Date.now
    },
    reviewPeriod: {
        type: String,
        required: 'The review period is required'
    },
    title: {
        type: String,
        required: 'The title is required'
    },
    technicalReview: {
        type: String
    },
    generalReview: {
        type: String,
        required: 'The general review is required'
    },
    score: {
        type: Number,
        required: 'The score is required',
        min: 1,
        max: 5
    }
});

module.exports = mongoose.model('Review', reviewSchema);