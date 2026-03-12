import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";

const __dirname=dirname(fileURLToPath(import.meta.url));

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.post("/submit",(req,res)=>{
  var name=req.body["name"] + req.body["pet"]
  console.log(req.body);
  console.log(name);
  res.send(`<h1>Your Name is ${name}`)
})

app.listen(3000,()=>{
  console.log("Server is live");
})