const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());

const admin = require('firebase-admin');


var serviceAccount = require("./.configs/cocktail-collection-firebase-adminsdk-1hj34-6483748cb4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${process.env.DB_NAME}.firebaseio.com`
});

const port = process.env.PORT || 4200;
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcsxh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const PopularDrinksCollection = client.db('Cocktail_collection').collection("PopularDrinks");
  const PopularIngredientsCollection = client.db('Cocktail_collection').collection("PopularIngredients");
  const LatestDrinksCollection = client.db('Cocktail_collection').collection("LatestDrinks");
  const RandomIngredientsCollection = client.db('Cocktail_collection').collection("RandomIngredients");
  const RandomDrinksCollection = client.db('Cocktail_collection').collection("RandomDrinks");
  const AllDrinksCollection = client.db('Cocktail_collection').collection("AllDrinks");
  const GlassListCollection = client.db('Cocktail_collection').collection("GlassList");
  const CategoryListCollection = client.db('Cocktail_collection').collection("CategoryList");
  const IngredientListCollection = client.db('Cocktail_collection').collection("IngredientList");
  const IngredientsListCollection = client.db('Cocktail_collection').collection("IngredientsList");
  const SingleOrderCollection = client.db('Cocktail_collection').collection("SingleOrder");
  const OrdersCollection = client.db('Cocktail_collection').collection("OrdersCollection");
  const AdminsCollection = client.db('Cocktail_collection').collection("AdminsCollection");
  const TestimonialsCollection = client.db('Cocktail_collection').collection("TestimonialsCollection");
  const MessageCollection = client.db('Cocktail_collection').collection("MessageCollection");
  console.log("database connected");
  //////////////////////////////////////////////////////Inserting Home page Data///////////////////////////////////////////////////////
  app.get('/productdata/PopularDrinks', (req, res) => {
    PopularDrinksCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/productdata/PopularIngredients', (req, res) => {
    PopularIngredientsCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/productdata/LatestDrinks', (req, res) => {
    LatestDrinksCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/productdata/RandomIngredients', (req, res) => {
    RandomIngredientsCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/productdata/RandomDrinks', (req, res) => {
    RandomDrinksCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  ////////////////////////////////////////////////////////////////END: Homepage Data/////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////////////////Start: Delete HomePage Data///////////////////////////////////////////////////////

  app.delete('/deleteProduct/PopularDrinks/:id', (req, res) => {
    PopularDrinksCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        console.log(result)
        res.send(result.deletedCount > 0)
      })
  })
  app.delete('/deleteProduct/PopularIngredients/:id', (req, res) => {
    PopularIngredientsCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        console.log(result)
        res.send(result.deletedCount > 0)
      })
  })
  app.delete('/deleteProduct/LatestDrinks/:id', (req, res) => {
    LatestDrinksCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        console.log(result)
        res.send(result.deletedCount > 0)
      })
  })
  app.delete('/deleteProduct/RandomIngredients/:id', (req, res) => {
    RandomIngredientsCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        console.log(result)
        res.send(result.deletedCount > 0)
      })
  })
  app.delete('/deleteProduct/RandomDrinks/:id', (req, res) => {
    RandomDrinksCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        console.log(result)
        res.send(result.deletedCount > 0)
      })
  })
  ///////////////////////////////////////////////////////////////END: Delete HomePage Data///////////////////////////////////////////

  ///////////////////////////////////////////////////////////////Start: Add HomePage Data///////////////////////////////////////////

  app.post('/adddata/PopularDrink', (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    console.log(req.body, "come from client site")
    PopularDrinksCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/addata/PopularIngredient', (req, res) => {
    const newProduct = req.body;
    console.log(req.body, "come from client site")
    PopularIngredientsCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/adddata/LatestDrink', (req, res) => {
    const newProduct = req.body;
    console.log(req.body, "come from client sites")
    LatestDrinksCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/adddata/RandomIngredient', (req, res) => {
    const newProduct = req.body;
    console.log(req.body, "come from client site")
    RandomIngredientsCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/adddata/RandomDrink', (req, res) => {
    const newProduct = req.body;
    console.log(req.body, "come from client site")
    RandomDrinksCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  ///////////////////////////////////////////////////////////////END: ADD Homepage Data///////////////////////////////////////////
  // app.post('/addDrinksCollection', (req, res) => {
  //   const newProduct = req.body;
  //   console.log(req.body, "come from client site")
  //   AllDrinksCollection.insertOne(newProduct)
  //     .then(result => {
  //       console.log('inserted count', result.insertedCount);
  //       res.send(result.insertedCount > 0)
  //     })
  // })





  ///////////////////////////////////////////////////////////////Start: HomePage Data By ID///////////////////////////////////////////
  app.get('/product/PopularDrinks/:id', (req, res) => {
    PopularDrinksCollection.find({ _id: ObjectID(req.params.id) })
      .toArray((err, products) => {
        res.send(products[0])
      })
  })
  app.get('/product/PopularIngredients/:id', (req, res) => {
    PopularIngredientsCollection.find({ _id: ObjectID(req.params.id) })
      .toArray((err, products) => {
        res.send(products[0])
      })
  })
  app.get('/product/LatestDrinks/:id', (req, res) => {
    LatestDrinksCollection.find({ _id: ObjectID(req.params.id) })
      .toArray((err, products) => {
        res.send(products[0])
      })
  })
  app.get('/product/RandomIngredients/:id', (req, res) => {
    RandomIngredientsCollection.find({ _id: ObjectID(req.params.id) })
      .toArray((err, products) => {
        res.send(products[0])
      })
  })
  app.get('/product/RandomDrinks/:id', (req, res) => {
    RandomDrinksCollection.find({ _id: ObjectID(req.params.id) })
      .toArray((err, products) => {
        res.send(products[0])
      })
  })
  ///////////////////////////////////////////////////////////////END HomePage Data By Id///////////////////////////////////////////

  // 

  app.patch('/update/PopularDrinks/:id', (req, res) => {
    PopularDrinksCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
        console.log(result);
      })
  })


  app.patch('/update/PopularIngredients/:id', (req, res) => {
    PopularIngredientsCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
        console.log(result);
      })
  })


  app.patch('/update/LatestDrinks/:id', (req, res) => {
    LatestDrinksCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
        console.log(result);
      })
  })


  app.patch('/update/RandomDrinks/:id', (req, res) => {
    RandomDrinksCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
        console.log(result);
      })
  })


  app.patch('/update/RandomIngredients/:id', (req, res) => {
    RandomIngredientsCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
        console.log(result);
      })
  })
  app.get('/allDrinksCollectionShow', (req, res) => {
    AllDrinksCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  // app.get('/drinksByName/:name', (req, res) => {
  //   AllDrinksCollection.find({"strDrink":req.params.name})
  //     .toArray((err, products) => {
  //       console.log(products,"products")
  //       res.send(products)
  //     })
  // })
  //////////////////////////////////////////////////Start Listing category or Glass List///////////////////////////////////
  // app.post('/categoryList', (req, res) => {
  //   const newGlass = req.body;
  //   console.log(req.body, "come from client sites")
  //   CategoryListCollection.insertOne(newGlass)
  //     .then(result => {
  //       console.log('inserted count', result.insertedCount);
  //       res.send(result.insertedCount > 0)
  //     })
  // })
  //   app.post('/filter/ingredientsList', (req, res) => {
  //   const newGlass = req.body;
  //   console.log(req.body, "come from client sites")
  //   IngredientsListCollection.insertOne(newGlass)
  //     .then(result => {
  //       console.log('inserted count', result.insertedCount);
  //       res.send(result.insertedCount > 0)
  //     })
  // })
  //////////////////////////////////////////////////END Listing category or Glass List///////////////////////////////////
  app.get('/drinkDetailByName/:name', (req, res) => {
    AllDrinksCollection.findOne({ "strDrink": req.params.name })
      .then(result => {
        res.send(result)
      })
  })
  app.get('/drinkDetailById/:id', (req, res) => {
    console.log(req.params.id)
    AllDrinksCollection.findOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        console.log(result.length);
        res.send(result)
      })
  })
  ////////////////////////////////////////////////Start Filter Section/////////////////////////////////////////////////////
  app.get('/filter/Alcoholic', (req, res) => {
    AllDrinksCollection.find({ "strAlcoholic": "Alcoholic" })
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/filter/NonAlcoholic', (req, res) => {
    AllDrinksCollection.find({ "strAlcoholic": "Non alcoholic" })
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/filter/OptionalAlcoholic', (req, res) => {
    AllDrinksCollection.find({ "strAlcoholic": "Optional alcohol" })
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/filter/glassListShow', (req, res) => {
    GlassListCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/filter/CategoryListShow', (req, res) => {
    CategoryListCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/GlassDataByName/:name', (req, res) => {
    AllDrinksCollection.find({ "strGlass": req.params.name })
      .toArray((err, products) => {
        res.send(products)
      })
  })

  app.get('/CategoryDataByName/:name', (req, res) => {
    AllDrinksCollection.find({ "strCategory": req.params.name })
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/ingredientDrinksByName/:name', (req, res) => {
    const name = req.params.name;
    AllDrinksCollection.find({
      $or: [{ "strIngredient1": name }, { "strIngredient2": name }, { "strIngredient3": name }, { "strIngredient4": name }
        , { "strIngredient5": name }, { "strIngredient6": name }, { "strIngredient7": name }, { "strIngredient8": name }, { "strIngredient9": name }, { "strIngredient10": name }]
    })
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/similarDrink/:glass/:category/:alcoholic', (req, res) => {
    const name = req.params.name;
    AllDrinksCollection.find({ $and: [{ strGlass: req.params.glass }, { strCategory: req.params.category }, { strAlcoholic: req.params.alcoholic }] })
      .toArray((err, products) => {
        res.send(products)
      })
  })



  app.get('/ingredientsListCollection', (req, res) => {
    IngredientsListCollection.find({})
      .toArray((err, products) => {
        res.send(products)
      })
  })
  app.get('/ingredientByName/:name', (req, res) => {
    IngredientsListCollection.findOne({ "strIngredient": req.params.name })
      .then(result => {
        res.send(result)
      })
  })
  app.get('/ingredientById/:id', (req, res) => {
    IngredientsListCollection.findOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result)
      })
  })
  //   app.post('/filter/ingredientList', (req, res) => {
  //   const newProduct = req.body;
  //   console.log(req.body, "come from client site")
  //   IngredientListCollection.insertOne(newProduct)
  //     .then(result => {
  //       console.log('inserted count', result.insertedCount);
  //       res.send(result.insertedCount > 0)
  //     })
  // })


  app.delete('/deleteGlass/:id', (req, res) => {
    AllDrinksCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
  app.patch('/updateDrinksPrice/:id', (req, res) => {
    AllDrinksCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { price: req.body.price }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })

  ///////////////////////////////////////////////////////////////order section/////////////////////////////////////////////////////
  app.post('/AddSingleOrder', (req, res) => {
    const newOrder = req.body;
    console.log(req.body, "come from client sites")
    SingleOrderCollection.insertOne(newOrder)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.get('/SingleOrderDataShow/:idDrink', (req, res) => {
    SingleOrderCollection.findOne({ "idDrink": req.params.idDrink })
      .then(result => {
        res.send(result)
      })
  })
  // app.get('/orderProductFindingFromDB/:idDrink/:strDrink', (req, res) => {
  //   const name = req.params.name;
  //   const id = req.params.id;
  //   AllDrinksCollection.findOne({ $or: [{"strDrink": req.params.name }, { "idDrink": req.params.id }] })
  //     .then(result => {
  //       console.log(result)
  //       res.send(result)

  //     })
  // })
  app.patch('/updateNewPriceAndQuantity/:id', (req, res) => {
    console.log(req.body)
    SingleOrderCollection.updateOne({ _id: ObjectID(req.params.id) },

      {
        $set: { price: req.body.price, quantity: req.body.quantity }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
        console.log(result);
      })
  })
  app.get('/SingleOrderUser/orderLength', (req, res) => {
    SingleOrderCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        console.log(documents.length)
        res.send(documents);

      })
  })
  app.get('/Order/userCollection', (req, res) => {
    OrdersCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        console.log(documents.length)
        res.send(documents);
      })
  })



  app.get('/user/singleOrderCollection', (req, res) => {
    const bearer = req.headers.authorization;
    if (bearer && bearer.startsWith('Bearer')) {
      const idToken = bearer.split(' ')[1];//extracting second part
      admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {
          let tokenEmail = decodedToken.email;
          let queryEmail = req.query.email;
          console.log(tokenEmail, queryEmail)
          if (tokenEmail == queryEmail) {
            SingleOrderCollection.find({ email: req.query.email })
              .toArray((err, documents) => {
                console.log(documents.length)
                res.send(documents);
              })
          }
          else {
            res.send("unauthorized access");
          }
        })
        .catch((error) => {
          console.log('error', error)
        })

    }
  })
  app.delete('/deleteSingleOrder/:id', (req, res) => {
    SingleOrderCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
  app.post('/user/ShipmentAndPayment', (req, res) => {
    const newBook = req.body;
    console.log(req.body, "come from client site")
    OrdersCollection.insertOne(newBook)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  // app.get('/searchDrinksByName/:name', (req, res) => {
  //   console.log(req.params.name)
  //   const pattern=req.params.name;
  //   AllDrinksCollection.find({"strDrink":pattern})
  //     .toArray((err, documents) => {
  //       res.send(documents);
  //     })
  // })
  //Admin Maker start
  app.get('/userIsAdmin', (req, res) => {
    AdminsCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents.length > 0);
      })
  });
  app.post('/adminMaker', (req, res) => {
    const newAdmin = req.body;
    console.log(req.body, "come from client site")
    AdminsCollection.insertOne(newAdmin)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  //AdminMaker end
  app.delete('/deleteSingleOrder', (req, res) => {
    SingleOrderCollection.deleteMany({ email: req.query.email })
    .then(result => {
      res.send(result.deletedCount > 0)
    })
     
  })

  app.delete('/deleteUserCollection', (req, res) => {
    OrdersCollection.deleteMany({  $and: [{ email: req.query.email }, { type:"Instant Drink"}]})
    .then(result => {
      res.send(result.deletedCount > 0)
    }) 
  })
  app.post('/addMessage', (req, res) => {
    const newMessage = req.body;
    console.log(req.body, "come from client site")
    MessageCollection.insertOne(newMessage)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/addTestimonial', (req, res) => {
    const newtestimonial = req.body;
    console.log(req.body, "come from client site")
    TestimonialsCollection.insertOne(newtestimonial)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.get('/testimonialsData', (req, res) => {
    TestimonialsCollection.find({})
      .toArray((err, services) => {
        res.send(services)
      })
  })





});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})