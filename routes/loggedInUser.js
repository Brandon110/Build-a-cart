const express = require('express');
const wantListCollection = require('../models/want-lists.js');
const mongoose = require('mongoose');

module.exports = function(app) {
    app.get('/authed/user', (req, res) => {
       res.json(req.session.user); 
    });
}    