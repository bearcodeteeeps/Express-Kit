const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const url = require('url');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');

const app = express();

//Load routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// passport config
require('./config/passport')(passport);

const db = require('./config/database');

// Connect to mongoose
mongoose.connect(db.mongoURI)
    .then(() => console.log('MongoDB Connected !'))
    .catch(err => console.log(err));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(methodOverride('_method'))

// Using middleware 
app.use((req, res, next) => {
    console.log(Date.now());
    req.name = 'Avinash';
    next();
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//static files
app.use(express.static(path.join(__dirname, 'public')));

//Index Route
app.get('/', (req, res) => {
    console.log(req.name)
    res.render('index', {
        title: 'welcome'
    });
});





app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about'
    });
});



// Using the routes
app.use('/ideas', ideas);
app.use('/users', users);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});