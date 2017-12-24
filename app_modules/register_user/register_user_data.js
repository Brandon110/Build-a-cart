import React from 'react';
import RegisterPage from './registerPage.js';
import axios from 'axios';

module.exports = class RegisterData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
           formValues: { name: '', address: '', email: '', password: '' },
           msg: { success: '', error: '' }
        }
    }
    
    handleChange(e) {
        e.preventDefault();
        let formValues = this.state.formValues;
        let name = e.target.name;
        let value = e.target.value;
        
        formValues[name] = value;
        
        this.setState({formValues})
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let status = '';
        
        const formValues = this.state.formValues;
 
        const sendingData = axios.post('/register/user', {
                formValues
            }).then(response => {
                status = response.data;
                return response.statusText;
            })
            .catch(err => {
                return err;
            });

        sendingData.then(res => {
            if(status === 'user exists'){
                this.setState({ msg: { error: 'This email is already in use by another account' } });
                this.clearForm();
            }
            else if(status === 'empty fields'){
                this.setState({ msg: { error: 'Please fill out all feilds, All feilds are required to sign up' } });
            }
            else if(status === 'invalid email'){
                this.setState({ msg: { error: "This doesn't look like a valid email." } });
                this.clearForm();
            }
            else {
                this.setState({ msg: { success: 'You have successfully registered an account!' } });
                this.clearForm();
            }
        });
    }

    clearForm() {
        this.setState({formValues: {name: '', address: '', email: '', password: '' }});
    }

    render() {
        return <RegisterPage
        handleChange={this.handleChange.bind(this)}
        formValues={this.state.formValues}
        handleSubmit={this.handleSubmit.bind(this)}
        msg={this.state.msg}
        />
    }
}
