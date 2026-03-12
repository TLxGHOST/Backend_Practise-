import qr from "qr-image";
import fs from "node:fs";
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "input",
      name: "text",
      message: "Enter text to convert into QR:"
    }
  ])
  .then((answers) => {
    const data = answers.text;

    const qr_png = qr.image(data, { type: "png" });
    qr_png.pipe(fs.createWriteStream(`${data}.png`));

    console.log(`QR born. Black and white prophecy saved as ${data}.png 🗿`);
  })
  .catch((error) => {
    console.error("The ritual failed:", error); 
  });
