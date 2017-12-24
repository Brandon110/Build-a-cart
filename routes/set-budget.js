const wantListCollection = require('../models/want-lists.js');
const express = require('express');
const app = express();

module.exports = function(app) {
    app.post('/set-budget', (req, res) => {
       wantListCollection.findOneAndUpdate({ 'email': req.session.user }, {$set: { 'budget': req.body.budget } }, {new: true}, (err, updated) => {
           if(err) return err;
           
            res.send(updated);
       });
    });
}