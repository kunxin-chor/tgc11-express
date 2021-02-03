const express = require('express');

// setup hbs (bring hbs into our app)
const hbs = require('hbs');

let app = express();

// tell Express we are using hbs as our template engine
app.set('view engine', 'hbs');

// tell Express where to find static files
app.use(express.static('public'))


// SETUP ENDS HERE ////////////////////////

app.get('/', (req, res)=>{
    // Q4: add a CSS file that will change the
    // background color of the page to the purple
    // and a JavaScript file that will use the alert()
    // function to show "woof woof";
   res.render('index.hbs')
    
})

app.get('/greeting/:name', (req,res)=>{
    let fullname = req.params.name;
    res.render('welcome.hbs', {
        'fullname': fullname
    })
})

// Q3: Use Math.random() to generate a number
// between 1 to 1000, and send it to a view
// file named lucky.hbs and inform the user
// that is their lucky number. The url can be /lucky
app.get('/lucky', (req,res)=>{
    let luckyNumber = Math.floor(Math.random() * 1000);
    res.render('lucky/lucky.hbs', {
        'luckyNumber' : luckyNumber
    })
})


app.listen(3000, ()=>{
    console.log("Server started")
})