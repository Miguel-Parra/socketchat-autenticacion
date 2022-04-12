
const url = (location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://backend-restserver-cafe.herokuapp.com/api/auth/'

let usuario = null;
let socket = null;

// Referencias HTML
const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');


const validarJWT = async () => {
    try {
        const token = localStorage.getItem('token') || '';
        if (token <= 10) {
            window.location = 'index.html';
            throw new Error('No hay token en el servidor');
        }
        const respuesta = await fetch(url, {
            headers: { 'x-token': localStorage.getItem('token') }
        });
        if (!respuesta.ok) {
            window.location = 'index.html';
            throw "No se pudo hacer la peticion"
        }
        const { usuario: userDB, token: tokenDB } = await respuesta.json();
        localStorage.setItem('token', tokenDB);
        usuario = userDB;
        document.title = usuario.nombre;
        await conectarSocket();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const conectarSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });
    socket.on('connect', () => {
        console.log('Sockets online');
    });
    socket.on('disconnect', () => {
        console.log('Sockets offline');
    });
    socket.on('recibir-mensaje', dibujarMensajes);

    socket.on('usuarios-activos', dibujarUsuario); // las tres son lo mismo
    // socket.on('usuarios-activos', (payload) => dibujarUsuario(payload));
    // socket.on('usuarios-activos', (payload) => {dibujarUsuario(payload)});

    socket.on('mensaje-privado', (payload) => {
        console.log(payload);
    });
}

const main = async () => {
    try {
        await validarJWT()
    } catch (error) {
        console.log(error);
    }
}

const dibujarMensajes = (mensajes = []) => {
    console.log(mensajes);
    let mensajesHtml = '';
    mensajes.forEach(({ mensaje, nombre }) => {
        mensajesHtml +=
            ` <li>
                <p>
                    <span class="text-primary">${nombre}: </span>
                    <span >${mensaje}</span>
                </p>
            </li>`
    });
    ulMensajes.innerHTML = mensajesHtml;
}

const dibujarUsuario = (usuarios = []) => { //esto depende del frontend que se utilice
    let usuariosHtml = '';
    usuarios.forEach(({ nombre, uid }) => {
        usuariosHtml +=
            `<li>
                <p>
                    <h5 class='text-success'>${nombre}</h5>
                    <span class="fs-6 text-muted"> ${uid} </span > 
                </p>
            </li>`
    })
    ulUsuarios.innerHTML = usuariosHtml;
}

txtMensaje.addEventListener('keyup', ({ keyCode }) => {
    const mensaje = txtMensaje.value;
    const uid = txtUid.value;
    if (keyCode !== 13) return;
    if (mensaje.length === 0) return;
    socket.emit('enviar-mensaje', { mensaje, uid })
    txtMensaje.value = '';
})


main();

// const socket = io();

// socket.on('connect', ()=> {
//     console.log('HOLA ME CONECTE')
// })