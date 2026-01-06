import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("./messages.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer TEXT,
      content TEXT,
      urgency INTEGER,
      response TEXT,
      replied INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS canned (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT
    )
  `);
});
