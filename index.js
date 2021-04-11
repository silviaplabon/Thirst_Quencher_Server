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


  // 

app.patch('/update/PopularDrinks/:id',(req,res)=>{
  console.log(req.body.price);
  PopularDrinksCollection.updateOne({_id: ObjectID(req.params.id)},
   {
    $set:{name:req.body.name,imageURL:req.body.imageURL}
   })
   .then (result=>{
      res.send(result.modifiedCount>0)
   })
})


app.patch('/update/PopularIngredients/:id',(req,res)=>{
  console.log(req.body.price);
  PopularIngredientsCollection.updateOne({_id: ObjectID(req.params.id)},
   {
    $set:{name:req.body.name,imageURL:req.body.imageURL}
   })
   .then (result=>{
      res.send(result.modifiedCount>0)
   })
})


app.patch('/update/LatestDrinks/:id',(req,res)=>{
  console.log(req.body.price);
   LatestDrinksCollection.updateOne({_id: ObjectID(req.params.id)},
   {
    $set:{name:req.body.name,imageURL:req.body.imageURL}
   })
   .then (result=>{
      res.send(result.modifiedCount>0)
   })
})


app.patch('/update/RandomDrinks/:id',(req,res)=>{
  console.log(req.body.price);
  RandomDrinksCollection.updateOne({_id: ObjectID(req.params.id)},
   {
    $set:{name:req.body.name,imageURL:req.body.imageURL}
   })
   .then (result=>{
      res.send(result.modifiedCount>0)
   })
})


app.patch('/update/RandomIngredients/:id',(req,res)=>{
  console.log(req.body.price);
   RandomIngredientsCollection.updateOne({_id: ObjectID(req.params.id)},
   {
    $set:{name:req.body.name,imageURL:req.body.imageURL}
   })
   .then (result=>{
      res.send(result.modifiedCount>0)
   })
})


});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})