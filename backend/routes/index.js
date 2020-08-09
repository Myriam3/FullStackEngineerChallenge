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
        .then(employees => res.status(200).json(employees))
        .catch(error => res.status(400).json({
            error
        }));
}

// Get by id
function getById(model, req, res) {
    model.findOne({
            _id: req.params.id
        })
        .then(employees => res.status(200).json(employees))
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
router.post('/employees', (req, res, next) => {
    addDocument(Employee, req, res, 'New employee added!')
});

router.get('/employees', (req, res, next) => {
    getAll(Employee, req, res);
});

router.get('/employees/:id', (req, res, next) => {
    getById(Employee, req, res);
});

router.put('/employees/:id', (req, res, next) => {
    updateDocument(Employee, req, res, 'Employee updated!');
});

router.delete('/employees/:id', (req, res, next) => {
    deleteDocument(Employee, req, res, 'Employee deleted!')
});

/******************
Reviews
*****************/
router.post('/reviews', (req, res, next) => {
    addDocument(Review, req, res, 'New review added!')
});

router.get('/reviews', (req, res, next) => {
    getAll(Review, req, res);
});

router.get('/reviews/:id', (req, res, next) => {
    getById(Review, req, res);
});

router.put('/reviews/:id', (req, res, next) => {
    updateDocument(Review, req, res, 'Review updated!');
});

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