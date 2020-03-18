from app import app
import os
from flask import request, jsonify, json, make_response, Response, render_template
from bson.objectid import ObjectId
import json
from db import client


DB = client['hotels'] 

def root_dir():  
  return os.path.abspath(os.path.dirname(__file__))


@app.route('/')
@app.route('/edit')
@app.route('/create')
def get_initial_response():
  return render_template("index.html")

@app.route("/api/hotels", methods=['GET'])
def get_hotel_list():

  hotels = DB.hotels.find({})
  hotels_list = []
  for hotel in hotels:
    hotels_list.append(hotel)

  response = app.response_class(
    response=json.dumps(hotels_list, default=str),
    status=200,
    mimetype='application/json'
  )
  return response

@app.route("/api/packages", methods=['GET'])
def get_package_list():

  packages = list(DB.packages.find({'active': True}))
  hotel_ids = map(lambda xi: ObjectId(xi['hotel_id']), packages)
  hotel_list = list(DB.hotels.find({ '_id': { '$in': hotel_ids } }))
  
  hotels_keys = [str(hotel['_id']) for hotel in hotel_list]
  hotels = dict(zip(hotels_keys, hotel_list))
  print hotels

  package_list = []
  for package in packages:
    package['hotel_info'] = hotels[str(package['hotel_id'])]
    package_list.append(package)

  response = app.response_class(
    response=json.dumps(package_list, default=str),
    status=200,
    mimetype='application/json'
  )
  return response

@app.route("/api/packages/<package_id>", methods=['GET'])
def get_single_package(package_id):

  if not package_id:
    return app.response_class(
      response=json.dumps({ error: True, message: "ID is required" }, default=str),
      status=200,
      mimetype='application/json'
    )

  package = DB.packages.find_one({'_id': ObjectId(package_id)})

  if not package:
    return app.response_class(
      response=json.dumps({ error: True, message: "ID is not correct" }, default=str),
      status=200,
      mimetype='application/json'
    )

  hotel = DB.hotels.find_one({ '_id': ObjectId(package['hotel_id']) })
  
  package['hotel_info'] = hotel
  response = app.response_class(
    response=json.dumps(package, default=str),
    status=200,
    mimetype='application/json'
  )
  return response


@app.route("/api/packages", methods=['POST'])
def create_package_list():
  print request.data
  data = json.loads(request.data)
  data['active'] = True
  package_id = DB.packages.insert_one(data).inserted_id

  response = app.response_class(
    response=json.dumps(data, default=str),
    status=200,
    mimetype='application/json'
  )
  return response


@app.route("/api/packages/<package_id>", methods=['PUT'])
def update_package_list(package_id):
  
  if not package_id:
    return app.response_class(
      response=json.dumps({ error: True, message: "ID is required" }, default=str),
      status=200,
      mimetype='application/json'
    )

  data = json.loads(request.data)
  modified_count = DB.packages.update_one({ '_id': ObjectId(package_id) }, { '$set': data }).modified_count
  
  response = app.response_class(
    response=json.dumps(data, default=str),
    status=200,
    mimetype='application/json'
  )
  return response

@app.route("/api/packages/<package_id>", methods=['DELETE'])
def delete_package_list(package_id):
  
  if not package_id:
    return app.response_class(
      response=json.dumps({ error: True, message: "ID is required" }, default=str),
      status=404,
      mimetype='application/json'
    )

  modified_count = DB.packages.update_one({ '_id': ObjectId(package_id) }, { '$set': {'active': False} }).modified_count
  
  response = app.response_class(
    response=json.dumps({'_id': package_id}, default=str),
    status=200,
    mimetype='application/json'
  )
  return response
