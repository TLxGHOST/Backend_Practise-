import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
import e from "express";

const PORT=3000;
const app=express();
const __dirname=dirname(fileURLToPath(import.meta.url));

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.json());

app.get("/",async (req,res)=>{
  try{
    const resp=await axios.get("https://secrets-api.appbrewery.com/random");
    console.log(resp.data.username);
    res.render("index.ejs",{secret:resp.data.secret,user:resp.data.username})
  }catch(err){
    console.log(err.message);
  }
  
})

app.listen(PORT,()=>{
  console.log("Server live ")
})
