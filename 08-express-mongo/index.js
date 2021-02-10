const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require('./MongoUtil');

// create an instance of express app
let app = express();

// set the view engine
app.set('view engine', 'hbs');

// static folder
app.use(express.static('public'))

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

// enable forms
app.use(express.urlencoded({
    'extended':false
}));

async function main() {
    let db = await MongoUtil.connect(mongoUrl, 'tgc11_recipes')

    // MongoDB is connected and alive

    app.get('/ingredients/create', (req,res)=>{
        res.render('ingredients/create')
    })

    // Create
    app.post('/ingredients/create', async (req,res)=>{
        await db.collection('recipes').insertOne({
            'name': req.body.ingredientName
        })

        res.send('Ingredient has been added');
    })
}   

main();

app.listen(3000, () => {
  console.log("Server has started");
});
