import express from "express";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

/* ================= HOME =================
   Default page → random cocktails
   
*/
var trendingRes; var alcoholicRes; var nonAlcoholicRes; var randomRes;
app.get("/", async (req, res) => {
  try {

   [trendingRes, alcoholicRes, nonAlcoholicRes, randomRes]  =
      await Promise.all([

        axios.get(`${BASE_URL}/search.php?f=a`),

        axios.get(`${BASE_URL}/filter.php?a=Alcoholic`),

        axios.get(`${BASE_URL}/filter.php?a=Non_Alcoholic`),

        axios.get(`${BASE_URL}/random.php`)
      ]);

    res.render("index", {
      trending: trendingRes.data.drinks || [],
      alcoholic: alcoholicRes.data.drinks || [],
      nonAlcoholic: nonAlcoholicRes.data.drinks || [],
      random: randomRes.data.drinks || []
    });

  } catch (err) {

    console.log(err.message);

    res.render("index", {
      trending: [],
      alcoholic: [],
      nonAlcoholic: [],
      random: []
    });
  }
});



/* ================= SEARCH BY NAME ================= */

app.post("/search", async (req, res) => {
  const name = req.body.name;

  try {
    const resp = await axios.get(
      `${BASE_URL}/search.php?s=${name}`
    );

    res.render("index", {
      drinks: resp.data.drinks || [],
      title: `Search: ${name}`,
      trending : trendingRes.data.drinks || [],
       alcoholic: alcoholicRes.data.drinks || [],
      nonAlcoholic: nonAlcoholicRes.data.drinks || [],
      random: randomRes.data.drinks || []
    });

  } catch (err) {
    res.render("index", { drinks: [], title: "Search Error" });
  }
});


/* ================= RANDOM COCKTAIL ================= */

app.get("/random", async (req, res) => {

  try {
    const resp = await axios.get(`${BASE_URL}/random.php`);

    res.render("index", {
      drinks: resp.data.drinks || [],
      title: "Random Cocktail"
    });

  } catch (err) {
    res.render("index", { drinks: [], title: "Error" });
  }
});


/* ================= FILTER ALCOHOLIC ================= */

app.post("/filter/alcoholic", async (req, res) => {

  const type = req.body.type; // Alcoholic / Non_Alcoholic

  try {
    const resp = await axios.get(
      `${BASE_URL}/filter.php?a=${type}`
    );

    res.render("index", {
      drinks: resp.data.drinks || [],
      title: type
    });

  } catch (err) {
    res.render("index", { drinks: [], title: "Error" });
  }
});


/* ================= FILTER BY INGREDIENT ================= */

app.post("/filter/ingredient", async (req, res) => {

  const ingredient = req.body.ingredient;

  try {
    const resp = await axios.get(
      `${BASE_URL}/filter.php?i=${ingredient}`
    );

    res.render("index", {
      drinks: resp.data.drinks || [],
      title: `Ingredient: ${ingredient}`
    });

  } catch (err) {
    res.render("index", { drinks: [], title: "Error" });
  }
});


/* ================= LOOKUP BY ID ================= */

app.get("/drink/:id", async (req, res) => {

  try {
    const resp = await axios.get(
      `${BASE_URL}/lookup.php?i=${req.params.id}`
    );

    res.render("index", {
      drinks: resp.data.drinks || [],
      title: "Drink Details"
    });

  } catch (err) {
    res.render("index", { drinks: [], title: "Error" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
