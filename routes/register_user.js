const express = require('express');
const userCollection = require('../models/users.js');
const wantListCollection = require('../models/want-lists.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = function(app) {

    const checkIfValidEmail = (email) => {
        const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

       return reg.test(email);
    }

    app.post('/register/user', (req, res) => {
        const name = req.body.formValues.name;
        const address = req.body.formValues.address;
        const email = req.body.formValues.email;
        const plainTxtPassword = req.body.formValues.password;
        const saltRounds = 10;
 
        const addUserToDatabase = () => {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                if (err) return err;
                bcrypt.hash(plainTxtPassword, salt, function(err, hash) {
                    if (err) return err;

                    const userData = new userCollection({
                        name: name,
                        settings: {
                        address: address,
                        city: '',
                        state: ''
                        },
                        email: email,
                        password: hash
                    });
                    
                    const wantListData = new wantListCollection({
                       email: email
                    });
                    
                    wantListData.save(function(err, data) {
                       if(err) return err;
                    });

                    userData.save(function(err, data) {
                        if (err) return err;
                        res.send('success');
                    });
                });
            });
        }
 
        userCollection.findOne({ 'email': email }, (err, user) => {
            if(err) { 
                return err;
            }
            else if (user) {
                res.send('user exists');
                return;
            }
            else if (!name || !email || !address || !plainTxtPassword ) {
                res.send('empty feilds');
                return;
            }
            else if (checkIfValidEmail(email) === false) {
                res.send('invalid email');
                return;
            }
            else {
                addUserToDatabase();
            }
        });
    });
}
