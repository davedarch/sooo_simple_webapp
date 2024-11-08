const express = require('express');
const path = require('path');
const db = require('./db');

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
  const words = db.prepare('SELECT * FROM words').all();
  res.json(words);
});

// Route to add a new word
app.post('/api/words', (req, res) => {
  console.log('Received req.body:', req.body);

  const {
    title,
    thing,
    synonym_01,
    synonym_02,
    whatis_01,
    whatis_02,
    whyuse_01,
    whyuse_02,
    whatdo_01,
    whatdo_02,
    simile_01,
    simile_02,
    thing_img_01,
    thing_img_02,
    simile_img_01,
    simile_img_02
  } = req.body;

  const stmt = db.prepare(`
    INSERT INTO words (
      title, thing, synonym_01, synonym_02, 
      whatis_01, whatis_02, whyuse_01, whyuse_02, 
      whatdo_01, whatdo_02, simile_01, simile_02, 
      thing_img_01, thing_img_02, simile_img_01, simile_img_02
    ) VALUES (
      ?, ?, ?, ?, 
      ?, ?, ?, ?, 
      ?, ?, ?, ?, 
      ?, ?, ?, ?
    )
  `);

  stmt.run(
    title,
    thing,
    synonym_01,
    synonym_02,
    whatis_01,
    whatis_02,
    whyuse_01,
    whyuse_02,
    whatdo_01,
    whatdo_02,
    simile_01,
    simile_02,
    thing_img_01,
    thing_img_02,
    simile_img_01,
    simile_img_02
  );

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
