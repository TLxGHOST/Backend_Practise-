
  const input = document.getElementById("floatingInput");
  const logo = document.getElementById("logo");
  const pass = document.getElementById("floatingPassword")

  const formFields = [input, pass].filter(Boolean);
  formFields.forEach(x => {
    x.addEventListener("focus", () => {
      logo.src = "/logos/blink.png";
    });
    x.addEventListener("blur", () => {
      logo.src = "/logos/idle.png";
    });
  })

