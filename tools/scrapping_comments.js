const { getCommentsData } = require("./getCommentsData");
const { saveToJSON } = require("./saveToJSON");

async function main() {
  // Ambil data komentar dari video TikTok
  const videoLink =
    "https://www.tiktok.com/@advan.indonesia/video/7412853218570423560";
  const allComments = await getCommentsData(videoLink);
  // Simpan data komentar dalam format JSON
  saveToJSON(allComments, "comments_raw.json");
  console.log("Data berhasil disimpan dalam comments_raw.json");
}

main().catch(console.error);
