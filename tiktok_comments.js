const { HLPTiktokApi } = require("@hlpi/tiktok-api");
const xlsx = require("xlsx");
const fs = require("fs");

(async () => {
  const tiktok = new HLPTiktokApi();
  const videoLink =
    "https://www.tiktok.com/@advan.indonesia/video/7412853218570423560"; // Ganti dengan URL video TikTok yang sesuai
  const count = 50; // Ambil lebih banyak komentar dalam sekali permintaan
  let cursor = 0;
  let hasMore = true;
  const allComments = [];
  const rawData = [];

  try {
    while (hasMore) {
      const data = await tiktok.getComment({
        link: videoLink,
        count: count,
        cursor: cursor,
      });

      if (data && data.status_code === 0 && data.comments) {
        // Simpan semua data mentah ke dalam rawData untuk Excel
        rawData.push(...data.comments);

        // Ambil data yang sudah diformat untuk penyimpanan JSON dan Excel
        data.comments.forEach((comment) => {
          allComments.push({
            Text: comment.text,
            Likes: comment.digg_count,
            Created_At: new Date(comment.create_time * 1000).toLocaleString(),
          });
        });

        cursor = data.cursor;
        hasMore = data.has_more;

        console.log(
          "Jumlah komentar yang diambil sejauh ini:",
          allComments.length
        );
      } else {
        console.error("Terjadi kesalahan atau mencapai batas data:", data);
        hasMore = false;
      }
    }

    // Simpan data mentah sebagai file JSON
    fs.writeFileSync("comments_raw.json", JSON.stringify(rawData, null, 2));
    console.log("Data mentah berhasil disimpan dalam comments_raw.json");

    // Siapkan workbook untuk file Excel
    const workbook = xlsx.utils.book_new();

    // Tambahkan seluruh data mentah ke dalam sheet "All Data Comments"
    const rawJsonSheet = xlsx.utils.json_to_sheet(rawData);
    xlsx.utils.book_append_sheet(workbook, rawJsonSheet, "All Data Comments");

    // Tambahkan data terformat ke dalam sheet "Formatted Comments"
    const commentsSheet = xlsx.utils.json_to_sheet(allComments);
    xlsx.utils.book_append_sheet(workbook, commentsSheet, "Formatted Comments");

    // Simpan workbook ke dalam file Excel
    xlsx.writeFile(workbook, "tiktok_comments.xlsx");
    console.log(
      "Data berhasil disimpan dalam tiktok_comments.xlsx dan comments_raw.json"
    );
  } catch (error) {
    console.error("Error in script:", error);
  }
})();
