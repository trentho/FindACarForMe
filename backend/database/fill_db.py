import json


def get_listing_rows(filename):
    with open(filename, "r") as f:
        data = json.load(f)
        rows = []
        for query in data:
            for listing in query["data"]["listings"]:
                rows.append(
                    {
                        "vin": listing["vin"],
                        "ask_price": listing["askPrice"],
                        "msrp": listing["msrp"],
                        "mileage": listing["mileage"],
                        "is_new": listing["isNew"],
                        "first_seen": listing["firstSeen"],
                        "last_seen": listing["lastSeen"],
                        "model_name": listing["modelName"],
                        "brand_name": listing["brandName"],
                        "year": listing["year"],
                        "dealer_id": listing["dealerID"],
                        "color": listing["color"],
                        "interior_color": listing["interiorColor"],
                        "vin_decode": listing["vinDecode"],
                        "horsepower": int(float(listing["vinDecode"]["EngineHP"]))
                        if listing["vinDecode"]["EngineHP"] != ""
                        else None,
                        "engine_cc": int(float(listing["vinDecode"]["DisplacementCC"]))
                        if listing["vinDecode"]["DisplacementCC"] != ""
                        else None,
                        "cylinders": int(listing["vinDecode"]["EngineCylinders"])
                        if listing["vinDecode"]["EngineCylinders"] != ""
                        else None,
                        "charger_rating": int(listing["vinDecode"]["ChargerPowerKW"])
                        if listing["vinDecode"]["ChargerPowerKW"] != ""
                        else None,
                    }
                )
        return rows


def get_fuel_station_rows(filename):
    with open(filename, "r") as f:
        data = json.load(f)
        rows = []
        for n, search in enumerate(data):
            for entry in search:
                rows.append(
                    {
                        "lat_lng": f'{entry["geometry"]["location"]["lat"]}%20{entry["geometry"]["location"]["lng"]}',
                        "business_status": entry["business_status"],
                        "address": entry["formatted_address"],
                        "icon": entry["icon"],
                        "icon_background_color": entry["icon_background_color"],
                        "icon_mask_base_uri": entry["icon_mask_base_uri"],
                        "name": entry["name"],
                        "open_now": entry["opening_hours"]["open_now"]
                        if "opening_hours" in entry
                        and "open_now" in entry["opening_hours"]
                        else False,
                        "photos": entry["photos"] if "photos" in entry else None,
                        "place_id": entry["place_id"],
                        "rating": entry["rating"],
                        "user_ratings_total": entry["user_ratings_total"],
                        "types": entry["types"],
                        "gas_station": n < (len(data) / 2),
                        "charging_station": n >= (len(data) / 2),
                    }
                )
        return rows


def get_spec_rows(complaints_file, recall_file, safety_file):
    complaints = {}
    with open(complaints_file, "r") as f:
        data = json.load(f)
        for query in data:
            for result in query["results"]:
                for product in result["products"]:
                    key = (
                        product["productYear"],
                        product["productMake"],
                        product["productModel"],
                    )
                    if key not in complaints:
                        complaints[key] = []
                    complaints[key].append(
                        {i: result[i] for i in result if i != "products"}
                    )
    recalls = {}
    with open(recall_file, "r") as f:
        data = json.load(f)
        for query in data:
            for result in query["results"]:
                key = (result["ModelYear"], result["Make"], result["Model"])
                if key not in recalls:
                    recalls[key] = []
                recalls[key].append(
                    {
                        i: result[i]
                        for i in result
                        if i not in ("ModelYear", "Make", "Model")
                    }
                )
    with open(safety_file, "r") as f:
        data = json.load(f)
        rows = []
        for query in data:
            for result in query["Results"]:
                row = {
                    i: result[i]
                    for i in result
                    if i
                    not in (
                        "sideBarrierRating-Overall",
                        "combinedSideBarrierAndPoleRating-Front",
                        "combinedSideBarrierAndPoleRating-Rear",
                    )
                }
                row["sideBarrierRatingOverall"] = result["sideBarrierRating-Overall"]
                row["combinedSideBarrierAndPoleRatingFront"] = result[
                    "combinedSideBarrierAndPoleRating-Front"
                ]
                row["combinedSideBarrierAndPoleRatingRear"] = result[
                    "combinedSideBarrierAndPoleRating-Rear"
                ]
                key = (str(result["ModelYear"]), result["Make"], result["Model"])
                if key in complaints:
                    row["complaints"] = str(complaints[key])
                if key in recalls:
                    row["recalls"] = str(recalls[key])
                rows.append(row)

        for row in rows:
            if row["Make"] in row["Model"]:
                # print(row["Model"], end=" -> ")
                if row["Make"].lower() == "audi":
                    row["Model"] = " ".join(row["Model"].split()[1:])
                # print(row["Model"], end=", ")

        return rows


if __name__ == "__main__":
    import sys

    sys.path.append(sys.path[0] + "/..")
    try:
        from flask_init import application, db
    except ModuleNotFoundError:
        print("Error:\tcannot find 'flask_init.py' in working directory.")
        print("\tmake sure fill_db.py is being called from parent directory.")
        exit(-1)
    from models import Listings, FuelStations, Specs

    with application.app_context():
        # Create tables if they don't exist
        db.drop_all()
        db.create_all()

        # Load listing rows
        for row in get_listing_rows("db_data/listings.json"):
            db.session.execute(
                Listings.__table__.insert().prefix_with(" IGNORE").values(**row)
            )
        db.session.commit()

        # Load fuel station rows
        for row in get_fuel_station_rows(
            "database/db_data/gas_and_ev_stations_data.json"
        ):
            db.session.execute(
                FuelStations.__table__.insert().prefix_with(" IGNORE").values(**row)
            )
        db.session.commit()

        # Load make rows
        for row in get_spec_rows(
            "db_data/vehicle_complaint_data.json",
            "db_data/vehicle_recall_data.json",
            "db_data/vehicle_safety_data.json",
        ):
            db.session.execute(
                Specs.__table__.insert().prefix_with(" IGNORE").values(**row)
            )
        db.session.commit()
