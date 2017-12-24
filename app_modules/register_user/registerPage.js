import React from 'react';
import { NavLink } from 'react-router-dom';

module.exports = class Register extends React.Component {
    render() {
        return (
        <div className='registerForm text-center container'>
        <h1>Register account with BuildACart</h1>
        
        {
            this.props.msg.success ? 
            <div className='alert alert-success col-10'>
            <span>{this.props.msg.success} Please <a style={{color: ' #0000EE'}} href='/login'>sign in</a> to continue</span>
            </div> : ''
        }
        
        {
            this.props.msg.error ?
            <div className='alert alert-danger col-10'>
            <span>{this.props.msg.error}</span>
            </div> : ''
        }
        
        <form onSubmit={(e) => this.props.handleSubmit(e)}>
        <div className='form-group row'>
        <label className='col-2 col-form-label' htmlFor='name'>Name </label>
        <div className='col-10'>
        <input onChange={(e) => this.props.handleChange(e)} type='text' className='form-control' name='name' placeholder='Jon Doe' value={this.props.formValues['name']} required/>
        </div>
        </div>
        
        <div className='form-group row'>
        <label className='col-2 col-form-label' htmlFor='address'>address </label>
        <div className='col-10'>
        <input onChange={(e) => this.props.handleChange(e)} type='text' className='form-control' name='address' placeholder='78 avenue st.' value={this.props.formValues['address']} required/>
        </div>
        </div>
        
        <div className='form-group row'>
        <label className='col-2 col-form-label' htmlFor='email'>Email </label>
        <div className='col-10'>
        <input onChange={(e) => this.props.handleChange(e)} type='text' className='form-control' name='email' placeholder='example@gmail.com' value={this.props.formValues['email']} required/>
        </div>
        </div>
        
        <div className='form-group row'>
        <label className='col-2 col-form-label' htmlFor='password'>Password </label>
        <div className='col-10'>
        <input onChange={(e) => this.props.handleChange(e)} type='password' className='form-control' name='password' placeholder='choose a password' value={this.props.formValues['password']} required/>
        </div>
        </div>
        
        <button type='submit'>Sign up</button>
        <NavLink className='subBtns' to='/login'>Sign in</NavLink>
        </form>
        </div>
        )
    }
}