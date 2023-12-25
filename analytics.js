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

// Route to get all analytics data
router.get('/', async (req, res) => {
  try {
    const analyticsData = await collection.find({}).toArray();
    res.json(analyticsData);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to post new analytics data
router.post('/', async (req, res) => {
  try {
    const newAnalyticsData = req.body;
    const result = await collection.insertOne(newAnalyticsData);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
```
