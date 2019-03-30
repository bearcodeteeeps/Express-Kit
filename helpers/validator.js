const mongoose = require('mongoose');
// Load user model
require('../models/Users')
const User = mongoose.model('users')

module.exports = {
    validateIdea: function validateIdea(req, res) {
        let errors = [];

        if (!req.body.title.trim()) {
            errors.push({
                text: 'Please add a title'
            });
        }
        if (!req.body.details.trim()) {
            errors.push({
                text: 'Please add the details'
            });
        }
        return errors;
    },
    validateUser: async function validateUser(req, res) {
        let errors = [];
        if (req.body.password != req.body.confirmPassword) {
            errors.push({
                text: 'passwords do not match'
            });
        }
        if (req.body.password.length < 4) {
            errors.push({
                text: 'password should have minimum of 6 characrers'
            });
        }
        await User.findOne({
            email: req.body.email
        }).then(result => {
            if (result) {
                errors.push({
                    text: 'Email already registered !'
                })
            }
        });
        return errors;
    }
}