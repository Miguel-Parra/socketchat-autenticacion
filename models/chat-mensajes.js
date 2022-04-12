
class Mensaje {
    constructor(uid, nombre, mensaje) {
        this.uid = uid;
        this.nombre = nombre;
        this.mensaje = mensaje;
    }
}

class ChatMensajes {
    constructor() {
        this.mensajes = [];
        this.usuarios = {};
    }

    get ultimos10() {
        this.mensajes = this.mensajes.splice(0, 10);
        return this.mensajes;
    }

    get usuarioArreglo() {
        return Object.values(this.usuarios); // [{},{},{}]
    }

    agregarMensaje(uid, nombre, mensaje) { // tambien se podria grabar la fecha de envio
        this.mensajes.unshift(
            new Mensaje(uid, nombre, mensaje)
        );
    }
    conectarUsuario(usuario) { // va a ser de tipo Usuario de la BD
        this.usuarios[usuario.id] = usuario;
    }

    desconectarUsuario(id) {
        delete this.usuarios[id]; // elimina una propiedad de un objeto
    }
}

module.exports = ChatMensajes;