import React from 'react';
import WantListPage from './want-list-page.js';
import Header from '../header/header_data.js';
import axios from 'axios';

module.exports = class WantListData extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            budget: '',
            wantList: [],
            total: 0
        }
    }
    
    componentDidMount() {
        this.handleWantListData();
    }
    
    handleChange(e) {
        e.preventDefault();
        
       this.setState({ budget: e.target.value })
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
      const sendingData = axios.post('/set-budget', {
            budget: this.state.budget
        }).then(function(response){
            return response.statusText;
        })
        .catch(err => {
            return err;
        });
    }
    
    handleWantListData() {
      let total = 0;
        
      axios.get('/want-list/items')
        .then(function(response) {
            response.data.items.forEach(result => {
              total += result.price
            });
            
            this.setState({ total: total });
            this.setState({ wantList: response.data })
        }.bind(this))
        .catch(err => {
            return err;
        });
 
    }
    
    handleRemoveItemToWantList(e) {
        this.state.wantList.items.forEach(result => {
           if(e.target.id === result._id) {
        const sendingData = axios.post('/want-list/remove-item', {
                    result
               }).then(function(response) {
                   return response.statusText;
               })
               .catch(err => {
                  return err; 
               });
               
               sendingData.then(res => {
                  this.handleWantListData();
               });
           } 
        });
    }
    
    render() {
        return <WantListPage 
        handleSubmit={this.handleSubmit.bind(this)}
        handleChange={this.handleChange.bind(this)}
        budget={this.state.budget}
        wantList={this.state.wantList}
        handleRemoveItemToWantList={this.handleRemoveItemToWantList.bind(this)}
        total={this.state.total}
        />
    }
}