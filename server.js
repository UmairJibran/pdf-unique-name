const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

fs.readdir(path.join(__dirname, "raw"), (err, files) => {
   if (err) return console.error(err);
   let names = [];
   for (let index = 0; index < files.length; index++) {
      let v4UUID = uuid.v4().replace(/-/g, "");
      names.push(v4UUID);
      fs.rename(
         path.join(__dirname, "raw", files[index]),
         path.join(__dirname, "certs", `${v4UUID}.pdf`),
         (err) => {
            if (err) return console.error(err);
         }
      );
   }
   fs.writeFile(
      path.join(__dirname, "certs", "test.json"),
      JSON.stringify(names),
      (err) => {
         if (err) return console.error(err);
      }
   );
});
