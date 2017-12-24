import React from 'react';

module.exports = class ProductsPage extends React.Component {
    render() {
        const results = this.props.results;
        
        return (
            <div className='container'>
            <h1>Product Search</h1>
            
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <div className='form-group row'>
            <div className='col-md-10'>
            <input onChange={(e) => this.props.handleChange(e)} type='text' className='form-control' name='product' placeholder='Search products by name' value={this.props.formValues['product']} required/>
            </div>
            <div className='col-md-2'>
            <button style={{height: '100%'}} type='submit'>Search</button>
            </div>
            </div>
            <div className='row'>
            <label htmlFor='setPrice'>Set Price Limit  <input onClick={(e) => this.props.handleCheckbox(e)} type='checkbox' name='setPrice' value={this.props.formValues['priceLimit']}/></label>
            <div id='setLimit' style={{display: 'none'}}>
            <input onChange={(e) => this.props.handleChange(e)} type='number' name='priceLimit' min='0.00' step='.01' placeholder='set max price' value={this.props.formValues['priceLimit']}/>
            </div> 
            </div>
            </form>
            <div id='searchItems' className='searchItems'>
            {
            this.props.msg.error ?  
             <div className='alert alert-danger'>
             <span>{this.props.msg.error}</span>
             </div> : ''
            }
            
            {
            this.props.msg.success ?
            <div className='alert alert-success'>
            <span>{this.props.msg.success}</span>
            </div>
            : ''
            }
            
            {
            results.length > 0 ?
            <div className='text-center paginateContainer'>
            <button onClick={(e) => this.props.handlePaginate(e)} className='paginateBtns' id='decrement' type='button'>&#x2039;</button>
            <span> Page: {this.props.offset}  </span>
            <button onClick={(e) => this.props.handlePaginate(e)} className='paginateBtns' id='increment' type='button'>&#x203A;</button>
            </div> : ''
            }
            <div className='col-container'>
            {
            results ?
            results.map((result, index) => {
            return <div className='col' key={index}>
            <h5>{result.name}</h5>
            <img onError={(e) => this.props.handleImgError(e)} src={result.image} alt={result.name}/>
            <p><b>Description:</b> {result.description}</p>
            <p><b>Current price:</b> {result.price}</p>
            <button onClick={(e) => this.props.handleAddItemToWantList(e)} id={result.name} type='button'>&#x1f6cd;</button>
            <hr/>
            </div>
            }) : ''
            }
            </div>
            </div>
            </div>
        )
    }
}