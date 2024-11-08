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

// Route to get all words
app.get('/api/words', (req, res) => {
  fs.readFile(path.join(__dirname, 'data', 'words.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

// Route to add a new word
app.post('/api/words', (req, res) => {
  const newWord = req.body;

  fs.readFile(path.join(__dirname, 'data', 'words.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading data');
    }

    const words = JSON.parse(data);
    words.push(newWord);

    fs.writeFile(path.join(__dirname, 'data', 'words.json'), JSON.stringify(words, null, 2), (err) => {
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
