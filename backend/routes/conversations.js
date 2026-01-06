import express from "express";
import { db } from "../db.js";
import { scoreUrgency } from "../urgency.js";

const router = express.Router();

/* Create conversation (customer sends first message) */
router.post("/", (req, res) => {
  const { customer, message } = req.body;
  const urgency = scoreUrgency(message);

  db.run(
    `INSERT INTO conversations (customer_name) VALUES (?)`,
    [customer],
    function () {
      const conversationId = this.lastID;

      db.run(
        `
        INSERT INTO messages (conversation_id, sender, content, urgency)
        VALUES (?, 'customer', ?, ?)
        `,
        [conversationId, message, urgency],
        () => {
          res.json({ conversationId });
        }
      );
    }
  );
});

/* Get all conversations (agent inbox) */
router.get("/", (req, res) => {
  db.all(
    `
    SELECT
      c.id,
      c.customer_name,
      c.status,
      c.assigned_agent,
      m.content AS last_message,
      m.urgency,
      c.created_at
    FROM conversations c
    JOIN messages m ON m.id = (
      SELECT id FROM messages
      WHERE conversation_id = c.id
      ORDER BY created_at DESC
      LIMIT 1
    )
    ORDER BY m.urgency DESC, c.created_at DESC
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

/* Get conversation messages */
router.get("/:id/messages", (req, res) => {
  db.all(
    `
    SELECT sender, content, created_at
    FROM messages
    WHERE conversation_id = ?
    ORDER BY created_at ASC
    `,
    [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

/* Agent replies */
router.post("/:id/reply", (req, res) => {
  const { agent, message } = req.body;

  db.run(
    `
    INSERT INTO messages (conversation_id, sender, content)
    VALUES (?, 'agent', ?)
    `,
    [req.params.id, message],
    () => {
      db.run(
        `
        UPDATE conversations
        SET status = 'resolved', assigned_agent = ?
        WHERE id = ?
        `,
        [agent, req.params.id],
        () => res.sendStatus(200)
      );
    }
  );
});

/* Assign conversation to agent */
router.post("/:id/assign", (req, res) => {
  const { agent } = req.body;

  db.run(
    `
    UPDATE conversations
    SET assigned_agent = ?
    WHERE id = ?
    `,
    [agent, req.params.id],
    () => res.sendStatus(200)
  );
});

export default router;
