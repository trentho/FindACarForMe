import json


def get_uri():
    with open("./SECRET_KEY.json", "r") as file_to_read:
        json_data = json.load(file_to_read)
        return json_data["mysql_uri"]


def get_google_key():
    with open("./SECRET_KEY.json", "r") as file_to_read:
        json_data = json.load(file_to_read)
        return json_data["Google_API_KEY"]
