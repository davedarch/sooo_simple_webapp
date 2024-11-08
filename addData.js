const db = require('./db');

const insertWord = db.prepare(`
  INSERT INTO words (title, thing, synonym_01, synonym_02, whatis_01, whatis_02, whyuse_01, whyuse_02, whatdo_01, whatdo_02, simile_01, simile_02)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

// Example data
const wordData = [
  {
    title: 'Example Word',
    thing: 'Example Thing',
    synonym_01: 'Synonym 1',
    synonym_02: 'Synonym 2',
    whatis_01: 'What is 1',
    whatis_02: 'What is 2',
    whyuse_01: 'Why use 1',
    whyuse_02: 'Why use 2',
    whatdo_01: 'What do 1',
    whatdo_02: 'What do 2',
    simile_01: 'Simile 1',
    simile_02: 'Simile 2'
  }
];

// Insert data
wordData.forEach(word => {
  insertWord.run(
    word.title,
    word.thing,
    word.synonym_01,
    word.synonym_02,
    word.whatis_01,
    word.whatis_02,
    word.whyuse_01,
    word.whyuse_02,
    word.whatdo_01,
    word.whatdo_02,
    word.simile_01,
    word.simile_02
  );
});

console.log('Data inserted successfully.');
