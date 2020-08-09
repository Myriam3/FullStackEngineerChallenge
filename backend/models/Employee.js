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
        //TODO email validation / unique:true
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
        type: [String]
    }
});

module.exports = mongoose.model('Employee', employeeSchema);