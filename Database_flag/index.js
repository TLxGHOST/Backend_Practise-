import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world2",
  password: "admin123",
  port: 5432
});

await db.connect();

let flags = [];
let currentQues = null;
let score = 0;
let gameOver = false;


async function loadFlags() {
  const result = await db.query("SELECT * FROM flags");
  flags = result.rows;
}

function questionPrep() {
  const random = Math.floor(Math.random() * flags.length);
  currentQues = flags[random];
}


app.get("/", (req, res) => {
  if (!gameOver) {
    questionPrep();
  }

  res.render("index.ejs", {
    data: currentQues,
    score: score,
    gameOver: gameOver
  });
});


app.post("/submit", (req, res) => {
  const guess = req.body.country?.trim().toLowerCase();
  const answer = currentQues.name.toLowerCase();

  if (guess === answer) {
    score++;
  } else {
    gameOver = true;
    score = 0;
  }

  res.redirect("/");
});


app.get("/restart", (req, res) => {
  gameOver = false;
  score = 0;
  res.redirect("/");
});


async function startServer() {
  await loadFlags();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT} 🚀`);
  });
}

startServer();