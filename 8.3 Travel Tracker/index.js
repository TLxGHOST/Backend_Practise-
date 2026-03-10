import express from "express";
import bodyParser from "body-parser";
import pg from "pg";


const app = express();
const port = 3000;
let data=[];
let error=false;
const db=new pg.Client({
  host:"localhost",
  user:"postgres",
  port:5432,
  database:"world2",
  password:"admin123"
})

await db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

db.query("Select * from visited_countries",(err,res)=>{
  if(err)
    console.log("database error",err.message);
    else{
    data=res.rows;}
})
let country=[];

 function datafilling(){
  country.splice(0, country.length);
  data.forEach(element => {
      country.push(element.country_code);
  });
}

app.get("/", async (req, res) => {
  await datafilling();
  console.log(country)
  res.render('index.ejs',{error,
    total:country.length,
    countries:country
  })
});

app.post("/add",(req,res)=>{
    db.query(`INSERT INTO visited_countries(country_code) VALUES(${req.body.country})`)
})


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
