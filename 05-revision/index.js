// SETUP BEGINS
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

let app = express();
app.set('view engine', 'hbs');  // tell express to use hbs as the view engine
app.use(express.static('public')); // tell express where to find static files (css, json,  geojson, image files, js)

wax.on(hbs.handlebars); // for template inheritance
wax.setLayoutPath('./views/layouts'); // tell wax-on where to find the layout file

// !! Enable forms processing
app.use(express.urlencoded({
    extended: false
}))

// SETUP END

// SETUP THE ROUTES

app.get('/', (req,res)=>{
    res.send("Welcome to Sakura Japanese Resturant");
})

// one route to display the form
app.get('/bookings/add', (req, res)=>{
    res.render('add_booking.hbs')
})

// one route to process the form
app.post('/bookings/add', (req,res)=>{
    console.log(req.body);
    res.send("Data recieved");
})




// START SERVER
app.listen(3000, ()=>{
    console.log("Server has started");
})