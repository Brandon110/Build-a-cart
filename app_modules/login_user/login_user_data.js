import React from 'react';
import LoginPage from './loginPage.js';
import axios from 'axios';

module.exports = class AuthUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            formValues: { email: '', password: '' },
            msg: ''
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
        
        let status = '';
        
        const formValues = this.state.formValues;
        
        const sendingData = axios.post('/login/user', {
            formValues
        }).then(response => {
            status = response.data;
            return response.statusText;
        })
        .catch(err => {
           return err; 
        });
        
        sendingData.then(res => {
           if(status === 'invalid email'){
               this.setState({ msg: "Incorrect spelling of email or user doesn't exists." })
           }
           else if(status === 'missing fields'){
               this.setState({ msg: 'Missing feilds. Please fill out both email and password to login.' });
           }
           else if(status === 'incorrect password'){
               this.setState({ msg: 'Incorrect Password.' })
           }
           else {
               this.clearForm(); 
               window.location.replace('/');
           }
        });
    }
    
    clearForm() {
        this.setState({ formValues: { email: '', password: '' } })
    }
    
    render() {
        return <LoginPage
        handleSubmit={this.handleSubmit.bind(this)}
        handleChange={this.handleChange.bind(this)}
        formValues={this.state.formValues}
        msg={this.state.msg}
        />
    }
}