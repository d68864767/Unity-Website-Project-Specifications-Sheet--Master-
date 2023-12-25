```javascript
// Import required modules
const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

// Connect to MongoDB
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let collection;

client.connect(err => {
  if (err) throw err;
  console.log("Connected to MongoDB for testing");
  collection = client.db("<dbname>").collection("<collectionname>");
});

// Test case: Check MongoDB connection
describe('MongoDB Connection', function() {
  it('should connect without error', function(done) {
    MongoClient.connect(uri, function(err) {
      assert.equal(null, err);
      done();
    });
  });
});

// Test case: Check data insertion
describe('Insert', function() {
  it('should insert data without error', function(done) {
    const data = { test: 'test' };
    collection.insertOne(data, function(err, res) {
      assert.equal(null, err);
      done();
    });
  });
});

// Test case: Check data retrieval
describe('Fetch', function() {
  it('should fetch data without error', function(done) {
    collection.findOne({}, function(err, res) {
      assert.equal(null, err);
      done();
    });
  });
});

// Test case: Check data deletion
describe('Delete', function() {
  it('should delete data without error', function(done) {
    collection.deleteOne({}, function(err, res) {
      assert.equal(null, err);
      done();
    });
  });
});

// Close MongoDB connection after tests
after(function() {
  client.close();
});
```
