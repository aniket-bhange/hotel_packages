from pymongo import MongoClient
DB_URL = "mongodb://<your db url>"
DEBUG = True
client = MongoClient(DB_URL, retryWrites=False)