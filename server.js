const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

let db;

async function connectToDb() {
  try {
    await client.connect();
    db = client.db('KEC2025');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDb();

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.collection('steel_products').find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await db.collection('steel_products').findOne({
      _id: new ObjectId(req.params.id)
    });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 