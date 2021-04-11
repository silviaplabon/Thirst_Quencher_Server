const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());

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
  console.log("database connected");
//////////////////////////////////////////////////////Inserting Home page Data///////////////////////////////////////////////////////
app.get('/PopularDrinks', (req, res) => {
  PopularDrinksCollection.find({})
    .toArray((err, products) => {
      res.send(products)
    })
})
app.get('/PopularIngredients', (req, res) => {
  PopularIngredientsCollection.find({})
    .toArray((err, products) => {
      res.send(products)
    })
})
app.get('/LatestDrinks', (req, res) => {
  LatestDrinksCollection.find({})
    .toArray((err, products) => {
      res.send(products)
    })
})
app.get('/RandomIngredients', (req, res) => {
  RandomIngredientsCollection.find({})
    .toArray((err, products) => {
      res.send(products)
    })
})
app.get('/RandomDrinks', (req, res) => {
  RandomDrinksCollection.find({})
    .toArray((err, products) => {
      res.send(products)
    })
})

//delete start

app.delete('/deleteProduct/PopularDrinks/:id',(req,res)=>{
  PopularDrinksCollection.deleteOne({_id: ObjectID(req.params.id) })
  .then(result => {
    console.log(result)
    res.send(result.deletedCount > 0)
  })
})
app.delete('/deleteProduct/PopularIngredients/:id',(req,res)=>{
  PopularIngredientsCollection.deleteOne({_id: ObjectID(req.params.id) })
  .then(result => {
    console.log(result)
    res.send(result.deletedCount > 0)
  })
})
app.delete('/deleteProduct/LatestDrinks/:id',(req,res)=>{
  LatestDrinksCollection.deleteOne({_id: ObjectID(req.params.id) })
  .then(result => {
    console.log(result)
    res.send(result.deletedCount > 0)
  })
})
app.delete('/deleteProduct/RandomIngredients/:id',(req,res)=>{
  RandomIngredientsCollection.deleteOne({_id: ObjectID(req.params.id) })
  .then(result => {
    console.log(result)
    res.send(result.deletedCount > 0)
  })
})
app.delete('/deleteProduct/RandomDrinks/:id',(req,res)=>{
  RandomDrinksCollection.deleteOne({_id: ObjectID(req.params.id) })
  .then(result => {
    console.log(result)
    res.send(result.deletedCount > 0)
  })
})
// delete end


  app.post('/PopularDrink', (req, res) => {
    const newProduct = req.body;
    console.log(newProduct);
    console.log(req.body, "come from client site")
    PopularDrinksCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/PopularIngredient', (req, res) => {
    const newProduct = req.body;
    console.log(req.body, "come from client site")
    PopularIngredientsCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/LatestDrink', (req, res) => {
    const newProduct = req.body;
    console.log(req.body, "come from client sites")
    LatestDrinksCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/RandomIngredient', (req, res) => {
    const newProduct = req.body;
    console.log(req.body, "come from client site")
    RandomIngredientsCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/RandomDrink', (req, res) => {
    const newProduct = req.body;
    console.log(req.body, "come from client site")
    RandomDrinksCollection.insertOne(newProduct)
      .then(result => {
        console.log('inserted count', result.insertedCount);
        res.send(result.insertedCount > 0)
      })
  })

//   app.get('/productsdata', (req, res) => {
//     productCollection.find({})
//       .toArray((err, products) => {
//         res.send(products)
//       })
//   })

//   app.get('/product/:id', (req, res) => {
//     productCollection.find({ _id: ObjectID(req.params.id) })
//       .toArray((err, products) => {
//         res.send(products[0])
//       })
//   })

//   app.post('/addProduct', (req, res) => {
//     const newProduct = req.body;
//     console.log(req.body, "come from client site")
//     productCollection.insertOne(newProduct)
//       .then(result => {
//         console.log('inserted count', result.insertedCount);
//         res.send(result.insertedCount > 0)
//       })
//   })
//   app.post('/addOrder', (req, res) => {
//     const order = req.body;
//     orderCollection.insertOne(order)
//       .then(result => {
//         res.send(result.insertedCount > 0)
//       })
//   })
//   app.delete('/deleteProduct/:id',(req,res)=>{
//     productCollection.deleteOne({_id: ObjectID(req.params.id) })
//     .then(result => {
//       console.log(result)
//       res.send(result.deletedCount > 0)
//     })
//   })


});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})