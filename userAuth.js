```javascript
// Import required modules
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

// User registration route
router.post('/register', async (req, res) => {
  try {
    // Check if user already exists
    const userExists = await collection.findOne({ username: req.body.username });
    if (userExists) return res.status(400).send('Username already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = { username: req.body.username, password: hashedPassword };
    const result = await collection.insertOne(user);

    res.send({ user: user._id });
  } catch (err) {
    res.status(500).send(err);
  }
});

// User login route
router.post('/login', async (req, res) => {
  try {
    // Check if user exists
    const user = await collection.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Username or password is incorrect');

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Username or password is incorrect');

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
```
