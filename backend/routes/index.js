const express = require('express');

const router = express.Router();

const Employee = require('../models/Employee');
const Review = require('../models/Review');
const Feedback = require('../models/Feedback');

// CREATE
function addDocument(model, req, res, message) {
    const newObj = new model({
        ...req.body
    });
    newObj.save()
        .then(() => res.status(201).json({
            message: message
        }))
        .catch((error => res.status(400).json({
            error
        })))
}

// READ
// Get all
function getAll(model, req, res) {
    model.find()
        .then(items => res.status(200).json(items))
        .catch(error => res.status(400).json({
            error
        }));
}

// Get by id
function getById(model, req, res) {
    model.findOne({
            _id: req.params.id
        })
        .then(item => res.status(200).json(item))
        .catch(error => res.status(404).json({
            error
        }));
}

// UPDATE
function updateDocument(model, req, res, message) {
    model.updateOne({
            _id: req.params.id
        }, {
            ...req.body,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: message
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

//DELETE
function deleteDocument(model, req, res, message) {
    model.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: message
        }))
        .catch(error => res.status(400).json({
            error
        }));
}

/******************
 Employees
 *****************/

// Post a new employee
router.post('/employees', (req, res, next) => {
    addDocument(Employee, req, res, 'New employee added!')
});

// Get all employees
router.get('/employees', (req, res, next) => {
    getAll(Employee, req, res);
});

// Get one employee by id
router.get('/employees/:id', (req, res, next) => {
    getById(Employee, req, res);
});

// Get employee by id
// With the full list of its assignments (with employee) and own reviews (with reviewer)
router.get('/employees/profile/:id/', (req, res, next) => {
    Employee.findOne({
            _id: req.params.id
        })
        .populate({
            path: 'reviews',
            populate: {
                path: 'reviewer'
            }
        })
        .populate({
            path: 'assignments',
            populate: {
                path: 'employee'
            }
        })
        .exec(function (error, result) {
            if (error) {
                res.status(404).json({
                    error
                })
            }
            res.status(200).json(result);
        });
});

// Update one employee by id
router.put('/employees/:id', (req, res, next) => {
    updateDocument(Employee, req, res, 'Employee updated!');
});

// Delete one employee by id
router.delete('/employees/:id', (req, res, next) => {
    deleteDocument(Employee, req, res, 'Employee deleted!')
});

/******************
Reviews
*****************/
// Post a new review
router.post('/reviews', (req, res, next) => {
    addDocument(Review, req, res, 'New review added!')
});

// Get all reviews
router.get('/reviews', (req, res, next) => {
    getAll(Review, req, res);
});

// Get one review by id
router.get('/reviews/:id', (req, res, next) => {
    getById(Review, req, res);
});
// Get one review by id
// With the employee, reviewer and the list of feedbacks (with author)
router.get('/reviews/view/:id', (req, res, next) => {
    Review.findOne({
            _id: req.params.id
        })
        .populate('employee reviewer')
        .populate({
            path: 'feedbacks',
            populate: {
                path: 'author'
            }
        })
        .exec(function (error, result) {
            if (error) {
                res.status(404).json({
                    error
                })
            }
            res.status(200).json(result);
        });
});

// Update one review by id
router.put('/reviews/:id', (req, res, next) => {
    updateDocument(Review, req, res, 'Review updated!');
});

// Delete one review by id
router.delete('/reviews/:id', (req, res, next) => {
    deleteDocument(Review, req, res, 'Review deleted!')
});

/******************
Feedbacks
*****************/
router.post('/feedbacks', (req, res, next) => {
    addDocument(Feedback, req, res, 'New feedback added!')
});

router.get('/feedbacks', (req, res, next) => {
    getAll(Feedback, req, res);
});

router.get('/feedbacks/:id', (req, res, next) => {
    getById(Feedback, req, res);
});

router.put('/feedbacks/:id', (req, res, next) => {
    updateDocument(Feedback, req, res, 'Feedback updated!');
});

router.delete('/feedbacks/:id', (req, res, next) => {
    deleteDocument(Feedback, req, res, 'Feedback deleted!')
});

module.exports = router;