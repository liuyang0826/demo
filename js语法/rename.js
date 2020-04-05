const fs = require("fs");
fs.readdirSync(__dirname)
  .filter((item) => item !== "rename.js" && item !== "rename.bat")
  .forEach((item) => {
    let name = item;
    let regex = new RegExp("[\\u4E00-\\u9FFF]", "g");
    for (let i = 0; i < name.length; i++) {
      if (regex.test(name[i]) && name[i] !== "、") {
        name = name.substr(i);
        break;
      }
    }
    fs.renameSync(item, name)
  });
