const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

let app = express();

// SETUP MUST COME BEFORE THE ROUTES
app.set('view engine', 'hbs');
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

app.use(express.static('public'));

// !! Enable forms processing
app.use(express.urlencoded({
    extended: false
}))

// routes will begin here
app.get('/food/add', (req,res)=>{
    res.render('add_food')
})

app.post('/food/add', (req,res)=>{
    res.send("data recieved")
    console.log(req.body);
    // use the square bracket to extract out the form data
    // if its name is not a proper variable
    let foodName = req.body['food-name'];

    let calories = req.body.calories;

    let meal = req.body.meal;

    // let tags;
    // if tags are selected
    // if (req.body.tags) {
    //     // and more than one checked
    //     if (Array.isArray(req.body.tags)) {
    //         tags = req.body.tags;
    //     } else {
    //         // if the user has only checked one checkbox
    //         // we put its value into an array all biy itself
    //         tags = [ req.body.tags ];
    //     }
    // } else {
    //     // ... if no tags are selected;
    //     tags = [];
    // }

    // if req.body.tags is undefined, then default tags
    // to the empty array

    let tags = req.body.tags || [];
    tags = Array.isArray(tags) ? tags : [tags];
    console.log(tags);
})


// WHERE WE START THE SERVER
app.listen(3000, ()=>{
    console.log("server has started")
})