// SETUP BEGINS
const express = require("express");
const cors = require("cors");
const CommonData = require("./CommonData");
let app = express();

// !! Enable forms processing
app.use(
  express.urlencoded({
    extended: false
  })
);

// !! Enable processing JSON data
app.use(express.json());

// !! Enable CORS
app.use(cors());

// SETUP END
app.get("/api/greetings", (req, res) => {
  // If you send back a JavaScript object, Express will automatically change
  // it into JSON for you!
  res.send({
    message: "Hello world"
});

app.post("/api/sayhello", (req, res) => {
  let fname = req.body.firstName;
  let lname = req.body.lastName;
  res.send({
    message: "Hello there " + fname + " " + lname
  });

  // for registration
  // we focus on the end results of a registration
  // http://www.myapi.com/api/query?searchTerms=IBM&apiKey=1234567
  app.get('api/query',(req,res)=>{
      let searchTerms = req.query.searchTerms;
      let apiKey = req.query.apiKey
      // do my search in Mongo
      // return as JSON
  })

});


// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
