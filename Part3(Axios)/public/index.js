// ---------- ELEMENTS ----------
import api from "./api.js"
const select = document.querySelector("#Select1");
const goBtn = document.querySelector("#Go");
const output = document.querySelector("#changeP");


// ---------- EVENTS ----------
select.addEventListener("change", select1);
goBtn.addEventListener("click", buttonClick);


// ---------- SELECT CHANGE ----------
function select1(event) {

  const x = event.target.value;

  if (x === "activity") {
    document.querySelectorAll(".hidden")
      .forEach(el => el.classList.remove("hidden"));
  }

  else if (x === "random") {
    document.querySelectorAll(".show")
      .forEach(el => el.classList.add("hidden"));
  }
}


// ---------- BUTTON CLICK ----------
async function buttonClick() {

  try {

    let x = select.value;   // single source of truth

    // RANDOM MODE
    if (x === "random") {

      console.log("random click");

      const res = await api.post("/random");

      output.textContent = res.data.activity;
    }

    // ACTIVITY MODE (example placeholder)
    else if (x === "activity") {

      const value =
        document.querySelector("#ActivityOptions").value;

      const res = await api.post("/activity", {
        type: value
      });

      // random result from array
      const rand =
        Math.floor(Math.random() * res.data.length);

      output.textContent =
        res.data[rand].activity;
    }

  } catch (err) {

    console.error("ERROR:", err);

  }
}
