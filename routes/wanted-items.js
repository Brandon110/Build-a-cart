const wantListCollection = require('../models/want-lists.js');
const express = require('express');
const app = express();

module.exports = function(app) {

    app.post('/want-list/add-item', (req, res) => {
        let total = 0;
 
        const addItemToWantList = () => {
             wantListCollection.findOneAndUpdate({ 'email': req.session.user }, {
                $push: {
                    'items': req.body.result
                }
            }, { new: true }, (err, updated) => {
                if (err) return err;
                
                if(updated){
                    res.send('success');
                }
            });
        }

        const calculateTotal = (user) => {
            user.items.forEach(result => {
                total += result.price;
            });
            
            return total;
        }

        wantListCollection.findOne({ 'email': req.session.user }, (err, user) => {
            if (err) {
                return err;
            }
            else if (!user) {
                res.send('not logged in');
                return;
            }
            else if (user.budget && calculateTotal(user) + req.body.result.price > user.budget) {
                res.send('over budget');
                return;
            }
            else {
                addItemToWantList();
            }
        });
    });

    app.get('/want-list/items', (req, res) => {
        wantListCollection.findOne({ 'email': req.session.user }, (err, col) => {
            if (err) return err;

            if (!col) {
                res.redirect('/login');
                return;
            }
            else {
                res.send(col);
            }
        });
    });

    app.post('/want-list/remove-item', (req, res) => {

        wantListCollection.update({ 'email': req.session.user }, {
            $pull: {
                'items': {
                    '_id': req.body.result._id
                }
            }
        }, (err, result) => {
            if (err) return err;
            res.send(result);
        });
    });
}
