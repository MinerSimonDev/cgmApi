const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const glucoseData = [];

app.post('/api/v1', (req, res) => {
  const newData = req.body;
  glucoseData.push(newData);
  res.status(201).json(newData);
});

app.get('/api/v1', (req, res) => {
  res.json(glucoseData);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
