import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import { db } from "./db.js";
import { scoreUrgency } from "./urgency.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvPath = path.join(__dirname, "../data/messages.csv");

console.log("Reading CSV from:", csvPath);

if (!fs.existsSync(csvPath)) {
  console.error("CSV file not found");
  process.exit(1);
}

let inserted = 0;

fs.createReadStream(csvPath)
  .pipe(csv())
  .on("data", row => {
    const customer = `User ${row["User ID"] || "Unknown"}`;
    const content = row["Message Body"];

    if (!content || !content.trim()) return;

    const urgency = scoreUrgency(content);

    db.run(
      `
      INSERT INTO messages (customer, content, urgency)
      VALUES (?, ?, ?)
      `,
      [customer, content, urgency]
    );

    inserted++;
  })
  .on("end", () => {
    console.log(`Seed complete. Inserted ${inserted} messages.`);
  });

// canned replies
db.run("INSERT INTO canned (text) VALUES (?)", [
  "Thanks for reaching out. We are reviewing your loan status."
]);
db.run("INSERT INTO canned (text) VALUES (?)", [
  "Your loan application is under review. We will update you shortly."
]);
db.run("INSERT INTO canned (text) VALUES (?)", [
  "Please allow us some time to verify your details."
]);
