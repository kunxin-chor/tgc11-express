// SETUP BEGINS
const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const axios = require("axios");

let app = express();
app.set("view engine", "hbs"); // tell express to use hbs as the view engine
app.use(express.static("public")); // tell express where to find static files (css, json,  geojson, image files, js)

wax.on(hbs.handlebars); // for template inheritance
wax.setLayoutPath("./views/layouts"); // tell wax-on where to find the layout file

// !! Enable forms processing
app.use(
  express.urlencoded({
    extended: false
  })
);

const baseURL = "https://petstore.swagger.io/v2";
// SETUP END

// SETUP THE ROUTES

app.get("/pets", async (req, res) => {
  let response = await axios.get(baseURL + "/pet/findByStatus", {
    params: {
      status: "available"
    }
  });
  res.render("show_pets", {
    all_pets: response.data
  });
});

app.get("/pets/create", (req, res) => {
  res.render("add_pet.hbs");
});

app.post("/pets/create", async (req, res) => {
  let petName = req.body.petName;
  let petCategory = req.body.petCategory;

  let newPet = {
    id: Math.floor(Math.random() * 1000000),
    category: {
      id: Math.floor(Math.random() * 1000000),
      name: petCategory
    },
    name: petName,
    photoUrls: ["string"],
    tags: [
      {
        id: 0,
        name: "string"
      }
    ],
    status: "available"
  };

  await axios.post(baseURL + '/pet', newPet);
  res.redirect("/pets")
});

// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
