const fs = require("fs");

function saveToJSON(data, filename) {
  fs.writeFileSync
  (filename, JSON.stringify(data, null, 2));
  console.log(`Data berhasil disimpan dalam file ${filename}`);
}

module.exports = { saveToJSON };