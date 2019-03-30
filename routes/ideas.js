const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {
    ensureAuthenticated
} = require('../helpers/auth.js');

const {
    validateIdea
} = require('../helpers/validator');

// Load idea model
require('../models/Idea');
const Idea = mongoose.model('ideas');

// Add idea form 
router.get('/', ensureAuthenticated, (req, res) => {
    Idea.find({
        user: req.user.id
    }).sort({
        date: 'desc'
    }).then(ideas => {
        res.render('ideas/index', {
            ideas: ideas
        });
    });
});

// Add idea form 
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('ideas/add');
});

// Edit idea form 
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Idea.findOne({
        _id: req.params.id
    }).then(idea => {
        if (idea.user != req.user.id) {
            req.flash('error_msg', 'How do you know about this ?!');
            res.redirect('/ideas');
        } else {
            res.render('ideas/edit', {
                idea: idea
            });
        }
    }).catch(err => {
        req.flash('error_msg', 'could not find the requested Idea');
        res.redirect('/ideas');
    })
});


// Process idea form 
router.post('/', ensureAuthenticated, (req, res) => {
    const errors = validateIdea(req, res);
    if (errors.length > 0) {
        res.render('ideas/add', {
            errors: errors,
            title: req.body.title,
            details: req.body.details,
        });
    } else {
        const newUser = {
            title: req.body.title.trim(),
            details: req.body.details.trim(),
            user: req.user.id
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                req.flash('success_msg', 'Vedio idea added !');
                res.redirect('/ideas');
            });
    }
});

// Update idea
router.put('/:id', ensureAuthenticated, (req, res) => {
    const errors = validateIdea(req, res);
    if (errors.length > 0) {
        console.log("Validation failed @" + req.url);
        req.flash('error_msg', 'Validation failed!')

        res.render('ideas/edit', {
            title: 'edit page',
            errors: errors,
            idea: {
                id: req.params.id,
                title: req.body.title,
                details: req.body.details
            }
        });
    } else {
        Idea.findOne({
            _id: req.params.id
        }).then(idea => {
            console.log('user id:' + idea.user);
            console.log('logged in user id:' + req.user.id);

            if (idea.user != req.user.id) {
                req.flash('error_msg', 'Not Authorized to do this !');
                res.redirect('/ideas');
            }
            idea.title = req.body.title;
            idea.details = req.body.details;

            idea.save().then(updatedIdea => {
                req.flash('success_msg', 'Video idea updated!')
                res.redirect('/ideas');
            });
        });
    }
});

// delete idea
router.delete('/:id', ensureAuthenticated, (req, res) => {
    Idea.remove({
        _id: req.params.id
    }).then(() => {
        req.flash('success_msg', 'Video idea removed!')
        res.redirect('/ideas');
    })
});

module.exports = router;