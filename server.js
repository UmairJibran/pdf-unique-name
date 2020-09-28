const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

fs.readdir(path.join(__dirname, "certs"), async (err, files) => {
   if (err) return console.error(err);
   await fs.appendFile(
      path.join(__dirname, "certs", "ids.json"),
      `{"ids":[`,
      (err) => {
         if (err) return console.error(err);
      }
   );
   for (let index = 0; index < files.length; index++) {
      let v4UUID = uuid.v4().replace(/-/g, "");
      await fs.rename(
         path.join(__dirname, "certs", files[index]),
         path.join(__dirname, "certs", `${v4UUID}.pdf`),
         (err) => {
            if (err) return console.error(err);
         }
      );
      await fs.appendFile(
         path.join(__dirname, "certs", "ids.json"),
         `"${v4UUID}",`,
         (err) => {
            if (err) return console.error(err);
         }
      );
   }
   fs.appendFile(path.join(__dirname, "certs", "ids.json"), `]}`, (err) => {
      if (err) return console.error(err);
   });
});
