import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./messages.db");

db.serialize(() => {
  // Conversations table
  db.run(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      status TEXT DEFAULT 'open',
      assigned_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Messages table (conversation timeline)
  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL,
      sender TEXT NOT NULL,
      content TEXT NOT NULL,
      urgency INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id)
    )
  `);

  // Canned replies
  db.run(`
    CREATE TABLE IF NOT EXISTS canned (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT
    )
  `);
});
