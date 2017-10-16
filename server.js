const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//git control
const port = process.env.PORT || 3000; 
//make express app
var app = express();

//let hbs know we want to add support for partials
hbs.registerPartials(__dirname+ '/views/partials');

//set configurations
app.set('view engine', 'hbs');


//middlewear
app.use((req,res,next) => {

    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server');
        }
    });
    next();
});

// app.use((req,res,next) => {
//     res.render('maintanence.hbs');
// });

//add middleware
//helps display localhost:3000/help.html
app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

//set up http route handlers
app.get('/',(req,res) => { // this is a route
    //respond to the req sending some data back
    //res.send('<h1>Hello Express!</h1>');
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website'
    });
});

app.get('/about', (req,res) => {//this is a route
    //let you render any template you have set up
    //second argument passes data  to hbs file
    res.render('about.hbs',{
        pageTitle: 'About Page',
    });
});

//making a new page
app.get('/projects', (req,res) => {

    res.render('projects.hbs', {
        pageTitle: 'Projects'
    });
});

app.get('/bad', (req,res) => {//this is a route
    res.send({
        errorMessage: 'Unable to fullfil this request'
    });
});
//make the app listen
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});