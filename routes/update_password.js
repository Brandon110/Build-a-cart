const userCollection = require('../models/users.js');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();

module.exports = function(app) {
    app.post('/change/password', (req, res) => {
        const saltRounds = 10;

        userCollection.findOne({ 'email': req.session.user }, (err, user) => {
            if (err) return err;

            const checkIfCurrentPassMatches = () => {
                bcrypt.compare(req.body.formTwoValues.currentPass, user.password).then(function(result) {
                    if (result === false) {
                        res.send('incorrect password')
                        return;
                    }
                    else {
                        changePassword();
                    }
                });
            }
            checkIfCurrentPassMatches();

            const changePassword = () => {
                bcrypt.genSalt(saltRounds, function(err, salt) {
                    if (err) return err;
                    bcrypt.hash(req.body.formTwoValues.newPass, salt, function(err, hash) {
                        if (err) return err;
                        userCollection.findOneAndUpdate({ 'email': user.email }, {
                                $set: {
                                    'password': hash
                                }
                            },
                            (err, updated) => {
                                if (err) return err;

                                if (updated) {
                                    res.send('success');
                                }
                            });
                    });
                });
            }
        });
    });
}
