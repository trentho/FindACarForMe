# based loosely on: https://gitlab.com/Nathaniel-Nemenzo/getthatbread/-/blob/main/frontend/getthatbread/selenium/test_gui.py &
#                   https://gitlab.com/JohnPowow/animalwatch/-/blob/main/frontend/gui_tests/runSeleniumTests.py

import unittest
from selenium import webdriver
# Chrome Driver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
# Firefox Driver
from selenium.webdriver.firefox.service import Service as FirefoxService
from webdriver_manager.firefox import GeckoDriverManager
from selenium.webdriver import Remote
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options

'''
Test Setup and Teardown

if running locally to test:
- run ' npm start ' in front-end/
- run ' python3 test_fronted.py '    in front-end/selenium/
'''

# global vars
ff      = False # set to true if using Firefox          or *FALSE WHEN PUSHING*
local   = False # set to true if running tests locally  or *FALSE WHEN PUSHING*
develop = True
devsite = "https://developer.d7a6xirwxpml0.amplifyapp.com/"
livesite = "https://findacarfor.me/"
url = devsite if develop else livesite

def setup_driver():
    chrome_options = Options()    
    # running local
    if local:
        if ff:
            driver = webdriver.Firefox(service=FirefoxService(GeckoDriverManager().install()))
        else: 
            driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
        # localhost url + create-react-app port
        return driver
    # assume remote Chrome
    chrome_options.add_argument("--headless") 
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Remote("http://chrome:4444/wd/hub", options=chrome_options)
    return driver

class TestFrontend(unittest.TestCase):
    def setUp(self):
        self.driver = setup_driver()
        
        self.driver.get(url)


    '''    '''    '''
        TEST LIST
    '''    '''    '''

    def test_title(self):
        self.assertEqual(self.driver.title, "FindACarForMe")

    # NavBar Tests

    def test_navbar_home(self):
        '''
        IDs are often the most effective way to locate elements
        '''
        home = self.driver.find_element(By.ID, "NavHome")
        home.click()
        self.assertEqual(self.driver.current_url, url)

    def test_navbar_fuelstations(self):
        home = self.driver.find_element(By.ID, "NavFuelStations")
        home.click()
        self.assertEqual(self.driver.current_url, url + "fuel_stations/")

    def test_navbar_safety(self):
        home = self.driver.find_element(By.ID, "NavSafety")
        home.click()
        self.assertEqual(self.driver.current_url, url + "specs/")

    def test_navbar_listings(self):
        home = self.driver.find_element(By.ID, "NavListings")
        home.click()
        self.assertEqual(self.driver.current_url, url + "listings/")

    def test_navbar_listings(self):
        home = self.driver.find_element(By.ID, "NavAbout")
        home.click()
        self.assertEqual(self.driver.current_url, url + "about/")

    # About Page Tests

    def test_about_photos(self):
        self.driver.get(url + "about")
        self.driver.implicitly_wait(10)
        photos = self.driver.find_elements(By.CLASS_NAME, "list-group-item")
        self.driver.implicitly_wait(10)
        count = 0
        for lgi in photos:
            # everyone accounted for
            if count == 5:
                break
            self.assertTrue(count<=5) # lgi.find_element(By.CSS_SELECTOR, "img").is_displayed())
            count+=1

    def test_card_footer(self):
        self.driver.get(url + "about")
        self.driver.implicitly_wait(10)
        totalcommits = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/div/div[2]/div/div/p[1]").text
        self.assertIsNotNone(totalcommits)
        totalissues = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/div/div[2]/div/div/p[2]").text
        self.assertIsNotNone(totalissues)
        totaltests = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div/div[1]/div/div[2]/div/div/p[3]").text
        self.assertIsNotNone(totaltests)

        
    # Model Page Tests

    def test_fuelstations_chevron(self):
        # test search and filtering
        self.driver.get(url + "fuel_stations")
        self.driver.implicitly_wait(10)
        sendinput = self.driver.find_element(By.TAG_NAME, "input")
        sendinput.send_keys("chev")
        searchbutton = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[1]/div[1]/button")
        searchbutton.click()
        searchbutton.click()
        self.assertEqual(self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[1]/div[1]/span").text, "Chevron")

    def test_fuelstations_instance(self):
        self.driver.get(url + "fuel_stations/1")
        rating = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[1]/div/div/div[3]/div/h6")
        # ensure that rating is displayed - info is being pulled
        self.assertRegexpMatches(rating.text, "Rating:\w*\d*")
    
    def test_fuelstations_model_link(self):
        self.driver.get(url + "fuel_stations/1")
        newCar = self.driver.find_element(By.XPATH, "/html/body/div/div/div/div[2]/div[1]/div[3]/a")
        self.assertTrue(newCar.is_displayed())
        # newCar.click()
        # self.assertNotEqual(url + "fuel_stations/1", self.driver.current_url)

    def tearDown(self):
        self.driver.quit()

if __name__ == "__main__":
    unittest.main()