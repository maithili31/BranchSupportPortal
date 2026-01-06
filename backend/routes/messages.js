import express from "express";
import { db } from "../db.js";
import { scoreUrgency } from "../urgency.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    `
    SELECT 
      id,
      customer,
      content,
      urgency,
      response,
      replied,
      created_at
    FROM messages
    ORDER BY created_at DESC
    `,
    [],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
});

router.post("/", (req, res) => {
  const { customer, content } = req.body;
  const urgency = scoreUrgency(content);

  db.run(
    `
    INSERT INTO messages (customer, content, urgency, replied)
    VALUES (?, ?, ?, 0)
    `,
    [customer, content, urgency],
    function () {
      res.json({ id: this.lastID });
    }
  );
});

router.post("/:id/reply", (req, res) => {
  const { response } = req.body;

  db.run(
    `
    UPDATE messages
    SET response = ?, replied = 1
    WHERE id = ?
    `,
    [response, req.params.id],
    () => res.sendStatus(200)
  );
});

export default router;
