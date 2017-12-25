import React from 'react';

module.exports = class Home extends React.Component {
    render() {
        return (
            <div>
            <div className='title container-fluid'>
            <h1 style={{fontSize: '50px'}}>MakeACart</h1>
            <i className='fa fa-shopping-cart'></i>
            </div>
            
            <div className='features-container container'>
            <h3 className='text-center'>Features</h3>
            <hr/>
            
            <div className='row features'>
            <div className='col-md-4'>
            <p>Search Bestbuy products by name</p>
            </div>
            
            <div className='col-md-4'>
            <p>Filter searches by setting a price limit</p>
            </div>
            
            <div className='col-md-4'>
            <p>Build a cart of products your interested in</p>
            </div>
            
            <div className='col-md-4'>
            <p>Set a price limit when adding items to your cart that alerts you if you have gone over your limit</p>
            </div>
            
            <div className='col-md-4'>
            <p>Easily manage items in your cart</p>
            </div>
            
            <div className='col-md-4'>
            <p>Get total price of all items in your cart</p>
            </div>
            </div>
            </div>
            </div>
        )
    }
}