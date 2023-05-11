#!/usr/bin/python3

import os
from flask import jsonify, request
from flask_cors import cross_origin

from flask_init import application, db
from models import Listings, FuelStations, Specs
from schema import listings_schema, fuelstations_schema, specs_schema

###
# Define app routes for api calls
###

FUEL_STATIONS_SORT = (
    "id",
    "rating",
    "user_ratings_total",
    "name",
    "location",
    "address",
)
LISTINGS_SORT = (
    "id",
    "ask_price",
    "msrp",
    "mileage",
    "cylinders",
    "horsepower",
    "engine_cc",
)
SPECS_SORT = (
    "id",
    "OverallRating",
    "OverallSideCrashRating",
    "ComplaintsCount",
    "InvestigationCount",
    "RecallsCount",
    "sideBarrierRatingOverall",
)

FUEL_STATIONS_FILTER = (
    "name",
    "open_now",
    "gas_station",
    "charging_station",
    "is_operational",
)
LISTINGS_FILTER = ("make", "model", "year", "is_new", "color")
SPECS_FILTER = ("make", "model", "year", "no_complaints", "no_recalls")


@application.route("/", methods=["GET"])
@cross_origin()
def default():
    return ""


@application.route("/fuel_stations", methods=["GET"])
@cross_origin()
def all_fuel_stations():
    page = (
        int(request.args.get("page"))
        if str(request.args.get("page")).isnumeric()
        else 0
    )
    count = (
        int(request.args.get("count"))
        if str(request.args.get("count")).isnumeric()
        else 0
    )
    sort = (
        request.args.get("sort")
        if str(request.args.get("sort")) in FUEL_STATIONS_SORT
        else "id"
    )

    result = []

    filter_args = ""
    for filter in FUEL_STATIONS_FILTER:
        filter_parameter = request.args.get(filter)
        if filter_parameter == None or filter_parameter.lower() == "false":
            continue

        if filter == "name":
            filter_args += f'AND name="{filter_parameter}"'
        elif filter == "open_now":
            filter_args += f"AND open_now=True "
        elif filter == "gas_station":
            filter_args += f"AND gas_station=True "
        elif filter == "charging_station":
            filter_args += f"AND charging_station=True "
        elif filter == "is_operational":
            filter_args += f"AND business_status='OPERATIONAL' "

    if sort == "location":
        from_location = request.args.get("lat_lng")
        if from_location == None:
            return jsonify(
                {
                    "page": page,
                    "count": 0,
                    "results": [],
                    "ERROR": "Must include lat_lng for location sort",
                }
            )
        from_x_y_str = from_location.split(" ")
        if (
            len(from_x_y_str) != 2
            or (
                not from_x_y_str[0]
                .replace(("-"), (""))
                .replace(("."), (""))
                .isnumeric()
            )
            or (
                not from_x_y_str[1]
                .replace(("-"), (""))
                .replace(("."), (""))
                .isnumeric()
            )
        ):
            return jsonify(
                {
                    "page": page,
                    "count": 0,
                    "results": [],
                    "ERROR": "Must use lat_lng format of: lat%20lng",
                }
            )
        from_x_y = (float(from_x_y_str[0]), float(from_x_y_str[1]))

        query = db.session.execute(
            f"""SELECT * FROM fuel_stations WHERE True {filter_args};"""
        )
        all_results = fuelstations_schema.dump(query, many=True)

        def distance_to(to_location):
            to_x_y = to_location.split("%20")
            to_x_y = (float(to_x_y[0]), float(to_x_y[1]))
            return (
                (from_x_y[0] - to_x_y[0]) ** 2 + (from_x_y[1] - to_x_y[1]) ** 2
            ) ** 0.5

        all_results.sort(
            key=lambda entry: distance_to(entry["lat_lng"]),
            reverse=(str(request.args.get("descending")).lower() == "true"),
        )

        if request.args.get("search") is None:
            result = all_results[count * (page - 1) : count * page]
        else:
            result = all_results
    else:
        desc = (
            "DESC" if str(request.args.get("descending")).lower() == "true" else "ASC"
        )
        query = db.session.execute(
            f"""SELECT * FROM fuel_stations
                    WHERE {sort} != 'Not Rated' {filter_args}
                    ORDER BY {sort} {desc}, id ASC
                    LIMIT {count if request.args.get("search") is None else 1000000000000000}
                    OFFSET {count*(page-1)  if request.args.get("search") is None else 0};"""
        )
        result = fuelstations_schema.dump(query, many=True)

    search = request.args.get("search")
    if search is not None:
        search_parameters = search.split()

        def search_function(entry):
            entry_str = str(entry).lower()
            score = 1
            for search_parameter in search_parameters:
                keyword_count = entry_str.count(search_parameter.lower())
                score *= keyword_count + 1
            return score

        result.sort(key=search_function, reverse=True)
        result = result[count * (page - 1) : count * page]

    output = {"page": page, "count": len(result), "results": result}
    (total_results,) = db.session.execute(
        f"""SELECT count(id) FROM fuel_stations
                WHERE {sort if sort != 'location' else 'id'} != 'Not Rated' {filter_args}"""
    ).first()
    if total_results <= count * page:
        output["last_page"] = True

    return jsonify(output)


@application.route("/fuel_stations/<int:id>", methods=["GET"])
@cross_origin()
def id_fuel_station(id):
    query = db.session.query(FuelStations).filter(FuelStations.id == id).first()
    query_result = fuelstations_schema.dump(query)

    # Link to Specs
    spec_query = (
        db.session.query(Specs)
        .filter(Specs.OverallFrontCrashRating != "Not Rated")
        .filter(Specs.OverallRating != "Not Rated")
        .filter(Specs.OverallSideCrashRating != "Not Rated")
        .order_by(Specs.OverallFrontCrashRating.desc())
        .order_by(Specs.OverallSideCrashRating.desc())
        .order_by(Specs.OverallRating.desc())
        .limit(10)
    )
    spec_results = specs_schema.dump(spec_query, many=True)
    query_result["specs"] = spec_results

    # Link to Listings
    listing_query = (
        db.session.query(Listings)
        .filter(Listings.ask_price != 0.0)
        .order_by(Listings.ask_price)
        .limit(10)
    )
    listing_results = listings_schema.dump(listing_query, many=True)
    query_result["listings"] = listing_results

    return jsonify(query_result)


@application.route("/listings", methods=["GET"])
@cross_origin()
def all_listings():
    page = (
        int(request.args.get("page"))
        if str(request.args.get("page")).isnumeric()
        else 0
    )
    count = (
        int(request.args.get("count"))
        if str(request.args.get("count")).isnumeric()
        else 0
    )
    sort = (
        request.args.get("sort")
        if str(request.args.get("sort")) in LISTINGS_SORT
        else "id"
    )
    desc = "DESC" if str(request.args.get("descending")).lower() == "true" else "ASC"

    filter_args = ""
    for filter in LISTINGS_FILTER:
        filter_parameter = request.args.get(filter)
        if filter_parameter == None or filter_parameter.lower() == "false":
            continue

        if filter == "make":
            filter_args += f"AND brand_name='{filter_parameter}' "
        elif filter == "model":
            filter_args += f"AND model_name='{filter_parameter}' "
        elif filter == "year":
            filter_args += f"AND year='{filter_parameter}' "
        elif filter == "is_new":
            filter_args += f"AND is_new=True "
        elif filter == "color":
            filter_args += f"AND color='{filter_parameter}' "

    query = db.session.execute(
        f"""SELECT * FROM listings
                WHERE {sort} != 'Not Rated' AND {sort} IS NOT NULL {filter_args}
                ORDER BY {sort} {desc}, id ASC
                LIMIT {count if request.args.get("search") is None else 1000000000000000}
                OFFSET {count*(page-1)  if request.args.get("search") is None else 0};"""
    )
    result = listings_schema.dump(query, many=True)

    search = request.args.get("search")
    if search is not None:
        search_parameters = search.split()

        def search_function(entry):
            entry_str = str(entry).lower()
            score = 1
            for search_parameter in search_parameters:
                keyword_count = entry_str.count(search_parameter.lower())
                score *= keyword_count + 1
            return score

        result.sort(key=search_function, reverse=True)
        result = result[count * (page - 1) : count * page]

    output = {"page": page, "count": len(result), "results": result}
    (total_results,) = db.session.execute(
        f"""SELECT count(id) FROM listings
                WHERE {sort} != 'Not Rated' AND {sort} IS NOT NULL {filter_args}"""
    ).first()
    if total_results <= count * page:
        output["last_page"] = True

    return jsonify(output)


@application.route("/listings/<int:id>", methods=["GET"])
@cross_origin()
def id_listing(id):
    query = db.session.query(Listings).filter(Listings.id == id).first()
    query_result = listings_schema.dump(query)

    # Link to Specs
    spec_query = (
        db.session.query(Specs)
        .filter(Specs.ModelYear == query_result["year"])
        .filter(Specs.Make == query_result["brand_name"])
        .filter(Specs.Model == query_result["model_name"])
        .first()
    )
    spec_results = specs_schema.dump(spec_query)
    query_result["specs"] = spec_results

    # Link to Fuel Stations
    fuelstation_query = None
    if query_result["brand_name"] == "TESLA":
        fuelstation_query = (
            db.session.query(FuelStations).filter(FuelStations.charging_station == True).order_by(FuelStations.rating.desc()).limit(10)
        )
    else:
        fuelstation_query = (
            db.session.query(FuelStations).filter(FuelStations.gas_station == True).order_by(FuelStations.rating.desc()).limit(10)
        )
    fuelstation_results = fuelstations_schema.dump(fuelstation_query, many=True)
    query_result["fuel_stations"] = fuelstation_results

    return jsonify(query_result)


@application.route("/specs", methods=["GET"])
@cross_origin()
def all_specs():
    page = (
        int(request.args.get("page"))
        if str(request.args.get("page")).isnumeric()
        else 0
    )
    count = (
        int(request.args.get("count"))
        if str(request.args.get("count")).isnumeric()
        else 0
    )
    sort = (
        request.args.get("sort")
        if str(request.args.get("sort")) in SPECS_SORT
        else "id"
    )
    desc = "DESC" if str(request.args.get("descending")).lower() == "true" else "ASC"

    filter_args = ""
    for filter in SPECS_FILTER:
        filter_parameter = request.args.get(filter)
        if filter_parameter == None or filter_parameter.lower() == "false":
            continue

        if filter == "make":
            filter_args += f"AND make='{filter_parameter}' "
        elif filter == "model":
            filter_args += f"AND model='{filter_parameter}' "
        elif filter == "year":
            filter_args += f"AND modelyear='{filter_parameter}' "
        elif filter == "no_complaints":
            filter_args += f"AND ComplaintsCount=0 "
        elif filter == "no_recalls":
            filter_args += f"AND RecallsCount=0 "

    query = db.session.execute(
        f"""SELECT id, VehiclePicture, VehicleDescription, OverallRating, OverallSideCrashRating, sideBarrierRatingOverall, SidePoleCrashRating, ComplaintsCount, RecallsCount, InvestigationCount, FrontCrashPicture FROM specs
                WHERE {sort} != 'Not Rated' {filter_args}
                ORDER BY {sort} {desc}, id ASC
                LIMIT {count if request.args.get("search") is None else 1000000000000000}
                OFFSET {count*(page-1)  if request.args.get("search") is None else 0};"""
    )
    result = specs_schema.dump(query, many=True)

    search = request.args.get("search")
    if search is not None:
        search_parameters = search.split()

        def search_function(entry):
            entry_str = str(entry).lower()
            score = 1
            for search_parameter in search_parameters:
                keyword_count = entry_str.count(search_parameter.lower())
                score *= keyword_count + 1
            return score

        result.sort(key=search_function, reverse=True)
        result = result[count * (page - 1) : count * page]

    output = {"page": page, "count": len(result), "results": result}
    (total_results,) = db.session.execute(
        f"""SELECT count(id) FROM specs
                WHERE {sort} != 'Not Rated' {filter_args}"""
    ).first()
    if total_results <= count * page:
        output["last_page"] = True

    return jsonify(output)


@application.route("/specs/<int:id>", methods=["GET"])
@cross_origin()
def id_spec(id):
    query = db.session.query(Specs).filter(Specs.id == id).first()
    query_result = specs_schema.dump(query)

    # Link to Listings
    listing_query = (
        db.session.query(Listings)
        .filter(Listings.year == query_result["ModelYear"])
        .filter(Listings.brand_name == query_result["Make"])
        .filter(Listings.model_name == query_result["Model"])
        .limit(10)
    )
    listing_result = listings_schema.dump(listing_query, many=True)
    query_result["listings"] = listing_result

    # Link to Fuel Stations
    fuelstation_query = None
    if query_result["Make"] == "TESLA":
        fuelstation_query = (
            db.session.query(FuelStations).filter(FuelStations.charging_station == True).order_by(FuelStations.rating.desc()).limit(10)
        )
    else:
        fuelstation_query = (
            db.session.query(FuelStations).filter(FuelStations.gas_station == True).order_by(FuelStations.rating.desc()).limit(10)
        )
    fuelstation_results = fuelstations_schema.dump(fuelstation_query, many=True)
    query_result["fuel_stations"] = fuelstation_results

    return jsonify(query_result)


###
# Run the Flask app
###
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    application.run(debug=True, host="0.0.0.0", port=port)
