# nosqlmodels.py

import datetime
from app import mdb
from flask import jsonify
from flask_mongoengine import MongoEngine
import os
from werkzeug.security import generate_password_hash, check_password_hash

class User(mdb.Document):
   name  = mdb.StringField()
   email = mdb.StringField()
   def to_json(self):
      return {"name": self.name,
              "email": self.email}

class Tspumpdata(mdb.Document):
    meta = {'collection': 'tspumpdata'}
    ts                  = mdb.DateTimeField()
    deviceId            = mdb.IntField()
    current             = mdb.IntField()
    hexane_seal         = mdb.IntField()
    level_control       = mdb.IntField()
    reactor_level       = mdb.IntField()
    recycle_flow        = mdb.IntField()
    seal_level          = mdb.IntField()
    suction_pressure    = mdb.IntField()
    suction_temperature = mdb.IntField()
    vibration_x         = mdb.IntField()
    vibration_y         = mdb.IntField()
    asset_running_status= mdb.IntField()
    def to_json(self):
        return {"ts":self.ts, 
        	 "deviceId":self.deviceId,
        	 "current": self.current,
                "hexane_seal": self.hexane_seal,
                "level_control":self.level_control,
                "reactor_level":self.reactor_level,
                "recycle_flow":self.recycle_flow,
                "seal_level":self.seal_level,
                "suction_pressure":self.suction_pressure,
                "suction_temperature":self.suction_temperature,
                "vibration_x":self.vibration_x,
                "vibration_y":self.vibration_y,
                "asset_running_status":self.asset_running_status        
                }

class Tsdata(mdb.Document):
    meta = {'collection': 'tsdata'}
    pressure  = mdb.IntField()
    humidity  = mdb.IntField()
    temp      = mdb.IntField()
    ts        = mdb.DateTimeField()
    deviceId  = mdb.IntField()
    def to_json(self):
        return {"pressure": self.pressure,
                "humidity": self.humidity,
                "temp":self.temp,
                "ts":self.ts,
                "deviceId":self.deviceId
                }

class Devinfo(mdb.Document):
    meta = {'collection': 'devinfo'}
    devName   = mdb.StringField()
    devId     = mdb.IntField()
    devStatus = mdb.IntField()
    devType   = mdb.StringField()
    devVendor = mdb.StringField()
    def to_json(self):
        return {"devName": self.devName,
                "devId": self.devId,
                "devStatus":self.devStatus,
                "devType":self.devType,
                "devVendor":self.devVendor
                }

class DataFrequency(mdb.Document):
    dataFq = mdb.IntField()
    dataUt = mdb.StringField()
    def to_json(self):
      return {"dataFq": self.dataFreq,
              "dataUt": self.dataUnit}
