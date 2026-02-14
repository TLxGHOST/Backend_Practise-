import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const PORT=3000;
const app =express();

const __dirname=dirname(fileURLToPath(import.meta.url));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/',(req,res)=>{
  res.sendFile(__dirname+"/public/index.html");
})



app.post("/random", async (req,res)=>{
  try{
    const response = await fetch(
      "https://bored-api.appbrewery.com/random"
    );

    const data = await response.json();

    res.json(data);

  } catch(err){
    res.status(500).send("API failed");
  }
});


app.post("/activity",async (req,res)=>{
  try{
    console.log("BODY:", req.body);

      const type=req.body.type;
      const response =await fetch(`https://bored-api.appbrewery.com/filter?type=${type}`);

      const data =await response.json();
      await console.log(data[0].activity)
      res.json(data);
  }
  catch(err){
    console.log("Error");
  }
})


app.listen(PORT,()=>{
  console.log("server is live")
})