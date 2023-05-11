import json
import requests
import time
from fileinput import filename
from urllib.request import urlopen


# cis_key = ''
# with open('./SECRET_KEY.json', 'r') as file_to_read:
#     json_data = json.load(file_to_read)
#     cis_key = json_data["CIS_API_KEY"]


# headers = {
#     "X-RapidAPI-Key": cis_key,
#     "X-RapidAPI-Host": "cis-automotive.p.rapidapi.com"
# }

# url = "https://cis-automotive.p.rapidapi.com/getModels"

# makemodellist = []

# with open('brandNames.json') as model_file:
#     modelData = json.load(model_file)
#     for brand in modelData:
#         querystring = {"brandName": modelData[brand]}
#         response = requests.request("GET", url, headers=headers, params=querystring).json()
#         makemodellist.append(response)

# with open('make_and_model.json', 'w') as json_file:
#     json.dump(makemodellist, json_file, indent=4, separators=(',',': '))


## Grabs all of the car makes

# url = "https://api.nhtsa.gov/SafetyRatings/modelyear/2022/"

# car_makes = requests.request("GET", url).json()

# with open('NHTSAData/car_makes.json', 'w') as json_file:
#     json.dump(car_makes, json_file, indent=4, separators=(',',': '))


## Grabs all of the models

# all_models = []

# with open('NHTSAData/car_makes.json') as makes_file:
#     makeData = json.load(makes_file)
#     makeData1 = makeData.get("Results")
#     for make in makeData1:
#         url = "https://api.nhtsa.gov/SafetyRatings/modelyear/2022/make/" + make.get("Make")
#         print(url)
#         car_models = requests.request("GET", url).json()
#         all_models.append(car_models)

# with open('NHTSAData/car_models.json', 'w') as json_file:
#     json.dump(all_models, json_file, indent=4, separators=(',',': '))


## Gets vehicle ids for all car models

# vehicle_IDs = []

# with open('NHTSAData/car_models.json') as car_models_file:
#     modelData = json.load(car_models_file)
#     for result in modelData:
#         modelData1 = result.get("Results")
#         for car_model in modelData1:
#             url = "https://api.nhtsa.gov/SafetyRatings/modelyear/2022/make/" + car_model.get("Make") + "/model/" + car_model.get("Model")
#             print(url)
#             vehicle_id = requests.request("GET", url).json()
#             vehicle_IDs.append(vehicle_id)

# with open('NHTSAData/vehicle_ids.json', 'w') as json_file:
#     json.dump(vehicle_IDs, json_file, indent=4, separators=(',',': '))


## Gets safety data for each vehicle id

# safety_data_list = []

# with open('NHTSAData/vehicle_ids.json') as vehicle_ids_file:
#     idData = json.load(vehicle_ids_file)
#     for vehicle in idData:
#         vehicle_info = vehicle.get("Results")
#         for data in vehicle_info:
#             vehicle_id = data.get("VehicleId")
#             print("vehicle_id: ", vehicle_id)
#             url = "https://api.nhtsa.gov/SafetyRatings/VehicleId/" + str(vehicle_id)
#             try:
#                 safety_data = requests.request("GET", url).json()
#             except:
#                 print("exception")
#                 time.sleep(.5)
#                 safety_data = requests.request("GET", url).json()
#             safety_data_list.append(safety_data)
#         with open('NHTSAData/vehicle_safety_data.json', 'w') as json_file:
#             json.dump(safety_data_list, json_file, indent=4, separators=(',',': '))

# with open('NHTSAData/vehicle_safety_data.json', 'w') as json_file:
#     json.dump(safety_data_list, json_file, indent=4, separators=(',',': '))


## Grabs recalls for all cars

# recall_data = []

# with open('NHTSAData/car_models.json') as car_models_file:
#     modelData = json.load(car_models_file)
#     for result in modelData:
#         modelData1 = result.get("Results")
#         for car_model in modelData1:
#             url = "https://api.nhtsa.gov/recalls/recallsByVehicle?make=" + car_model.get("Make") + "&model=" + car_model.get("Model") + "&modelYear=2022"
#             print(url)
#             vehicle_recall = requests.request("GET", url).json()
#             recall_data.append(vehicle_recall)

# with open('NHTSAData/vehicle_recall_data.json', 'w') as json_file:
#     json.dump(recall_data, json_file, indent=4, separators=(',',': '))


## Grabs all vehicle complaint data

complaint_data = []

with open("NHTSAData/car_models.json") as car_models_file:
    modelData = json.load(car_models_file)
    for result in modelData:
        modelData1 = result.get("Results")
        for car_model in modelData1:
            url = (
                "https://api.nhtsa.gov/complaints/complaintsByVehicle?make="
                + car_model.get("Make")
                + "&model="
                + car_model.get("Model")
                + "&modelYear=2022"
            )
            print(url)
            vehicle_complaint = requests.request("GET", url).json()
            complaint_data.append(vehicle_complaint)

with open("NHTSAData/vehicle_complaint_data.json", "w") as json_file:
    json.dump(complaint_data, json_file, indent=4, separators=(",", ": "))
