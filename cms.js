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

// Route to get all content
router.get('/', async (req, res) => {
  try {
    const content = await collection.find({}).toArray();
    res.json(content);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to get specific content by id
router.get('/:id', async (req, res) => {
  try {
    const content = await collection.findOne({ _id: req.params.id });
    if (!content) return res.status(404).send('Content not found');
    res.json(content);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to add new content
router.post('/', async (req, res) => {
  try {
    const newContent = req.body;
    const result = await collection.insertOne(newContent);
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to update content by id
router.put('/:id', async (req, res) => {
  try {
    const updatedContent = req.body;
    const result = await collection.updateOne({ _id: req.params.id }, { $set: updatedContent });
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to delete content by id
router.delete('/:id', async (req, res) => {
  try {
    const result = await collection.deleteOne({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
```
