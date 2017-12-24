import React from 'react';
import SettingsPage from './settings_page.js';
import axios from 'axios';

module.exports = class SettingsData extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formOneValues: { address: '', city: '', state: '' },
            formTwoValues: { currentPass: '', newPass: '' },
            formOneMsg: { success: '', error: '' }, 
            formTwoMsg: { success: '', error: '' }
        }
    }

    componentDidMount() {
        this.handleFetchSettingsData();
    }

    handleFormOneChange(e) {
        e.preventDefault();

        let formOneValues = this.state.formOneValues;
        let name = e.target.name;
        let value = e.target.value;

        formOneValues[name] = value;

        this.setState({ formOneValues });
    }

    handleFormOneSubmit(e) {
        e.preventDefault();

        let formOneValues = this.state.formOneValues;
        let status = '';

        const sendingData = axios.post('/update/account/settings', {
                formOneValues
            }).then(function(response) {
                status = response.data;
                return response.statusText;
            })
            .catch(err => {
                return err;
            });

        sendingData.then(res => {
            if (status === 'success') {
                this.setState({ formOneMsg: { success: 'Successfully updated account settings!' } });
            }
            else if (status === 'error') {
               this.setState({ formOneMsg: { error: 'Oops, something went wrong! error updating settings!' } });
            }
        });
    }

    handleFetchSettingsData() {
        axios.get('/account/settings').then(function(response) {
                this.setState({
                    formOneValues: {
                        address: response.data.address,
                        city: response.data.city,
                        state: response.data.state
                    }
                })
            }.bind(this))
            .catch(err => {
                return err;
            });
    }

    handleFormTwoChange(e) {
        e.preventDefault();

        let formTwoValues = this.state.formTwoValues;
        let name = e.target.name;
        let value = e.target.value;

        formTwoValues[name] = value;

        this.setState({ formTwoValues });
    }

    handleFormTwoSubmit(e) {
        e.preventDefault();

        let formTwoValues = this.state.formTwoValues;
        let status = '';
        
       const sendingData = axios.post('/change/password', {
                formTwoValues
            }).then(function(response) {
                status = response.data;
                return response.statusText;
            })
            .catch(err => {
                return err;
            });
            
            sendingData.then(res => {
               this.clearFormTwo(); 
               
               if(status === 'success') {
                   this.setState({ formTwoMsg: { success: 'Successfully chanegd password!' } });
               }
               else if(status === 'incorrect password') {
                   this.setState({ formTwoMsg: { error: 'Password does not match current password.' } });
               }
            });
    }

  clearFormTwo() {
      this.setState({ formTwoValues: { currentPass: '', newPass: '' } });
  }

    render() {
        return <SettingsPage 
        handleFormOneChange={this.handleFormOneChange.bind(this)}
        handleFormOneSubmit={this.handleFormOneSubmit.bind(this)}
        formOneValues={this.state.formOneValues}
        handleFormTwoChange={this.handleFormTwoChange.bind(this)}
        handleFormTwoSubmit={this.handleFormTwoSubmit.bind(this)}
        formTwoValues={this.state.formTwoValues}
        formOneMsg={this.state.formOneMsg}
        formTwoMsg={this.state.formTwoMsg}
        />
    }
}
