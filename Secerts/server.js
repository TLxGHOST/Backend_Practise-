import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(PORT, () => {
  console.log("Server running on port 3000");
});
