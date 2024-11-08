const Database = require('better-sqlite3');
const db = new Database('words.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS words (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    thing TEXT,
    synonym_01 TEXT,
    synonym_02 TEXT,
    whatis_01 TEXT,
    whatis_02 TEXT,
    whyuse_01 TEXT,
    whyuse_02 TEXT,
    whatdo_01 TEXT,
    whatdo_02 TEXT,
    simile_01 TEXT,
    simile_02 TEXT,
    thing_img_01 TEXT,
    thing_img_02 TEXT,
    simile_img_01 TEXT,
    simile_img_02 TEXT
  );
`);

module.exports = db;
