# app.py


from flask import Flask
from flask import request, render_template, flash, redirect, url_for, json, jsonify
from random import sample
from flask_sqlalchemy import SQLAlchemy
from config import BaseConfig
from flask_mongoengine import MongoEngine
from datetime import datetime
from datetime import timedelta
from werkzeug import secure_filename
import logging
import json
import requests


app = Flask(__name__)
app.config.from_object(BaseConfig)
app.config['MONGODB_SETTINGS'] = {
    'db': 'edgedb',
    'host': 'mongodb',
    'username': 'edgedbuser',
    'password': 'edgedb',
    'port': 27017
}
app.config['DEBUG'] = True
logging.basicConfig(level=logging.INFO, format=f'%(asctime)s %(levelname)s %(name)s %(threadName)s : %(message)s')
#db = SQLAlchemy(app)

UPLOAD_FOLDER = '/path'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

mdb = MongoEngine()
mdb.init_app(app)

from forms import LoginForm
from forms import RegistrationForm
from forms import ManageForm
from forms import DataFreqForm
#from models import *
from nosqlmodels import *

#@app.route('/', methods=['GET', 'POST'])
#def index():
#    if request.method == 'POST':
#        text = request.form['text']
#        post = Post(text)
#        db.session.add(post)
#        db.session.commit()
#    posts = Post.query.order_by(Post.date_posted.desc()).all()
#    return render_template('index.html', posts=posts)

@app.route('/')
def index():
        #return "Welcome to the Edge Gateway Solution!"
        return jsonify({'Welcome to the Edge Gateway Solution': request.remote_addr}), 200

@app.route('/test', methods=['GET', 'POST'])
def test():
        return jsonify({'ip': request.environ.get('HTTP_X_REAL_IP', request.remote_addr)}), 200

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        print("Login :" + form.username.data + " Password:"+ form.password.data)
        #flash('Login requested by user {}, remember_me={}'.format(
        #form.username.data, form.remember_me.data))
        doc= User.objects(name = form.username.data).to_json()
        print(doc)
        if doc is None:
            flash('Login has Failed!!!')
            return render_template('login.html', title='Sign In', form=form)
        #flash('Login is Successful!!!')
        return redirect(url_for('dboard'))
    return render_template('login.html', title='Sign In', form=form)

@app.route('/register', methods=['GET', 'POST'])
def register():
        form = RegistrationForm()
        if form.validate_on_submit():
                user = User(name=form.username.data, email=form.email.data)
                user.save()
                print("UserName :" + form.username.data)
                print("Email:    " + form.email.data)
                print("Password: " + form.password.data)
                flash('Congratulations, you are now a registered user!!!')
                return redirect(url_for('login'))
        return render_template('register.html', title='Regsiter', form=form)

@app.route('/manage', methods=['GET', 'POST'])
def manage():
        form = ManageForm()
        if form.validate_on_submit():
                dev = Devinfo(
                        devName=form.devName.data,
                        devId=form.devId.data,
                        devStatus=0,
                        devType=form.devType.data,
                        devVendor=form.devVendor.data
                        )
                dev.save()
                print("devName: " + form.devName.data)
                #print("devId: " + form.devId.data)
                print("devType: " + form.devType.data)
                print("devVendor: " + form.devVendor.data)
                return redirect(url_for('manage'))
        return render_template('manage.html', title='Manage', form=form)

@app.route('/dboard', methods=['GET', 'POST'])
def dboard():
        form = DataFreqForm()
        if form.validate_on_submit():
                dataF = DataFrequency(dataFq=form.freqValue.data, dataUt=str(form.freqUnit.data))
                dataF.save()
                print("Data Frequency: " + str(form.freqValue.data))
                print("Data Unit: " + str(form.freqUnit.data))
                if(form.freqUnit.data):
                    flash('Current Data Frequency:' + str(form.freqValue.data) + 'minutes')
                else:
                    flash('Current Data Frequency:' + str(form.freqValue.data) + 'seconds')
                return redirect(url_for('dboard'))
        return render_template('dboard.html', title='Dashboard', form=form)

@app.route('/config', methods=['GET', 'POST'])
def config():
        return render_template('config.html')

@app.route('/modbus', methods=['GET', 'POST'])
def modbus():
        return render_template('modbus.html')

@app.route('/lora', methods=['GET', 'POST'])
def lora():
        return render_template('lora.html')

@app.route('/modbusupload]', methods=['GET', 'POST'])
def modbusupload():
    print("Inside modbus_upload")
    if request.method == 'POST':
        f = request.files['file']
        f.save(secure_filename(f.filename))
        data1 = f.read()
        print(data)
        return "File uploaded successfully"

@app.route('/cudata', methods=['GET', 'POST'])
def cudata():
        #for temprec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{temprec.deviceId} Temperature:{temprec.temp} Timestamp:{temprec.ts}')
        #tslowlimit = datetime.datetime.now()-timedelta(minutes=1)
        #temprecs = Tsdata.objects(deviceId=1,ts__gte=tslowlimit).only('temp','ts')
        currentrecs = Tspumpdata.objects(deviceId=1).only('current','ts')
        return jsonify({'currentrecs':currentrecs})
        #return jsonify({'results': sample(range(1,10),5)})

@app.route('/hedata', methods=['GET', 'POST'])
def hedata():
        #for humrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{humrec.deviceId} Humidity:{humrec.humidity} Timestamp:{humrec.ts}')
        hexanerecs = Tspumpdata.objects(deviceId=1).only('hexane_seal','ts')
        return jsonify({'hexanerecs':hexanerecs})

@app.route('/ledata', methods=['GET', 'POST'])
def ledata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        levelrecs = Tspumpdata.objects(deviceId=1).only('level_control','ts')
        return jsonify({'levelrecs':levelrecs})
        
@app.route('/rldata', methods=['GET', 'POST'])
def rldata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        rlrecs = Tspumpdata.objects(deviceId=1).only('reactor_level','ts')
        return jsonify({'rlrecs':rlrecs})

@app.route('/rfdata', methods=['GET', 'POST'])
def rfdata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        rfrecs = Tspumpdata.objects(deviceId=1).only('recycle_flow','ts')
        return jsonify({'rfrecs':rfrecs})
        
@app.route('/sldata', methods=['GET', 'POST'])
def sldata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        sealrecs = Tspumpdata.objects(deviceId=1).only('seal_level','ts')
        return jsonify({'sealrecs':sealrecs})
        
@app.route('/spdata', methods=['GET', 'POST'])
def spdata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        sprecs = Tspumpdata.objects(deviceId=1).only('suction_pressure','ts')
        return jsonify({'sprecs':sprecs})
      
@app.route('/stdata', methods=['GET', 'POST'])

def stdata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        strecs = Tspumpdata.objects(deviceId=1).only('suction_temperature','ts')
        return jsonify({'strecs':strecs})
        
@app.route('/vxdata', methods=['GET', 'POST'])
def vxdata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        xvrecs = Tspumpdata.objects(deviceId=1).only('vibration_x','ts')
        return jsonify({'xvrecs':xvrecs})
        
@app.route('/vydata', methods=['GET', 'POST'])
def vydata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        vyrecs = Tspumpdata.objects(deviceId=1).only('vibration_y','ts')
        return jsonify({'vyrecs':vyrecs})
        
@app.route('/arsdata', methods=['GET', 'POST'])
def arsdata():
        #for presrec in Tsdata.objects(deviceId=1):
            #print(f'DeviceID:{presrec.deviceId} Humidity:{presrec.pressure} Timestamp:{presrec.ts}')
        arsrecs = Tspumpdata.objects(deviceId=1).only('asset_running_status','ts')
        return jsonify({'arsrecs':arsrecs})
                


@app.route('/tsdataput', methods=['GET', 'POST'])
def tsdataput():
        req_data = request.get_json()
        
        current= int(req_data['current'])
        
        hexane_seal = int(req_data['hexane_seal'])
        
        level_control = int(req_data['level_control'])
        
        reactor_level = int(req_data['reactor_level'])
        
        recycle_flow = int(req_data['recycle_flow'])
        
        seal_level = int(req_data['seal_level'])
        
        suction_pressure = int(req_data['suction_pressure'])
        
        suction_temperature = int(req_data['suction_temperature'])
        
        vibration_x = int(req_data['vibration_x'])
        
        vibration_y = int(req_data['vibration_y'])
        
        asset_running_status = int(req_data['asset_running_status'])

        deviceId = int(req_data['deviceId'])
        ts       = datetime.datetime.strptime(req_data['ts'], '%Y-%m-%d %H:%M:%S.%f')
        tspumpdata   = Tspumpdata(ts=ts,deviceId=deviceId,current=current,hexane_seal=hexane_seal,level_control=level_control, reactor_level=reactor_level,recycle_flow=recycle_flow,seal_level=seal_level,suction_pressure=suction_pressure,suction_temperature=suction_temperature,vibration_x=vibration_x,vibration_y=vibration_y,asset_running_status=asset_running_status)
        tspumpdata.save()
        print(f'Data received is ts:{ts} deviceId:{deviceId} current:{current}  hexane_seal:{hexane_seal} level_control:{level_control} reactor_level:{reactor_level} recycle_flow:{recycle_flow} seal_level:{seal_level} suction_pressure:{suction_pressure} suction_temperature:{suction_temperature} vibration_x:{vibration_x} vibration_y:{vibration_y} asset_running_status:{asset_running_status}')
        for dataFreq in DataFrequency.objects:
            print(dataFreq.dataFq)

        resp = {
        "DataFreq":dataFreq.dataFq,
        "Unit":dataFreq.dataUt
        }

        resp = json.dumps(resp)
        #return '''Temp:{} Humidity:{} Pressure:{} ts:{}'''.format(temp,humidity,pressure,ts)
        return (resp)

def add_user_db():
    print("In add_user_db()")
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    print(username, email, password)
    user1 = EUser(EntUserName=username, EntUserEmail=email)
    user1.set_password(password)
    user1.EntUserID = 1010
    db.session.add(user1)
    db.session.commit()
    return("User added succesfully")

def validate_user():
    print("In validate_user()")
    username = request.form['username']
    password = request.form['password']
    print(username, password)
    user1 = EUser.query.filter_by(EntUserName=username).first()
    if user1 is None or not user1.check_password(password):
        print ('Authentication failed!')
        return Response("Authentication failed!", 401)
    print ('Authentication Success!')
    return Response("Authentication Success!!!", 200)

if __name__ == '__main__':
    app.run(debug=True)
