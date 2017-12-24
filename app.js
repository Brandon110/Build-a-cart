import React from 'react';
import ReactDOM from 'react-dom';
import HomePage from './app_modules/homePage/home';
import Header from './app_modules/header/header_data.js';
import RegisterPage from './app_modules/register_user/register_user_data';
import LoginPage from './app_modules/login_user/login_user_data';
import ProductsPage from './app_modules/get_products/get_products_data';
import WantListPage from './app_modules/want-list/want-list-data';
import SettingsPage from './app_modules/settings/settings_data';
import Footer from './app_modules/footer/footer';
import { BrowserRouter, Switch, Route, Link, hashHistory } from 'react-router-dom';
 

ReactDOM.render((
    <BrowserRouter history={hashHistory}>
    <div>
    <Header />
     <Switch>
     <Route exact path='/' component={HomePage}/>
     <Route path='/register' component={RegisterPage}/>
     <Route path='/login' component={LoginPage}/>
     <Route path='/product-search' component={ProductsPage}/>
     <Route path='/want-cart' component={WantListPage}/>
     <Route path='/settings' component={SettingsPage}/>
     </Switch>
     <Footer/>
     </div>
    </BrowserRouter>), document.getElementById('app'));
