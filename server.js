const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const MemoryStore = require('session-memory-store')(session);
const mongoose = require('mongoose');
const express = require('express');
const app = express();

mongoose.connection.openUri(process.env.MONGODB_URI || 'mongodb://localhost/users');
mongoose.connection.openUri(process.env.MONGODB_URI || 'mongodb://localhost/want-lists');

app.set('view engine', 'html');
app.engine('html', (path, options, callback) => {
    fs.readFile(path, 'utf-8', callback)
});
app.use(express.static(__dirname));
app.use(express.static('public'));
app.use(cors());
app.use(require('morgan')('combined'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cookie-parser')());
app.use(session({
    name: 'user_sid',
    secret: 'someRandomSecretCat',
    store: new MemoryStore(),
    resave: false,
    saveUninitialized: false
}));
app.use((req, res, next) => {
   if(!req.session.user && req.cookies.user_sid){
       res.clearCookie('user_sid');
   }
   next();
});
 const ensureLoggedIn = (req, res, next) => {
    if(!req.session.user || !req.cookies.user_sid){
        res.redirect('/login');
    }else{
        next();
    }
}

const checkIfLoggedIn = (req, res, next) => {
    if(req.session.user || req.cookies.user_sid){
        res.redirect('/');
    }else {
        next();
    }
}

app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

require('./routes/get_products')(app);
require('./routes/register_user')(app);
require('./routes/login_user')(app);
require('./routes/logoutUser')(app);
require('./routes/set-budget')(app);
require('./routes/wanted-items')(app);
require('./routes/loggedInUser')(app);
require('./routes/account_settings')(app);
require('./routes/update_password')(app);

app.get('/product-search', ensureLoggedIn);
app.get('/login', checkIfLoggedIn);
app.get('/register', checkIfLoggedIn);
app.get('/want-cart', ensureLoggedIn);
app.get('/settings', ensureLoggedIn);

app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000);
