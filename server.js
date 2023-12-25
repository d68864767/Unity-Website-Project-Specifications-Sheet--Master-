// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// Create an instance of express
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  if (err) throw err;
  console.log("Connected to MongoDB");
  const collection = client.db("<dbname>").collection("<collectionname>");
  // perform actions on the collection object
  client.close();
});

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
