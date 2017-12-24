import React from 'react';
import axios from 'axios';
import ProductsPage from './get_products_page';

module.exports = class ProductsData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                product: '',
                priceLimit: ''
            },
            results: [],
            offset: 1,
            msg: {
                error: '',
                success: ''
            }
        }
    }

    handleChange(e) {
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;

        formValues[name] = value;

        this.setState({ formValues })
    }

    handleSubmit(e) {
        e.preventDefault();

        const formValues = this.state.formValues;

        const sendingData = axios.post('/products/search', {
                search: formValues.product,
            }).then(response => {
                this.clearLastFormData();
        
                if (response.data === 'no products') {
                    this.setState({ msg: { error: 'No products matching your search!' } });
                }
                else {
                    this.handleFetchData();
                }
                return response.statusText;
            })
            .catch(err => {
                return err;
            });
    }

    handleCheckbox(e) {
        const priceLimit = document.getElementById('setLimit');

        e.target.checked ? priceLimit.style.display = 'block' : priceLimit.style.display = 'none';
    }

    handleFetchData() {
        const formValues = this.state.formValues;
        const results = [];

        axios.get('/search/results/' + formValues.product + '?priceLimit=' + formValues.priceLimit + '&offset=' + this.state.offset)
            .then(function(response) {
                this.setState({ results: response.data });
            }.bind(this))
            .catch(err => {
                return err;
            });
    }

    handlePaginate(e) {
        if (e.target.id === 'increment') {
            this.setState({ offset: this.state.offset + 1 }, () => {
                this.handleFetchData();
            })
        }
        else if (e.target.id === 'decrement' && this.state.offset > 1) {
            this.setState({ offset: this.state.offset - 1 }, () => {
                this.handleFetchData();
            });
        }
    }

    handleImgError(e) {
        e.target.src = 'http://shashgrewal.com/wp-content/uploads/2015/05/default-placeholder-300x300.png';
    }

    handleAddItemToWantList(e) {
        let status = '';

        this.state.results.forEach(result => {
            if (e.target.id === result.name) {
                const sendingData = axios.post('/want-list/add-item', {
                        result,
                    }).then(function(response) {
                        status = response.data;
                        return response.statusText;
                    })
                    .catch(err => {
                        return err;
                    });

                sendingData.then(res => {
                    if (status === 'not logged in') {
                        window.location.href = '/login';
                    }
                    else if (status === 'over budget') {
                        this.setState({ msg: { error: "Gone over your budget! This item can't be added to your want list!" } })
                    }
                    else if (status === 'success') {
                        this.setState({ msg: { success: 'Successfully added item to cart!' } });
                    }
                });
            }
        });
    }
    
    clearLastFormData() {
        this.setState({ msg: { success: '', error: '' }, offset: 1 })
    }

    render() {
        return <ProductsPage 
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        formValues={this.state.formValues}
        handleCheckbox={this.handleCheckbox.bind(this)}
        results={this.state.results}
        handleImgError={this.handleImgError.bind(this)}
        handlePaginate={this.handlePaginate.bind(this)}
        handleAddItemToWantList={this.handleAddItemToWantList.bind(this)}
        msg={this.state.msg}
        offset={this.state.offset}
        />
    }
}
