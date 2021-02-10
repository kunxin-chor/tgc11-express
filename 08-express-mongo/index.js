const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require("./MongoUtil");

// create an instance of express app
let app = express();

// set the view engine
app.set("view engine", "hbs");

// static folder
app.use(express.static("public"));

// setup wax-on
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

// enable forms
app.use(
  express.urlencoded({
    extended: false
  })
);

async function main() {
  let db = await MongoUtil.connect(mongoUrl, "tgc11_recipes");

  // MongoDB is connected and alive

  app.get("/ingredients/create", (req, res) => {
    res.render("ingredients/create");
  });

  // Create ingredient
  app.post("/ingredients/create", async (req, res) => {
    await db.collection("ingredients").insertOne({
      name: req.body.ingredientName
    });

    res.send("Ingredient has been added");
  });

  // Create recipes
  app.get("/recipes/create", async (req, res) => {
    let allIngredients = await db
      .collection("ingredients")
      .find()
      .toArray();
    res.render("recipes/create", {
      allIngredients: allIngredients,
      ratings: [1, 2, 3, 4, 5]
    });
  });

  app.post('/recipes/create', async (req, res)=>{
      res.send(req.body);
  })
}

main();

app.listen(3000, () => {
  console.log("Server has started");
});
