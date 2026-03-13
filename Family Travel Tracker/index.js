import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world2",
  password: "admin123",
  port: 5432,
});
db.connect();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;



async function checkVisisted(userId) {
//  await  console.log(db.query("SELECT country_code FROM visited_countries JOIN users WHERE user.id= $1",[userId]))
  const result = await db.query("SELECT country_code FROM visited_countries  WHERE visited_countries.user_id= $1",[userId]);
  const usesss=await db.query("SELECT * FROM users");
  let users = [];
  usesss.rows.forEach((x)=>{
    users.push(x)
  })
  let countries = [];
  result.rows.forEach((country) => {
    console.log(country.country_code)
    countries.push(country.country_code);
  });
  return[countries,users] ;
}
app.get("/", async (req, res) => {

 
  const [countries,users] = await checkVisisted(currentUserId);
  let neWcolor = users.find(u => u.id == currentUserId)?.color;
  console.log(neWcolor)
  console.log(countries)
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: neWcolor|| "red",
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      console.log(currentUserId)
      await db.query(
        "INSERT INTO visited_countries (country_code,user_id) VALUES ($1,$2) ",
        [countryCode,currentUserId]
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});
app.post("/user", async (req, res) => {
 if(req.body["add"]==="new"){
  res.render('new.ejs');
 }
 else{
  let currUser= req.body.user;
 console.log(currUser);
 currentUserId=currUser;
 res.redirect("/");}
});

app.post("/new", async (req, res) => {
     
     const resona=await db.query("INSERT INTO users(name,color) VALUES($1,$2) RETURNING *;",[req.body.name,req.body.color]);
     console.log(resona.rows[0].id);
     currentUserId=resona.rows[0].id;
     res.redirect("/")


});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
