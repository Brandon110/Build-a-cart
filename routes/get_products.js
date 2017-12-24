require('dotenv').config();

const bby = require('bestbuy')(process.env.API_KEY);
const userCollection = require('../models/users.js');
const express = require('express');
const app = express();

module.exports = function(app) {
    app.post('/products/search', (req, res) => {

        res.redirect('/search/results/' + req.body.search)
    });

    app.get('/search/results/:search', (req, res) => {
        const priceLimit = +req.query.priceLimit;
        const offset = req.query.offset;
        const product_data = [];
 
      bby.products('(search='+req.params.search+')', {show: 'salePrice,name,image,shortDescription', page: offset })
      .then(function(data){
        if (data.total === 0) res.send('no products');
        else {
            for(var i = 0; i < data.products.length; i++){
                if(priceLimit && data.products[i].salePrice < priceLimit){
                product_data.push({ 
                name: data.products[i].name, 
                price: data.products[i].salePrice,
                image: data.products[i].image, 
                });
                }
                else if(!priceLimit){
                product_data.push({
                name: data.products[i].name, 
                price: data.products[i].salePrice,
                image: data.products[i].image, 
                description: data.products[i].shortDescription
                });
                }
            }
    
            res.send(product_data);
        }
      })
      .catch(function(err){
         return err;
      });
    });
}
