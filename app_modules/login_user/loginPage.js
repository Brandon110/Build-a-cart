import React from 'react';
import { NavLink } from 'react-router-dom';

module.exports = class Login extends React.Component {
    render() {
        return (
            <div className='loginForm container text-center'>
            <h1>Sign in</h1>
           
           {
           this.props.msg ? 
           <div className='alert alert-danger col-10'>
           <span>{this.props.msg}</span>
           </div> : ''
           }
           
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='email'>Email </label>
            <div className='col-10'>
            <input onChange={(e) => this.props.handleChange(e)} type='text' ref={(el) =>  this.emailRef = el} className='form-control' name='email' placeholder='your email' value={this.props.formValues['email']} required/>
            </div>
            </div>
             
            <div className='form-group row'>
            <label className='col-2 col-form-label' htmlFor='password'>Password </label>
            <div className='col-10'>
            <input onChange={(e) => this.props.handleChange(e)} type='password' className='form-control' name='password' placeholder='your password' value={this.props.formValues['password']} required/>
            </div>
            </div>
            
            <button type='submit'>Sign in</button>
  
            <NavLink className='subBtns' to='/register'>Sign up</NavLink>
            </form>
            </div>
            
        )
    }
}