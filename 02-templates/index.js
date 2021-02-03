const express = require('express');

// setup hbs (bring hbs into our app)
const hbs = require('hbs');

let app = express();

// tell Express we are using hbs as our template engine
app.set('view engine', 'hbs');

app.get('/', (req, res)=>{
   res.render('index.hbs')
    
})

app.get('/greeting/:name', (req,res)=>{
    let fullname = req.params.name;
    res.render('welcome.hbs', {
        'fullname': fullname
    })
})

app.listen(3000, ()=>{
    console.log("Server started")
})