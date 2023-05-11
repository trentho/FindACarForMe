from flask_marshmallow import Marshmallow
from models import Listings, FuelStations, Specs
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

ma = Marshmallow()


class ListingsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Listings


class FuelStationsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = FuelStations


class SpecsSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Specs


listings_schema = ListingsSchema()
fuelstations_schema = FuelStationsSchema()
specs_schema = SpecsSchema()
