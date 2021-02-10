const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
const mongoClient = require("mongodb").MongoClient;
require('dotenv').config();
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require('./MongoUtil');

let app = express();

async function main() {
    let db = await MongoUtil.connect(mongoUrl, 'tgc11_movie_app')
}   

main();

app.listen(3000, () => {
  console.log("Server has started");
});
