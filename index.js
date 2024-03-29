const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
app.use(cors());
app.use(bodyParser.json());

const admin = require('firebase-admin');


var serviceAccount = require("./.configs/thirst-quencher-firebase-adminsdk-1ym2d-6696119f68.json");

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
        res.send(result.deletedCount > 0)
      })
  })
  app.delete('/deleteProduct/PopularIngredients/:id', (req, res) => {
    PopularIngredientsCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
  app.delete('/deleteProduct/LatestDrinks/:id', (req, res) => {
    LatestDrinksCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {

        res.send(result.deletedCount > 0)
      })
  })
  app.delete('/deleteProduct/RandomIngredients/:id', (req, res) => {
    RandomIngredientsCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
  app.delete('/deleteProduct/RandomDrinks/:id', (req, res) => {
    RandomDrinksCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
  ///////////////////////////////////////////////////////////////END: Delete HomePage Data///////////////////////////////////////////

  ///////////////////////////////////////////////////////////////Start: Add HomePage Data///////////////////////////////////////////

  app.post('/adddata/PopularDrink', (req, res) => {
    const newProduct = req.body;
    PopularDrinksCollection.insertOne(newProduct)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/addata/PopularIngredient', (req, res) => {
    const newProduct = req.body;
    PopularIngredientsCollection.insertOne(newProduct)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/adddata/LatestDrink', (req, res) => {
    const newProduct = req.body;
    LatestDrinksCollection.insertOne(newProduct)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/adddata/RandomIngredient', (req, res) => {
    const newProduct = req.body;
    RandomIngredientsCollection.insertOne(newProduct)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  app.post('/adddata/RandomDrink', (req, res) => {
    const newProduct = req.body;
    RandomDrinksCollection.insertOne(newProduct)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  ///////////////////////////////////////////////////////////////END: ADD Homepage Data///////////////////////////////////////////
  app.post('/addDrinksCollection', (req, res) => {
    const newProduct = req.body;
    AllDrinksCollection.insertOne(newProduct)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })





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
      })
  })


  app.patch('/update/PopularIngredients/:id', (req, res) => {
    PopularIngredientsCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/update/LatestDrinks/:id', (req, res) => {
    LatestDrinksCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/update/RandomDrinks/:id', (req, res) => {
    RandomDrinksCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.patch('/update/RandomIngredients/:id', (req, res) => {
    RandomIngredientsCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { name: req.body.name, imageURL: req.body.imageURL }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
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
  //       //console.log(products,"products")
  //       res.send(products)
  //     })
  // })
  //////////////////////////////////////////////////Start Listing category or Glass List///////////////////////////////////
  // app.post('/categoryList', (req, res) => {
  //   const newGlass = req.body;
  //   //console.log(req.body, "come from client sites")
  //   CategoryListCollection.insertOne(newGlass)
  //     .then(result => {
  //       //console.log('inserted count', result.insertedCount);
  //       res.send(result.insertedCount > 0)
  //     })
  // })
    app.post('/filter/ingredientsList', (req, res) => {
    const newGlass = req.body;
    IngredientsListCollection.insertOne(newGlass)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  //////////////////////////////////////////////////END Listing category or Glass List///////////////////////////////////
  app.get('/drinkDetailByName/:name', (req, res) => {
    AllDrinksCollection.findOne({ "strDrink": req.params.name })
      .then(result => {
        res.send(result)
      })
  })
  app.get('/drinkDetailById/:id', (req, res) => {
   const id=req.params.id;
    AllDrinksCollection.findOne({ idDrink: id })
      .then(result => {
        res.send(result)
      })
  })

// extra code for adding drinks which are missing from cocktaildb


app.get('/drinkIsExist/:id/:name', (req, res) => {
  AllDrinksCollection.find({ $and: [{ strDrink: req.params.name }, { idDrink: req.params.id}] })
    .toArray((err, products) => {
      res.send(products)
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
     const  newName = req.params.name.replace(/_/g, "/");
    AllDrinksCollection.find({ "strGlass": newName })
      .toArray((err, products) => {
        res.send(products)
      })
  })

  app.get('/CategoryDataByName/:name', (req, res) => {
    const  newName = req.params.name.replace(/_/g, "/");
    AllDrinksCollection.find({ "strCategory": newName })
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
    let newName=req.params.name;
    let new1=newName.replace("%20"," ");
    IngredientsListCollection.findOne({ strIngredient:new1})
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
  //   //console.log(req.body, "come from client site")
  //   IngredientListCollection.insertOne(newProduct)
  //     .then(result => {
  //       //console.log('inserted count', result.insertedCount);
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
    SingleOrderCollection.insertOne(newOrder)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  app.get('/SingleOrderDataShow/:idDrink/:email', (req, res) => {
    SingleOrderCollection.findOne({$and: [{ idDrink: req.params.idDrink},{email:req.params.email}]})
      .then(result => {
        if(result!=null){
           res.send(result)
         
        }
        else{
          res.send('false')
         
        }
         
      })
  })
  // app.get('/orderProductFindingFromDB/:idDrink/:strDrink', (req, res) => {
  //   const name = req.params.name;
  //   const id = req.params.id;
  //   AllDrinksCollection.findOne({ $or: [{"strDrink": req.params.name }, { "idDrink": req.params.id }] })
  //     .then(result => {
  //       //console.log(result)
  //       res.send(result)

  //     })
  // })
  app.patch('/updateNewPriceAndQuantity/:id', (req, res) => {
    SingleOrderCollection.updateOne({ _id: ObjectID(req.params.id) },

      {
        $set: { price: req.body.price, quantity: req.body.quantity }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })
  app.get('/SingleOrderUser/orderLength', (req, res) => {
    SingleOrderCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);

      })
  })
  app.get('/Order/userCollection', (req, res) => {
    OrdersCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      })
  })

  app.get('/Order/userAllCollection', (req, res) => {
    OrdersCollection.find({})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })


  app.get('/user/singleOrderCollection', (req, res) => {
    // const bearer = req.headers.authorization;
    // if (bearer && bearer.startsWith('Bearer')) {
    //   const idToken = bearer.split(' ')[1];//extracting second part
    //   admin.auth().verifyIdToken(idToken)
    //     .then((decodedToken) => {
    //       let tokenEmail = decodedToken.email;
    //       let queryEmail = req.query.email;
    //       //console.log(tokenEmail, queryEmail)
    //       if (tokenEmail == queryEmail) {
            SingleOrderCollection.find({ email: req.query.email })
              .toArray((err, documents) => {
                //console.log(documents?.length)
                res.send(documents);
              })
          // }
        //   else {
        //     res.send("unauthorized access");
        //   }
        // })
        // .catch((error) => {
        //   //console.log('error', error)
        // })
// 
 // }
  })
  app.delete('/deleteSingleOrder/:id', (req, res) => {
    SingleOrderCollection.deleteOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result.deletedCount > 0)
      })
  })
  app.post('/user/ShipmentAndPayment', (req, res) => {
    const newBook = req.body;
    OrdersCollection.insertOne(newBook)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })
  app.get('/searchDrinksByName/:name', (req, res) => {
  const newName=req.params.name;
    AllDrinksCollection.find({ "strDrink": {$regex:newName, $options:"i"}})
      .toArray((err, documents) => {
        res.send(documents);
      })
  })
  //Admin Maker start
  app.get('/userIsAdmin', (req, res) => {
    AdminsCollection.find({ email: req.query.email })
      .toArray((err, documents) => {
        res.send(documents);
      })
  });
  app.post('/adminMaker', (req, res) => {
    const newAdmin = req.body;
    AdminsCollection.insertOne(newAdmin)
      .then(result => {
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
  app.delete('/deleteUserDoneCollection/:id', (req, res) => {
    OrdersCollection.deleteOne({_id:ObjectID(req.params.id)})
    .then(result => {
      res.send(result.deletedCount > 0)
    }) 
  })
  app.post('/addMessage', (req, res) => {
    const newMessage = req.body;
    MessageCollection.insertOne(newMessage)
      .then(result => {
        res.send(result.insertedCount > 0)
      })
  })


  app.post('/addTestimonial', (req, res) => {
    const newtestimonial = req.body;
    TestimonialsCollection.insertOne(newtestimonial)
      .then(result => {
      
        res.send(result.insertedCount > 0)
      })
  })
  app.get('/testimonialsData', (req, res) => {
    TestimonialsCollection.find({})
      .toArray((err, services) => {
        res.send(services)
      })
  })

  app.patch('/statusUpdate/AdminShipment/:id', (req, res) => {
    OrdersCollection.updateOne({ _id: ObjectID(req.params.id) },
      {
        $set: { status: req.body.status }
      })
      .then(result => {
        res.send(result.modifiedCount > 0)
      })
  })


  app.get('/SingleOrderDetailFinding/:id', (req, res) => {
    SingleOrderCollection.findOne({ _id: ObjectID(req.params.id) })
      .then(result => {
        res.send(result)
      })
  })




});
app.listen(port, () => {
  //console.log(`Example app listening at http://localhost:${port}`)
})






















 



//   app.get('/ingredientDrinksByName/:name', (req, res) => {
//     const name = req.params.name;
//     AllDrinksCollection.find({
//       $or: [{ "strIngredient1": name }, { "strIngredient2": name }, { "strIngredient3": name }, { "strIngredient4": name }
//         , { "strIngredient5": name }, { "strIngredient6": name }, { "strIngredient7": name }, { "strIngredient8": name }, { "strIngredient9": name }, { "strIngredient10": name }]
//     })
//       .toArray((err, products) => {
//         res.send(products)
//       })
//   })

//   app.get('/similarDrink/:glass/:category/:alcoholic', (req, res) => {
//     const name = req.params.name;
//     AllDrinksCollection.find({ $and: [{ strGlass: req.params.glass }, { strCategory: req.params.category }, { strAlcoholic: req.params.alcoholic }] })
//       .toArray((err, products) => {
//         res.send(products)
//       })
//   })


//   app.get('/similarDrink/:glass/:category/:alcoholic', (req, res) => {
//     const name = req.params.name;
//     AllDrinksCollection.find({ $and: [{ strGlass: req.params.glass }, { strCategory: req.params.category }, { strAlcoholic: req.params.alcoholic }] })
//       .toArray((err, products) => {
//         res.send(products)
//       })
//   })
//   app.get('/ingredientsListCollection', (req, res) => {
//     IngredientsListCollection.find({})
//       .toArray((err, products) => {
//         res.send(products)
//       })
//   })