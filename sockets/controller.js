const { comprobarJWT } = require("../helpers");
const { Socket } = require('socket.io');
const { ChatMensajes } = require('../models');

const chatMensajes = new (ChatMensajes);

const socketController = async (clienteConectado = new Socket(), io) => {
    const usuario = await comprobarJWT(clienteConectado.handshake.headers['x-token']);
    if (!usuario) {
        return clienteConectado.disconnect();
    }
    //agregar al usuario conectado
    chatMensajes.conectarUsuario(usuario);
    io.emit('usuarios-activos', chatMensajes.usuarioArreglo);
    //para enviarles los mensajes que estan en el chat apenas se conecte
    clienteConectado.emit('recibir-mensaje', chatMensajes.ultimos10)

    //conectarlo a una sala especial
    clienteConectado.join(usuario.id);

    //limpiar cuando alguien se desconecta
    clienteConectado.on('disconnect', () => {
        chatMensajes.desconectarUsuario(usuario.id);
        io.emit('usuarios-activos', chatMensajes.usuarioArreglo);
    })


    clienteConectado.on('enviar-mensaje', ({ uid, mensaje }) => {
        if (uid) {
            // mensaje privado
            clienteConectado.to(uid).emit('mensaje-privado', {de: usuario.nombre, mensaje})
        } else {
            //los datos que se envian a guardar son del remitente
            chatMensajes.agregarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensaje', chatMensajes.ultimos10);
        }
    })

}


module.exports = {
    socketController
}