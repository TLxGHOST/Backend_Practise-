let activity = "none";
let ran = true;

document.querySelector("#select")
  .addEventListener("change", onSelect);

document.querySelector("#GO")
  .addEventListener("click", buttonClick);


function buttonClick() {

  if (ran === true) {

    fetch("/random", { method: "POST" })
      .then(resp => {
        if (!resp.ok) throw new Error("Failed");
        return resp.json();
      })
      .then(data => {
        document.querySelector("#changeP").textContent =
          data.activity;
      })
      .catch(err => console.log(err));
  }

  else if (ran === false) {

    const value =
      document.querySelector("#activityOptions").value;

    fetch("/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ type: value })
    })
      .then(resp => {
        if (!resp.ok) throw new Error("Failed");
        return resp.json();
      })
      .then(data => {

        // data is ARRAY
        const ran =
          Math.floor(Math.random() * data.length);

        document.querySelector("#changeP").textContent =
          `Activity: ${data[ran].activity}`;

      })
      .catch(err => console.log(err));
  }
}



function onSelect(event) {

  let x = event.target.value;

  if (x === "random") {

    document.querySelector("#activityOptions")
      .classList.add("hidden");

    document.querySelector("#LabelFor")
      .classList.add("hidden");

    ran = true;   // ⭐ FIXED
    activity = "none";
  }

  else if (x === "activity") {

    document.querySelector("#activityOptions")
      .classList.remove("hidden");

    document.querySelector("#LabelFor")
      .classList.remove("hidden");

    ran = false;
  }
}
