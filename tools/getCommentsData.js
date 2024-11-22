const { HLPTiktokApi } = require("@hlpi/tiktok-api");

async function getCommentsData(videoLink) {
  const tiktok = new HLPTiktokApi();
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

    return allComments;
  } catch (error) {
    console.error("Error in script:", error);
  }
};

module.exports = { getCommentsData };