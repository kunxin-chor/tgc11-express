// including a dependency
const express = require('express');

// create new express app
let app = express();
let x =0;
// A ROUTE
// maps a URL to a JavaScript function
// such that when the URL is accessed
// on the server, the function will execute
app.get('/', function(request, response){
    // we use the response object
    // to send data back to the client (e.g. a browser)
    response.send("Hello world");
})

app.get('/about-us', function(req, res){
    
    res.send('<h1>About Us</h1>')
})

app.get('/our-products', (req,res)=>{
    res.send("<h1>Our Products");
})


app.get('/greetings/:fullname', (req,res)=>{
    let fullname = req.params.fullname;
    res.send("Hi, " + fullname);
})

// Q1: Write a route that maps to the URL /squared/:x
// and send back using the response the number squared.

// Q2: Write a route that can have two number parameters
// with the being sum. Send back using the response the
// sum of the two number parameters.

// starts at the server at port 3000
app.listen(3000, () => {
    console.log("server has started")
})