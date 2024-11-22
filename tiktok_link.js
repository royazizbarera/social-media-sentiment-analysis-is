const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const fs = require("fs");
const xlsx = require("xlsx");

// Fungsi untuk mengambil data dari profil TikTok
async function getViewsFromProfile(username, maxVideos = 5) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const url = `https://www.tiktok.com/@${username}`;
  await page.goto(url, { waitUntil: "networkidle2" });

  console.log(`Menunggu 5 detik sebelum scraping...`);
  await new Promise((resolve) => setTimeout(resolve, 5000)); // Jeda awal

  // Ambil data postId, views, dan link video dengan batasan jumlah
  const videoData = await page.evaluate((maxVideos) => {
    const videos = Array.from(document.querySelectorAll('a[href*="/video/"]'))
      .slice(0, maxVideos)
      .map((video) => {
        const viewsElement = video.querySelector("strong"); // Elemen views
        const postId = video.href.split("/video/")[1]; // Ambil postId dari URL

        return {
          postId: postId || null,
          linkPost: video.href,
          views: viewsElement ? viewsElement.innerText : null, // Tetap dalam format asli (K atau M)
        };
      });
    return videos;
  }, maxVideos);

  await browser.close();
  return videoData;
}

// Fungsi untuk mengambil detail dari halaman video
async function getVideoDetails(videoUrl) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(videoUrl, { waitUntil: "networkidle2" });

  // Ambil detail video
  const videoDetails = await page.evaluate(() => {
    const getInnerText = (selector) =>
      document.querySelector(selector)?.innerText || null;

    return {
      postTitle: getInnerText('[data-e2e="browse-video-desc"]'), // Selector untuk deskripsi video
      likes: getInnerText('[data-e2e="like-count"]'), // Selector untuk likes
      totalComments: getInnerText('[data-e2e="comment-count"]'), // Selector untuk total komentar
    };
  });

  await browser.close();
  return videoDetails;
}

// Fungsi utama untuk menggabungkan data profil dan detail video
async function scrapeTikTok(username, maxVideos = 5) {
  console.log(`Mengambil data dari profil ${username}...`);
  const profileData = await getViewsFromProfile(username, maxVideos);

  console.log(`Mengambil detail hingga ${maxVideos} video...`);
  for (let video of profileData) {
    const details = await getVideoDetails(video.linkPost);
    video.postTitle = details.postTitle || "No Title"; // Ambil deskripsi video
    video.likes = details.likes || null;
    video.totalComments = details.totalComments || null;
  }

  return profileData;
}

// Simpan ke JSON
function saveToJSON(data, filename) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`Data berhasil disimpan dalam file ${filename}`);
}

// Simpan ke Excel
function saveToExcel(data, filename) {
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, "TikTok Data");
  xlsx.writeFile(workbook, filename);
  console.log(`Data berhasil disimpan dalam file ${filename}`);
}

// Fungsi utama untuk menjalankan
(async () => {
  const username = "advan.indonesia"; // Ganti dengan username TikTok yang diinginkan
  const maxVideos = 3; // Batasi jumlah video untuk percobaan
  const data = await scrapeTikTok(username, maxVideos);

  // Simpan hasil dalam format JSON dan Excel
  saveToJSON(data, `${username}_tiktok_data.json`);
  saveToExcel(data, `${username}_tiktok_data.xlsx`);

  console.log("Pengambilan data selesai!");
})();
