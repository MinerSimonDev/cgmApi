const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let currentBloodSugarData = null;

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/v1/entries', (req, res) => {
  const entryData = req.body;

  if (Array.isArray(entryData) && entryData.length > 0) {
    const now = new Date();
    const currentEntry = entryData.find(entry => {
      const entryDate = new Date(entry.sysTime);
      return (
        entryDate.getFullYear() === now.getFullYear() &&
        entryDate.getMonth() === now.getMonth() &&
        entryDate.getDate() === now.getDate() &&
        entryDate.getHours() === now.getHours() &&
        entryDate.getMinutes() === now.getMinutes()
      );
    });

    console.log('Current entry:', currentEntry);

    if (currentEntry) {
      currentBloodSugarData = {
        currentBloodSugar: currentEntry.sgv,
        delta: currentEntry.delta,
        sgv: currentEntry.sgv,
        dateString: currentEntry.dateString
      };

      res.json(currentBloodSugarData);
    } else {
      res.status(404).json({ error: 'Blutzuckerwert nicht verfügbar' });
    }
  } else {
    res.status(400).json({ error: 'Ungültige Eingabe' });
  }
});

app.get('/api/v1/currentBloodSugar', (req, res) => {
  if (currentBloodSugarData !== null) {
    res.json(currentBloodSugarData);
  } else {
    res.status(404).json({ error: 'Blutzuckerwert nicht verfügbar' });
  }
});

app.get('/api/v1/currentBloodSugar/raw', (req, res) => {
  if (currentBloodSugarData !== null) {
    res.json(currentBloodSugarData);
  } else {
    res.status(404).json({ error: 'Blutzuckerwert nicht verfügbar' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

