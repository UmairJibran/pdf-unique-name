const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

fs.readdir(path.join(__dirname, "certs"), (err, files) => {
   let names = "";
   if (err) return console.error(err);
   for (let index = 0; index < files.length; index++) {
      let v4UUID = uuid.v4().replace(/-/g, "");
      fs.rename(
         path.join(__dirname, "certs", files[index]),
         path.join(__dirname, "certs", `${v4UUID}.pdf`),
         (err) => {
            if (err) return console.error(err);
         }
      );
      names += `${v4UUID}\n`;
   }
   fs.writeFile(path.join(__dirname, "certs", "ids.txt"), names, (err) => {
      if (err) return console.error(err);
   });
});
