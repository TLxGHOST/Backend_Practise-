import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

app.use(express.static("public"));
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

let yourBearerToken = "";
let user="";

// 🔥 dynamic config (correct)
function getConfig() {
  return {
    headers: {
      Authorization: `Bearer ${yourBearerToken}`,
    },
  };
}

// global user for EJS
function setUsername(req, res, next)  {
  res.locals.user = user;
  next();
}

app.use(setUsername);
app.get("/", (req, res) => {
  res.render("login.ejs");
});

// ================= LOGIN =================

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  user = email;
 

  try {
    // REGISTER (urlencoded required)
    await axios.post(
      API_URL + "/register",
      new URLSearchParams({
        username: email,
        password,
      })
    );

    const tok = await axios.post(
      API_URL + "/get-auth-token",
      new URLSearchParams({
        username: email,
        password,
      })
    );

    yourBearerToken = tok.data.token;

    console.log("New user signup token:", yourBearerToken);

    res.render("index.ejs", {
      content: "Waiting for your side",
    });

  } catch (err) {

    if (err.response?.data?.error === "Username is already taken.") {

      console.log("User LOGIN");

      const tok = await axios.post(
        API_URL + "/get-auth-token",
        new URLSearchParams({
          username: email,
          password,
        })
      );

      yourBearerToken = tok.data.token;

      return res.render("index.ejs", {
        content: "Waiting for your side",
      });
    }

    console.log(err.response?.data);
    res.send("Error");
  }
});

// ================= GET SECRET =================

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;

  try {
    const result = await axios.get(
      API_URL + "/secrets/" + searchId,
      getConfig()
    );

    res.render("index.ejs", {
      content: JSON.stringify(result.data),
    });

  } catch (error) {
    res.render("index.ejs", {
      content: JSON.stringify(error.response?.data),
    });
  }
});

// ================= POST SECRET =================

app.post("/post-secret", async (req, res) => {

  try {
    await axios.post(
      API_URL + "/secrets",
      {
        secret: req.body.secret,
        score: req.body.score,
      },
      getConfig()
    );

    res.render("index.ejs", {
      content: "Secret posted",
    });

  } catch (err) {
    console.log(err.response?.data);

    res.render("index.ejs", {
      content: "Error posting secret",
    });
  }
});

//-------------------------------------------


app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.patch(
      API_URL + "/secrets/" + searchId,
      req.body,
      getConfig()
    );
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.delete(API_URL + "/secrets/" + searchId, getConfig());
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

//----------------------------------------------

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
