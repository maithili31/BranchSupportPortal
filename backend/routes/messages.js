import express from "express";
import { db } from "../db.js";
import { scoreUrgency } from "../urgency.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.all(
    "SELECT * FROM messages ORDER BY urgency DESC, created_at DESC",
    [],
    (e, rows) => res.json(rows)
  );
});

router.post("/", (req, res) => {
  const { customer, content } = req.body;
  const urgency = scoreUrgency(content);

  db.run(
    `
    INSERT INTO messages (customer, content, urgency)
    VALUES (?, ?, ?)
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
