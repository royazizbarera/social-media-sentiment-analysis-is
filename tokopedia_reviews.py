import logging
import time
import csv
from selenium import webdriver
from selenium.webdriver.edge.service import Service as EdgeService
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.microsoft import EdgeChromiumDriverManager

# Setup Logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Konfigurasi Opsi Edge
options = Options()
options.add_argument("--remote-debugging-port=9222")
options.add_argument("--start-maximized")

# Inisialisasi Driver
service = EdgeService(EdgeChromiumDriverManager().install())
driver = webdriver.Edge(service=service, options=options)

# URL Produk Tokopedia
url = 'https://www.tokopedia.com/advanofficialitstore/true-wireless-earphone-gaming-advan-eargun-buds-bluetooth-5-3-earbuds-tws?extParam=src%3Dshop%26whid%3D15611087'

# Fungsi scrape_reviews untuk Mengambil Data Review
def scrape_reviews():
    logging.info("Starting the scraping process")
    driver.get(url)
    time.sleep(5)

    # Pengguliran Halaman
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
    time.sleep(4)

    # Klik Tombol "Lihat Semua Ulasan"
    try:
        wait = WebDriverWait(driver, 20)
        view_all_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="btnViewAllFeedback"]')))
        ActionChains(driver).move_to_element(view_all_button).click(view_all_button).perform()
        time.sleep(5)
    except Exception as e:
        logging.error(f"Error clicking 'Lihat Semua Ulasan' button: {e}")
        return []

    # Loop Pengambilan Data Review
    reviews = []
    while True:
        review_elements = driver.find_elements(By.CSS_SELECTOR, '#review-feed [data-testid="lblItemUlasan"]')
        for review_element in review_elements:
            try:
                # Perluasan Teks Ulasan (Jika ada tombol "Selengkapnya")
                more_button = review_element.find_element(By.XPATH, './/following-sibling::button[contains(text(), "Selengkapnya")]')
                more_button.click()
                time.sleep(2)
            except:
                logging.info("No 'Selengkapnya' button found; reading full review text as is")
            
            review_text = review_element.text
            reviews.append(review_text)

        # Navigasi ke Halaman Berikutnya
        try:
            next_button = driver.find_element(By.CSS_SELECTOR, '[aria-label="Laman berikutnya"]')
            if next_button.get_attribute("disabled") is not None:
                logging.info("No more pages to navigate")
                break
            else:
                next_button.click()
                time.sleep(5)
        except:
            logging.info("Next button not found; exiting pagination loop")
            break

    return reviews

# Menyimpan Data ke CSV
def save_reviews_to_csv(reviews, filename):
    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        writer.writerow(['Review'])
        for review in reviews:
            writer.writerow([review])
    logging.info(f"Data saved to {filename}")

# Main Function
def main():
    try:
        reviews = scrape_reviews()
        if reviews:
            save_reviews_to_csv(reviews, 'reviews.csv')
    except Exception as e:
        logging.error(f"An error occurred: {e}")
    finally:
        driver.quit()

# Menjalankan Script
if __name__ == "__main__":
    main()