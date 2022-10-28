# -*- coding: utf-8 -*-
"""
Created on Mon Oct 24 19:35:55 2022

@author: jfdua
"""

from flask import Flask
from twilio.rest import Client
from flask import request
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import os

app = Flask(__name__)

@app.route('/')
def inicio():
    respuesta=os.environ.get("prueba")
    return respuesta

@app.route('/email')
def mail():
    destino=request.args.get("correo_destino")
    asunto=request.args.get("asunto")
    mensaje=request.args.get("contenido")
        
    message = Mail(
        from_email='adventurepark092@gmail.com',
        to_emails=destino,
        subject=asunto,
        html_content=mensaje)
    try:
        sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return "correo enviado exitosamente"
    except Exception as e:
        print(e.message)
        return "error el correo no fue enviado"
    
@app.route("/sms")
def sms():
    try:
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        contenido=request.args.get("mensaje")
        destino=request.args.get("telefono")
        
        message = client.messages \
                        .create(
                             body=contenido,
                             from_='+14793155559',
                             to='+57'+ destino
                         )
        
        print(message.sid)
        return "mensaje enviado correctamente"
    except Exception as e:
        return "error al enviar el mensaje"
    
if __name__=='__main__':
    app.run()
        

