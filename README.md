# SOCKETCHAT - AUTENTICACIÓN

## **FUNCIONALIDAD**

<br>

Esta aplicación permite:

- Enviar mensajes a un chat grupal.
- Enviar mensajes privados mediante el ingreso del identificador del usuario destinatario.

Para enviar mensajes es necesario que los usuarios se encuentre autenticadas en la aplicación.

Cabe señalar que la aplicación es un avance de este proyecto: https://github.com/Miguel-Parra/backend-RestServer-Cafe   , por lo que tiene sus mismas caracteristicas, incluyendo ahora la funcionalidad del chat (diseño y funcionalidad).

<br>

## **TECNOLOGÍAS**

<br>

Entre las principales tecnologías utilizadas para su desarrollo se encuentran:

- Clases del ES6
- Express.js para crear el Webserver y la API.
- Socket.io para crear y gestionar el servidor Websocket.
- Google Sig-In para que el cliente pueda autenticarse en la aplicación. Se utilizó junto con el paquete de Node `google-auth-library`.
- JWT para autenticar y validar al cliente en el backend.
  

<br>

## **APLICACIÓN HEROKU**

<br>

La aplicación se encuentra desplegada en:

https://node-socketchat.herokuapp.com/

<br>

## **RECOMENDACIONES**

<br>
Para probar la funcionalidad se puede usar el usuario: miguel2@test.com y la contraseña: 123456

Abrir la consolo del navegador para visualizar los mensajes enviados al chat privado ya que por el momento no se ha diseñado su interfaz. 


Recuerden reconstruir los módulos de Node con:
```
npm install 
```
Y para correr la aplicación con:
```
node app.js
```