const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const {
    validateUser
} = require('../helpers/validator');

// Load user model
require('../models/Users')
const User = mongoose.model('users')

//User Login route
router.get('/login', (req, res) => {
    res.render('users/login');
})

// Login form post.
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
            successRedirect: '/ideas',
            failureRedirect: '/users/login',
            failureFlash: true
        })
        (req, res, next);
});

//User Registration route
router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', async (req, res) => {

    errors = await validateUser(req, res);
    console.log("errors:" + errors);

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
    } else {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
        });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                newUser.password = hash;
                newUser.save()
                    .then(user => {
                        req.flash('success_msg', 'You are now registered and can log in');
                        res.redirect('/users/login');
                    }).catch(err => console.log(err));
            });
        });
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out !');
    res.redirect('/users/login');
});


module.exports = router;