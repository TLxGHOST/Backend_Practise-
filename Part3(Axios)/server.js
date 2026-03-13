import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5500;

const __dirname =
  dirname(fileURLToPath(import.meta.url));


// ---------- MIDDLEWARE ----------
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ---------- HOME ROUTE ----------
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


// ---------- RANDOM ACTIVITY ----------
app.post("/random", async (req, res) => {
  try {

    console.log("random route hit");

    const response = await axios(
      "https://bored-api.appbrewery.com/random"
    );

    res.json(response.data);

  } catch (err) {

    console.error("Random API Error:", err.message);
    res.status(500).send("API failed");

  }
});


// ---------- FILTER BY TYPE ----------
app.post("/activity", async (req, res) => {
  try {

    const type = req.body.type;

    console.log("TYPE RECEIVED:", type);

    const response = await axios(
      `https://bored-api.appbrewery.com/filter?type=${type}`
    );

    res.json(response.data);

  } catch (err) {

    console.error("Activity API Error:", err.message);
    res.status(500).send("API failed");

  }
});


// ---------- SERVER ----------
app.listen(PORT, () => {
  console.log(`Server is LIVE on ${PORT}`);
});
