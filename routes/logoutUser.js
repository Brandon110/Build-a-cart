const express = require('express');
 
module.exports = function(app) {
    app.get('/logout/user', (req, res) => {
       if(req.session.user || req.cookies.user_sid){
           res.clearCookie('user_sid');
           res.redirect('/');
       }
    });
}    