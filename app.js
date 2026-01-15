const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json()); // REQUIRED

// Fake DB
const users = [];

// REGISTER
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({
    username,
    password: hashedPassword
  });

  res.send('User registered');
});

// LOGIN
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send('Wrong password');

  res.send('Login successful');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
