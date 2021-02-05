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


// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
