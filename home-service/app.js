const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Simulated product catalog (in-memory, like a mini "Home" feed)
const products = [
  { id: 1, name: "Wireless Mouse", price: 499, category: "Electronics", rating: 4.2 },
  { id: 2, name: "Bluetooth Speaker", price: 1299, category: "Electronics", rating: 4.5 },
  { id: 3, name: "Running Shoes", price: 1999, category: "Fashion", rating: 4.0 },
  { id: 4, name: "Cotton T-Shirt", price: 399, category: "Fashion", rating: 4.1 },
  { id: 5, name: "Non-stick Pan", price: 899, category: "Home", rating: 4.3 }
];

app.get('/', (req, res) => {
  res.json({ service: "home-service", message: "Welcome to Flipkart Clone Home Page" });
});

// Liveness/readiness probe endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: "UP" });
});

// List all products (home feed)
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product by id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`home-service listening on port ${PORT}`);
});
