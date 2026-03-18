import express from "express";
// import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";



const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//settting up a session 
app.use(session({
  secret: "TopSecteretskjgnsgjk",
  resave: false,
  saveUninitialized: false,
  // cookie: {
  //   maxAge:
  // }
}))

app.use(passport.initialize());
app.use(passport.session());
//this piece of code creates something as follows:- req.session lets try to console log it and see its strucure in line no 92 we get --> Session {
// cookie: { path: '/', _expires: null, originalMaxAge: null, httpOnly: true }
// }

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "KhataBook",
  password: "admin123",
  port: 5432,
});
db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
    } else {
      //hashing the password and saving it in the database
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.error("Error hashing password:", err);
        } else {
          console.log("Hashed Password:", hash);
          await db.query(
            "INSERT INTO users (email, password) VALUES ($1, $2)",
            [email, hash]
          );
          res.render("secrets.ejs");
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/secrets",
  failureRedirect: "/login"
})
);

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated())
    res.render("secrets.ejs");
  else
    res.render("login.ejs");
})

passport.use(new Strategy(async function verify(username, password, cb) {
  const result = await db.query("SELECT * FROM users WHERE email=$1", [username]);
  if (result.rows.lenpassport < 0) {
    return cb("No user found in database", false);
  }
  else {
    const user = result.rows[0];

    bcrypt.compare(password, user.password, (err, authe) => {
      if (authe) {
        return cb(null, user);
      }
      else
        return cb("Wrong password", false);
    })

  }

}))

passport.serializeUser((user, cb) => {
  cb(null, user);
})

passport.deserializeUser((user, cb) => {
  cb(null, user);
})
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
