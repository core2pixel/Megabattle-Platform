//General Modules
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const app = express({ strict: true });

//Routers
const pageRouter = require('./routes/pages');
const postRouter = require('./routes/post');
const notificationRouter = require('./routes/notifications');
//Render engine
app.engine( 'handlebars', exphbs( { 
  extname: 'handlebars', 
  defaultLayout: 'main', 
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
} ) );
app.set('view engine', 'handlebars');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Session
app.use(session({
    secret:'megabattle',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Routers
app.use('/', pageRouter);
app.use('/action', postRouter);
app.use('/notification', notificationRouter);

// Errors => page not found 404
app.use((req, res, next) =>  {
    var err = new Error('Page not found');
    res.render('404', {layout: '404', message: 'Эта страница не существует', action: '/home'});
    err.status = 404;
    //next(err);
})

// Handling errors (send them to the client)
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('404', {layout: '404', message: err.message, action: '/home'});
});


const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

