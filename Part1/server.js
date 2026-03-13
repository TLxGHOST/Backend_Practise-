import bodyParser from "body-parser";
import express from "express";
import {dirname} from "path";
import { fileURLToPath } from "url";
import axios from "axios";

const app=express();
app.use(express.static("public"));
const __dirname=dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));

let data;

const myFunction = async (req, res, next) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/filter?type=education");
    data=JSON.parse(response)[0];
    next();
  } catch (error) {
console.error("failed");
  }
}

function passwordcheck(req, res, next) {
  const password = req.body["password"];
  if (password === "hello") {
    next(); 
  } else {
    console.log(password);
    res.status(403).send("Forbidden: Incorrect password");
  }
}



app.get("/",(_req,res)=>{
  res.sendFile(__dirname+"/public/index.html");
})

app.post("/data",passwordcheck,(req,res)=>{
 
  res.render(__dirname+"/views/landingPage.ejs");
})

app.get("/api",myFunction,(_req,res)=>{
  res.render(__dirname+"/views/landingPage.ejs",{data:data});
})

app.listen(3000,()=>{
  console.log("❤️ server live");
})