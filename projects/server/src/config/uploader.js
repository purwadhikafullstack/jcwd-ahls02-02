const multer = require("multer");
const fs = require("fs");
const { join } = require("path");

module.exports = {
  uploader: (directory, fileNamePrefix) => {
    // let defaultDir = "./src/public";
    let defaultDir = join(__dirname, "../public");
    const storageUploader = multer.diskStorage({
      destination: (req, file, cb) => {
        const pathDir = directory ? defaultDir + directory : defaultDir;

        if (fs.existsSync(pathDir)) {
          console.log(`Directory ${pathDir} exist ✅`);
          cb(null, pathDir);
        } else {
          fs.mkdir(pathDir, { recursive: true }, (err) => cb(err, pathDir));
          console.log(`Success created ${pathDir}`);
        }
      },

      filename: (req, file, cb) => {
        let ext = file.originalname.split(".");

        let filename = fileNamePrefix + Date.now() + "." + ext[ext.length - 1];

        cb(null, filename);
      },
    });

    const fileFilter = (req, file, cb) => {
      const extFilter = /\.(jpg|png|gif|jpeg)/;

      if (!file.originalname.toLowerCase().match(extFilter)) {
        return cb(new Error("Your file ext are denied", false));
      }

      cb(null, true);
    };

    return multer({ storage: storageUploader, fileFilter });
  },
};
