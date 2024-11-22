const puppeteer = require("puppeteer");

async function collectAccountPostData(username) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Set User-Agent dan viewport untuk menyamar sebagai pengguna nyata
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
  );
  await page.setViewport({ width: 1280, height: 800 });

  const url = `https://www.tiktok.com/@${username}`;
  await page.goto(url, { waitUntil: "networkidle2" });

  let videoLinks = new Set();
  let previousLinksCount = 0;
  await page.evaluate(
    () => new Promise((resolve) => setTimeout(resolve, 10000))
  );

  // Pengguliran tanpa batas hingga semua konten dimuat
  while (true) {
    // Tunggu sejenak untuk memastikan konten terload dengan menggunakan setTimeout
    await page.evaluate(
      () => new Promise((resolve) => setTimeout(resolve, 6000))
    );

    // Ambil semua link video yang muncul
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll('a[href*="/video/"]')).map(
        (el) => el.href
      )
    );

    links.forEach((link) => videoLinks.add(link));

    // Jika tidak ada tambahan link yang ditemukan, akhiri loop
    if (videoLinks.size === previousLinksCount) {
      console.log("Pengambilan video selesai, tidak ada konten tambahan.");
      break;
    }

    previousLinksCount = videoLinks.size;

    // Lakukan scroll ke bawah untuk memuat lebih banyak konten
    await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
  }

  await browser.close();
  console.log("Daftar Link Video:");
  console.log([...videoLinks]);
  return Array.from(videoLinks);
}

module.exports = { collectAccountPostData };
