import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import bcrypt from "bcrypt";

const PORT = 3000;
const app = express();
app.use(express.static("public"));
const saltRounds = 10;
app.use(express.urlencoded({ extended: true }));
const __dirname = dirname(fileURLToPath(import.meta.url));

const db = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "KhataBook",
  password: "admin123",
  port: 5432,
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/signup", async (req, res) => {
  let passEntered = req.body.pass;
  let email = req.body.email;
  if (!passEntered || !email) {
    //  res.send("Fill the form ")
    return res.redirect("/");
  } else {
    try {
      const results = await db.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);
      if (results.rows.length > 0) {
        bcrypt.compare(passEntered, results.rows[0].password, (err, result) => {
          if (result) {
            return res.send(`Welcom ${email}`);// login successful point 
          } else {
            return res.send(`Wrong Password for ${email}`); // wrong password enterd for an existing user
          }
        });
      } else {
        bcrypt.hash(passEntered, saltRounds, async (err, hashPassword) => {
          try {
            await db.query(
              "INSERT INTO users(email,password) VALUES ($1 ,$2)",
              [email, hashPassword],
            );
            return res.send("New user REGISTERED");// new user registered at this point
          } catch (err) {
            console.log(err);
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // bcrypt.hash()
});

app.listen(PORT, () => {
  console.log("Server is live");
});
