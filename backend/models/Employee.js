const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: 'The first name is required'
    },
    lastName: {
        type: String,
        required: 'The lastName is required'
    },
    email: {
        type: String,
        required: 'The email is required',
        lowercase: true,
        trim: true,
        unique: true
    },
    role: {
        type: String,
        required: 'The role is required'
    },
    year: {
        type: Number
    },
    active: {
        type: Boolean,
        default: true
    },
    reviewerRight: {
        type: Boolean,
        default: false
    },
    assignments: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

employeeSchema.virtual('reviews', {
    ref: 'Review',
    localField: '_id',
    foreignField: 'employee'
});

module.exports = mongoose.model('Employee', employeeSchema);