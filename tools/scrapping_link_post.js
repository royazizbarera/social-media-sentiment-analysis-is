const xlsx = require("xlsx");
const { collectAccountPostData } = require("./collectAccountPostData");
const { saveToJSON } = require("./saveToJSON");

function saveToExcel(data, filename) {
  const worksheet = xlsx.utils.json_to_sheet(
    data.map((link) => ({ VideoLink: link }))
  );
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "TikTok Links");
  xlsx.writeFile(workbook, filename);
  console.log(`Data berhasil disimpan dalam file ${filename}`);
}

// Fungsi utama untuk menjalankan pengambilan data dan penyimpanan ke file JSON dan Excel
async function main(username) {
  const links = await collectAccountPostData(username);
  const jsonFilename = `${username}_tiktok_links.json`;
  const excelFilename = `${username}_tiktok_links.xlsx`;

  // Simpan hasil dalam format JSON
  saveToJSON(links, jsonFilename);

  // Simpan hasil dalam format Excel
  saveToExcel(links, excelFilename);
}

// Masukkan username TikTok yang ingin diambil data postingannya
main("advan.indonesia").catch(console.error);