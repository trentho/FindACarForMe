import unittest

from database.fill_db import get_listing_rows, get_fuel_station_rows, get_spec_rows


class Tests(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        # Call parent
        super(Tests, self).__init__(*args, **kwargs)

        # Initialize our tables
        self.listing_table = get_listing_rows("database/db_data/listings.json")
        self.fuel_station_table = get_fuel_station_rows(
            "database/db_data/gas_and_ev_stations_data.json"
        )
        self.spec_table = get_spec_rows(
            "database/db_data/vehicle_complaint_data.json",
            "database/db_data/vehicle_recall_data.json",
            "database/db_data/vehicle_safety_data.json",
        )

    def test_listings_exist(self):
        self.assertEqual(len(self.listing_table), 53)

    def test_fuel_stations_exist(self):
        self.assertEqual(len(self.fuel_station_table), 120)

    def test_specs_exist(self):
        self.assertEqual(len(self.spec_table), 877)

    def test_listings_columns(self):
        for row in self.listing_table:
            self.assertEqual(len(row.keys()), 18)

    def test_fuel_stations_columns(self):
        for row in self.fuel_station_table:
            self.assertEqual(len(row.keys()), 15)

    def test_specs_columns(self):
        for row in self.spec_table:
            self.assertGreaterEqual(len(row.keys()), 27)


if __name__ == "__main__":
    unittest.main()
