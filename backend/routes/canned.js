import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.get("/", (req, res) => {
  db.all("SELECT * FROM canned", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

router.post("/", (req, res) => {
  const { text } = req.body;
  if (!text) return res.sendStatus(400);

  db.run("INSERT INTO canned (text) VALUES (?)", [text], () => {
    res.sendStatus(200);
  });
});

export default router;