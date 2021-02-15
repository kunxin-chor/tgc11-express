const express = require("express");
const hbs = require("hbs");
const wax = require("wax-on");
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require("./MongoUtil");
const ObjectId = require("mongodb").ObjectId;

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

  async function getIngredientById(ingredientId) {
    let ingredient = await db.collection("ingredients").findOne({
      _id: ObjectId(ingredientId)
    });
    return ingredient;
  }

  // MongoDB is connected and alive

  // Show the form to create the ingredient
  app.get("/ingredients/create", (req, res) => {
    res.render("ingredients/create");
  });

  // Actually process the form to create the ingredient
  app.post("/ingredients/create", async (req, res) => {
    await db.collection("ingredients").insertOne({
      name: req.body.ingredientName
    });

    res.redirect("/ingredients");
  });

  // Show all ingredients in the system
  app.get("/ingredients", async (req, res) => {
    // find all the ingredients
    let ingredients = await db
      .collection("ingredients") //select the ingredients collection
      .find({}) // find all the ingredient with no criteria
      .toArray(); // convert to array

    res.render("ingredients/all", {
      everything: ingredients
    });
  });

  // Delete ingredient from the system
  app.get("/ingredients/:ingredient_id/delete", async (req, res) => {
    let id = req.params.ingredient_id;
    let ingredient = await getIngredientById(ingredient_id);

    // test to ensure it's working
    res.render("ingredients/delete", {
      ingredient: ingredient
    });
  });

  // process is what sent via the form
  app.post("/ingredients/:ingredient_id/delete", async (req, res) => {
    await db.collection("ingredients").remove({
      _id: ObjectId(req.params.ingredient_id)
    });
    res.redirect("/ingredients");
  });

  // update
  app.get("/ingredients/:ingredient_id/update", async (req, res) => {
    // we retrieve the ingredient information
    let ingredient_id = req.params.ingredient_id;
    let ingredient = await getIngredientById(ingredient_id);

    res.render("ingredients/update", {
      ingredient: ingredient
    });
  });

  app.post("/ingredients/:ingredient_id/update", async (req, res) => {
    let newIngredientName = req.body.ingredientName;
    let ingredientId = req.params.ingredient_id;
    db.collection("ingredients").updateOne(
      {
        _id: ObjectId(ingredientId)
      },
      {
        $set: {
          name: newIngredientName
        }
      }
    );

    res.redirect("/ingredients");
  });

  // add a new comment to an ingredient
  app.get("/ingredients/:ingredient_id/comments/create", async (req, res) => {
    let ingredient = await getIngredientById(req.params.ingredient_id);
    res.render("ingredients/add_comments", {
      ingredient: ingredient
    });
  });

  app.post("/ingredients/:ingredient_id/comments/create", async (req, res) => {
    // add the new comment as an ELEMENT in the comments array
    //   let { email, comments} = req.body;
    let email = req.body.email;
    let comments = req.body.comments;
    let ingredientID = req.params.ingredient_id;

    await db.collection("ingredients").updateOne(
      {
        _id: ObjectId(ingredientID)
      },
      {
        $push: {
          comments: {
            _id: ObjectId(), // ask Mongo to generate an ID for us
            email: email,
            comments: comments,
            approved: true
          }
        }
      }
    );
    res.redirect("/ingredients");
  }); // end app.post

  // show comments for an ingredient
  app.get("/ingredients/:ingredient_id/comments", async (req, res) => {
    let ingredient = await getIngredientById(req.params.ingredient_id);
    res.render("ingredients/show", {
      ingredient: ingredient
    });
  }); // end show comments

  app.get(
    "/ingredients/:ingredient_id/comments/:comment_id/delete",
    async (req, res) => {
      await db.collection("ingredients").updateOne(
        {
          _id: ObjectId(req.params.ingredient_id)
        },
        {
          $pull: {
            comments: { _id: ObjectId(req.params.comment_id) }
          }
        }
      );
      //   res.send("comment has been deleted");
      res.redirect(`/ingredients/${req.params.ingredient_id}/comments`);
    }
  );

  app.get(
    "/ingredients/:ingredient_id/comments/:comment_id/update",
    async (req, res) => {
      //   let ingredient = await getIngredientById(req.params.ingredient_id);
      // write a query that only projects the comment that we want
      let document = await db.collection("ingredients").find(
        {
          _id: ObjectId(req.params.ingredient_id),
        
        }
      ).project({
          'comments': {
              '$elemMatch': {
                  '_id': ObjectId(req.params.comment_id)
              }
          }
      }).toArray();
      res.render('ingredients/update_comments', {
          'comment': document[0].comments[0]
      })
    // res.send(document);
    }
  );

  app.post("/ingredients/:ingredient_id/comments/:comment_id/update", async (req,res)=>{
      let email = req.body.email;
      let comments = req.body.comments;
      await db.collection('ingredients').updateOne({
          '_id': ObjectId(req.params.ingredient_id),
          'comments._id':  ObjectId(req.params.comment_id)
      }, {
          '$set': {
              'comments.$.email': email,
              'comments.$.comments': comments
          }
      });

      res.redirect(`/ingredients/${req.params.ingredient_id}/comments`);
  })

  app.get('/comments/censor', async (req,res)=>{
    let results = await db.collection('ingredients').updateMany({
        'comments': {
            '$elemMatch': {
                'approved': false
            }
        }
    }, {
        '$set':{
            'comments.$[c].comments' : '<really really censored>'
        }
    },{
        'arrayFilters':[
            {
                'c.approved': false
            }
        ]
    })
    res.send(results);
    // let comments = await db.collection('ingredients').find({
    //     'comments': {
    //         '$elemMatch': {
    //             'approved': false
    //         }
    //     }
    // }).project({
    //     'comments': {
    //         '$elemMatch': {
    //             'approved': false
    //         }
    //     }
    // }).toArray();
    // res.send(comments);
  })

}

main();

app.listen(3000, () => {
  console.log("Server has started");
});
