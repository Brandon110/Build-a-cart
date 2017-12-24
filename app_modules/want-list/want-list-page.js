import React from 'react';

module.exports = class WantList extends React.Component {
    render() {
        const wantList = this.props.wantList;
        
        return (
            <div className='container'>
            <div className='form-group'>
            <h1>Want Cart</h1>
            <hr/>
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <input onChange={(e) => this.props.handleChange(e)} type='number' name='budget' min='0.00' step='.01' placeholder={wantList.budget || 'set price limit'} value={this.props.budget}/>
            <button type='submit'>Set</button>
            </form>
            </div>
            <div className='col-container'>
            <p><b>Total:</b> {parseFloat(this.props.total).toFixed(2)}</p>
            <i className='fa fa-cart-arrow-down'>({wantList.items ? wantList.items.length : '0'})</i>
            {
            wantList.items ?
            wantList.items.map((result, index) => {
            return <div className='col' key={index}>
            <button onClick={(e) => this.props.handleRemoveItemToWantList(e)} id={result._id} type='button' className='removeBtn'>&#10006;</button>
            <h5>{result.name}</h5>
            <img className='cartImgs' onError={(e) => this.props.handleImgError(e)} src={result.image} alt={result.name}/>
            <p><b>Description:</b> {result.description}</p>
            <p><b>Current price:</b> {result.price}</p>
            <hr/>
            </div>
            }) : ''
            }
            </div>
            </div>
        )
    }
}