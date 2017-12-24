const userCollection = require('../models/users.js');
const express = require('express');
const app = express();

module.exports = function(app) {
    app.post('/update/account/settings', (req, res) => {

        userCollection.findOneAndUpdate({ 'email': req.session.user }, {
            $set: {
                'settings.address': req.body.formOneValues.address,
                'settings.city': req.body.formOneValues.city,
                'settings.state': req.body.formOneValues.state
            }
        }, { new: true }, (err, updated) => {
            if (err) return err;
            if (updated) {
                res.send('success');
            }else {
                res.send('error');
            }
        });

    });
    
    app.get('/account/settings', (req, res) => {
       userCollection.findOne({ 'email': req.session.user }, (err, user) => {
          if(err) return err;
          
          res.send( user.settings );
       });
    });
}
