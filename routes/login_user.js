const express = require('express');
const userCollection = require('../models/users.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = function(app) {
    app.post('/login/user', (req, res) => {
        const email = req.body.formValues.email;
        const plainTxtPassword = req.body.formValues.password;
        
        
   userCollection.findOne({'email': email}, (err, user) => {
          if(err) {
          return err;
         }
         else if(!user) {
          res.send('invalid email');
          return;
         }
         
        bcrypt.compare(plainTxtPassword, user.password, function(err, result) {
         if(err) {
             return err;
        }
        else if(!email || !plainTxtPassword){
            res.send('missing feilds');
            return;
        }
        else if(result === false){
            res.send('incorrect password');
            return;
        }
        else {
            req.session.user = user.email;
            res.send('success');
        }
        });
      });
    });
}