const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3002;

// In-memory "ledger" of payments, purely for demo purposes
const payments = [];
let nextId = 1;

app.get('/', (req, res) => {
  res.json({ service: "payment-service", message: "Payment microservice running" });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Simulate processing a payment
app.post('/api/payment', (req, res) => {
  const { userId, amount, method } = req.body;

  if (!userId || !amount || !method) {
    return res.status(400).json({ error: "userId, amount and method are required" });
  }

  const payment = {
    id: nextId++,
    userId,
    amount,
    method,
    status: "SUCCESS",
    timestamp: new Date().toISOString()
  };

  payments.push(payment);
  res.status(201).json(payment);
});

// Fetch payment history for a user
app.get('/api/payment/:userId', (req, res) => {
  const history = payments.filter(p => p.userId === req.params.userId);
  res.json(history);
});

app.listen(PORT, () => {
  console.log(`payment-service listening on port ${PORT}`);
});
