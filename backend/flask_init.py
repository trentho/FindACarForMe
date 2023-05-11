from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from get_secrets import get_uri

application = Flask(__name__)
CORS(application)
application.config["SQLALCHEMY_DATABASE_URI"] = get_uri()
db = SQLAlchemy(application)
