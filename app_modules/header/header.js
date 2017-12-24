import React from 'react';
import { NavLink } from 'react-router-dom';

module.exports = class Header extends React.Component {
    render() {
        let user = this.props.user;

        return (
            <nav>
            {
                user ? 
            <div>    
            <div className='headerBtns'>
            <NavLink className='navBtn' to='/' exact activeClassName='active'>Home</NavLink>    
            <NavLink className='navBtn' to='/product-search' activeClassName='active'>Search</NavLink>
            <NavLink className='navBtn' to='/want-cart' activeClassName='active'>Cart</NavLink>
            <NavLink className='navBtn' to='/settings' activeClassName='active'>&#x2699;</NavLink>
            <a className='navBtn' href='/logout/user'>&#xe163;</a>
            </div>
            
           <div className='dropDown'>
           <button className='dropDownBtn' onClick={() => this.props.handleDropDownMenu()} type='button'>&#9776;</button>
           <ul className='dropDownContent list-group' id='dropDown' style={{display: 'none'}}>
           <li className='list-group-item'><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
           <li className='list-group-item'><NavLink to='/product-search' activeClassName='active'>Search</NavLink></li>
           <li className='list-group-item'><NavLink to='/want-cart' activeClassName='active'>Cart</NavLink></li>
           <li className='list-group-item'><NavLink to='/settings' activeClassName='active'>&#x2699;</NavLink></li>
           <li className='list-group-item'><a href='/logout/user'>&#xe163;</a></li>
         </ul>
         </div>
         </div>
             :
            <div>
            <div className='headerBtns'>
            <NavLink className='navBtn' to='/' exact activeClassName='active'>Home</NavLink>
            <NavLink className='navBtn' to='/login' activeClassName='active'>Sign in</NavLink>
            <NavLink className='navBtn' to='/register' activeClassName='active'>Sign up</NavLink>
            </div>
            
           <div className='dropDown'>
           <button className='dropDownBtn' onClick={() => this.props.handleDropDownMenu()} type='button'>&#9776;</button>
           <ul className='dropDownContent list-group' id='dropDown' style={{display: 'none'}}>
           <li className='list-group-item'><NavLink to='/' exact activeClassName='active'>Home</NavLink></li>
           <li className='list-group-item'><NavLink to='/login' activeClassName='active'>Sign in</NavLink></li>
           <li className='list-group-item'><NavLink to='/register' activeClassName='active'>Sign up</NavLink></li>
         </ul>
         </div>
         </div>
            }
            </nav>
        )
    }
}
