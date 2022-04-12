// referencia html
const miFormulario = document.querySelector('form');

console.log(localStorage.getItem('correo'));

//obtener el dominio vinculado
const url = (location.hostname.includes('localhost'))
    ? 'http://localhost:8080/api/auth/'
    : 'https://node-socketchat.herokuapp.com/api/auth/'
console.log(url);

miFormulario.addEventListener('submit', evento => {
    evento.preventDefault()
    const formData = {};

    for (let elemento of miFormulario.elements) {
        if (elemento.name.length > 0) { //el boton no tiene nombre, por esa esta condicion
            formData[elemento.name] = elemento.value;
        }
    }
    fetch(url + 'login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(resp => resp.json()) // esto se hace porque la respuesta debemos extraerla y eso es otra promesa
        .then(({ msg, token, usuario }) => {
            if (msg) {
                return console.log(msg)
            }
            localStorage.setItem('token', token);
            window.location = 'chat.html'
        })
        .catch(console.warn);
})

function handleCredentialResponse(response) {
    //Google Token : ID_TOKEN
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: response.credential })
    })
        .then(resp => resp.json())
        .then(({ token, usuario }) => {
            localStorage.setItem('token', token);
            localStorage.setItem('correo', usuario.correo);
            window.location = 'chat.html'
        })
        .catch(console.warn);
}

const button = document.querySelector('#google_signout');
button.addEventListener('click', () => {
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem('correo'), () => {
        localStorage.clear(); // limpia el localStorage
        location.reload(); //recarga la página
    })
}) 