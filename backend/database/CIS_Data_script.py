from fileinput import filename
import requests
import json

# Car Listings Model

cis_key = ""
with open("./SECRET_KEY.json", "r") as file_to_read:
    json_data = json.load(file_to_read)
    cis_key = json_data["CIS_API_KEY"]

# url = "https://cis-automotive.p.rapidapi.com/getModels"

headers = {
    "X-RapidAPI-Key": cis_key,
    "X-RapidAPI-Host": "cis-automotive.p.rapidapi.com",
}

url = "https://cis-automotive.p.rapidapi.com/listingsByRegion"

listing_list = []

with open("carModels.json") as model_file:
    modelData = json.load(model_file)
    for model_dic in modelData:
        for model_name in model_dic.values():
            querystring = {
                "regionName": "REGION_STATE_TX",
                "modelName": model_name,
                "daysBack": "45",
                "newCars": "true",
            }
            print("🐭🐭🐭🐭", model_name)
            listings_data = requests.request(
                "GET", url, headers=headers, params=querystring
            ).json()
            print("🦊🦊🦊🦊", listings_data)
            listing_list.append(listings_data)


with open("listings.json", "w") as json_file:
    json.dump(listing_list, json_file, indent=4, separators=(",", ": "))
