const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

// Simulated user profiles (in-memory)
const profiles = {
  "u1": { id: "u1", name: "Ravi Kumar", email: "ravi@example.com", city: "Bengaluru" },
  "u2": { id: "u2", name: "Anita Sharma", email: "anita@example.com", city: "Mumbai" }
};

app.get('/', (req, res) => {
  res.json({ service: "profile-service", message: "Profile microservice running" });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: "UP" });
});

// Get profile by user id
app.get('/api/profile/:id', (req, res) => {
  const profile = profiles[req.params.id];
  if (!profile) return res.status(404).json({ error: "Profile not found" });
  res.json(profile);
});

// Update profile (simple demo of write path)
app.put('/api/profile/:id', (req, res) => {
  const existing = profiles[req.params.id];
  if (!existing) return res.status(404).json({ error: "Profile not found" });
  profiles[req.params.id] = { ...existing, ...req.body };
  res.json(profiles[req.params.id]);
});

app.listen(PORT, () => {
  console.log(`profile-service listening on port ${PORT}`);
});
