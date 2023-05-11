import requests
import json
import time

import sys
sys.path.append(sys.path[0]+'/..')
from get_secrets import get_google_key
google_key = get_google_key()


all_stations = []
api_calls = 1
## Gas Stations
url = (
    f"https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas%20stations%20in%20Texas&key={google_key}"
)
while True:
    response = requests.request("GET", url).json()
    if response["status"] != "OK":
        print(f"ERROR with API call:\n{response}")
        break
    else:
        print(f"API call #{api_calls} return OK")
        api_calls += 1
        
    all_stations.append(response["results"])
    if 'next_page_token' not in response: break
    url = (
        f"https://maps.googleapis.com/maps/api/place/textsearch/json?query=gas%20stations%20in%20Texas&key={google_key}&pagetoken={response['next_page_token']}"
    )
    time.sleep(10)

## EV Charging Stations
url = (
    f"https://maps.googleapis.com/maps/api/place/textsearch/json?query=ev%20charing%20stations%20in%20Texas&key={google_key}"
)
while True:
    response = requests.request("GET", url).json()
    if response["status"] != "OK":
        print(f"ERROR with API call:\n{response}")
        break
    else:
        print(f"API call #{api_calls} return OK")
        api_calls += 1
        
    all_stations.append(response["results"])
    if 'next_page_token' not in response: break
    url = (
        f"https://maps.googleapis.com/maps/api/place/textsearch/json?query=ev%20charing%20stations%20in%20Texas&key={google_key}&pagetoken={response['next_page_token']}"
    )
    time.sleep(10)

with open("database/db_data/gas_and_ev_stations_data.json", "w") as json_file:
    json.dump(all_stations, json_file, indent=4)
