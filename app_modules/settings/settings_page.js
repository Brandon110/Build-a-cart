import React from 'react';

module.exports = class SettingsPage extends React.Component {
    render() {
        return (
            <div className='container'>
            <h1 style={{textAlign: 'left'}}>Update Account Settings</h1>
            
             {
                this.props.formOneMsg.error ? 
                <div className='alert alert-danger col-10'>
                <span>{this.props.formOneMsg.error}</span>
                </div> : ''
             }
             
            {
                this.props.formOneMsg.success ? 
                <div className='alert alert-success col-10'>
                <span>{this.props.formOneMsg.success}</span>
                </div> : ''
             }
  
            <form onSubmit={(e) => this.props.handleFormOneSubmit(e)}>
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='address'>Address </label>
            <div className='col-10'>
            <input onChange={(e) => this.props.handleFormOneChange(e)} type='text' className='form-control' name='address' placeholder='78 avenue st.' value={this.props.formOneValues['address']}/>
            </div>
            </div>
            
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='city'>City </label>
            <div className='col-10'>
            <input onChange={(e) => this.props.handleFormOneChange(e)} type='text' className='form-control' name='city' placeholder='Saint John, nb' value={this.props.formOneValues['city']}/>
            </div>
            </div>
            
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='state'>State </label>
            <div className='col-10'>
            <input onChange={(e) => this.props.handleFormOneChange(e)} type='text' className='form-control' name='state' placeholder='California, San Diego' value={this.props.formOneValues['state']}/>
            </div>
            </div>
            
            <button type='submit' className='btn btn-primary'>Update</button>
            </form>
            
            <h1 style={{textAlign: 'left'}}>Change Password</h1>
            
            {
                this.props.formTwoMsg.success ? 
                <div className='alert alert-success col-10'>
                <span>{this.props.formTwoMsg.success}</span>
                </div> : ''
            }

             
            <form onSubmit={(e) => this.props.handleFormTwoSubmit(e)}>
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='currentPass'>Current Password </label>
            <div className='col-10'>
            {
                this.props.formTwoMsg.error ? 
                <div className='alert alert-danger'>
                <span>{this.props.formTwoMsg.error}</span>
                </div> : ''
            }
            <input onChange={(e) => this.props.handleFormTwoChange(e)} name='currentPass' type='password' className='form-control' placeholder='Your current password' value={this.props.formTwoValues['currentPass']}/>
            </div>
            </div>
            
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='newPass'>New Password </label>
            <div className='col-10'>
            <input onChange={(e) => this.props.handleFormTwoChange(e)} name='newPass' type='password' className='form-control' placeholder='Type new password' value={this.props.formTwoValues['newPass']}/>
            </div>
            </div>
            
            <button type='submit' className='btn btn-primary'>Change</button>
            </form>
            </div>
        )
    }
}