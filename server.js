const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route to get all characters
app.get('/api/characters', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'characters.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

// Route to add a new character
app.post('/api/characters', (req, res) => {
  const newCharacter = req.body;

  fs.readFile(path.join(__dirname, 'data', 'characters.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading data');
    }

    const characters = JSON.parse(data);
    characters.push(newCharacter);

    fs.writeFile(path.join(__dirname, 'data', 'characters.json'), JSON.stringify(characters, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error writing data');
      }
      res.sendStatus(201);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
