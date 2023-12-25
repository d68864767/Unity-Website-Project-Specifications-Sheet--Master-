```javascript
// Import required modules
const express = require('express');
const MongoClient = require('mongodb').MongoClient;

// Create an instance of express router
const router = express.Router();

// Connect to MongoDB
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection;

client.connect(err => {
  if (err) throw err;
  console.log("Connected to MongoDB");
  collection = client.db("<dbname>").collection("<collectionname>");
});

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await collection.find().toArray();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get a specific product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await collection.findOne({ _id: req.params.id });
    if (!product) return res.status(404).send('Product not found');
    res.send(product);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to add a new product
router.post('/products', async (req, res) => {
  try {
    const product = { name: req.body.name, price: req.body.price, description: req.body.description };
    const result = await collection.insertOne(product);
    res.send({ product: product._id });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to update a product
router.put('/products/:id', async (req, res) => {
  try {
    const product = { name: req.body.name, price: req.body.price, description: req.body.description };
    const result = await collection.updateOne({ _id: req.params.id }, { $set: product });
    if (result.modifiedCount === 0) return res.status(404).send('Product not found');
    res.send({ product: product._id });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) return res.status(404).send('Product not found');
    res.send({ product: req.params.id });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
```
