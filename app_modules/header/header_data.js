import React from 'react';
import Header from './header.js';
import axios from 'axios';
 
module.exports = class HeaderData extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: '',
        }
    }
    
    componentDidMount() {
        this.handleFetchUserData();
    }
    
    handleFetchUserData() {
        axios.get('/authed/user').then(function(response) {
            this.setState({ user: response.data });
        }.bind(this))
        .catch(err => {
           return err; 
        });
    }
    
    handleDropDownMenu() {
        const dropDown = document.getElementById('dropDown');
        
        dropDown.style.display === 'none' ? dropDown.style.display = 'block' : dropDown.style.display = 'none';
    }
    
    render() {
        return <Header
        user={this.state.user}
        handleDropDownMenu={this.handleDropDownMenu.bind(this)}
        />
    }
}