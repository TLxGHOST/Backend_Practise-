import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"KhataBook",
  password:"admin123",
  port:5432
})


db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [

];

async function loadData(){
  const result=await db.query("SELECT * FROM items ORDER BY id ASC;");
  console.log(result.rows);
  items=result.rows;
}

app.get("/", async(req, res) => {
  await loadData();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async(req, res) => {
  const item = req.body.newItem;

    await db.query("INSERT INTO items(title) VALUES($1)",[item]);

  
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
      let itemEditId=req.body["updatedItemId"];
       let itemNew=req.body["updatedItemTitle"];
      await db.query("UPDATE items SET title=$1 WHERE id=$2",[itemNew,itemEditId]);
      res.redirect("/");


});

app.post("/delete", async(req, res) => {
    let delId=req.body["deleteItemId"];
    // console.log(delId);
    await db.query("DELETE FROM items WHERE id=$1",[delId]);
    res.redirect("/")
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
