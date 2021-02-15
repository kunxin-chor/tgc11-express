// SETUP BEGINS
const express = require("express");
const cors = require('cors');
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
app.get('/api/greetings',(req, res)=>{
    a.b();
    // If you send back a JavaScript object, Express will automatically change
    // it into JSON for you!
    res.send({
        'message':'Hello world'
    })
})

app.post('/api/sayhello', (req,res)=>{
    let fname = req.body.firstName;
    let lname = req.body.lastName;
    res.send({
        'message':"Hello there " + fname + " " + lname
    })
})

// START SERVER
app.listen(3000, () => {
  console.log("Server has started");
});
