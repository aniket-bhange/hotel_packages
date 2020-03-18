import unittest
import json

from main import app
from app.db import client

class PackageTest(unittest.TestCase):
  def setUp(self):
    self.app = app.test_client()
    self.db = client.DB
  
  def test_successful_create_package(self):
    payload = json.dumps({
      "hotel_id": "24",
      "price": 2666,
      "duration_days": 2,
      "valid_from": "2344",
      "valid_to": "342342",
      "description": "this is test"
    })
    #When api is send
    response = self.app.post('/api/packages', headers={"Content-Type": "application/json"}, data=payload)

    #Then response
    self.assertEqual(200, response.status_code)

  def tearDown(self):
    for collection in self.db.list_collection_names():
      self.db.drop_collection(collection)

