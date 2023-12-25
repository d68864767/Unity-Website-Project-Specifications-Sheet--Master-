```javascript
// Import the mongodb module
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority';

// Database Name
const dbName = '<dbname>';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    console.log("Connected correctly to server");

    // Specify the database
    const db = client.db(dbName);

    // Specify the collection
    const collection = db.collection('<collectionname>');

    // Insert some documents
    const docs = [{name: 'doc1', value: 'value1'}, {name: 'doc2', value: 'value2'}];
    const result = await collection.insertMany(docs);

    console.log(`Inserted ${result.insertedCount} documents into the collection`);
  } catch (err) {
    console.error(err);
  } finally {
    // Close the connection to the MongoDB server
    await client.close();
  }
}

run().catch(console.dir);
```
