import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import "./db.js";
import messages from "./routes/messages.js";
import canned from "./routes/canned.js";
import { setupSocket } from "./socket.js";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api/messages", messages);
app.use("/api/canned", canned);

setupSocket(io);

app.get("/debug/messages", (req, res) => {
  import("./db.js").then(({ db }) => {
    db.all("SELECT * FROM messages", [], (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json({ count: rows.length, rows });
    });
  });
});

httpServer.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
