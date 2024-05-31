const formulario = document.querySelector('#formulario-datos');
const btnEliminar = document.querySelector('#eliminar-usuario');


const token = sessionStorage.getItem('token')
if (!token) {
    window.location.href = "/login"
}
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}


eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', cargarForm)
    formulario.addEventListener('submit', submitDatos)
    btnEliminar.addEventListener('click', deleteDatos)
}

function cargarForm(){
    obtenerDatos();
}

const obtenerDatos = async () => {
    try {
        const email = sessionStorage.getItem('email')
        const {data} = await axios.post('/api/v1/user/info', {email}, config)
        formulario.email.value = email;
        formulario.nombre.value = data.nombre;
        formulario.password1.value = data.password;
        formulario.password2.value =data.password;
        formulario.experiencia.value = data.anos_experiencia;
        formulario.especialidad.value = data.especialidad;
    } catch (error) {
        console.log(error)
    }
}


function submitDatos(e){
    e.preventDefault();
    actualizarDatos()
}

const actualizarDatos = async () => {
    try {
        const password = formulario.password1.value;
        const password2 = formulario.password2.value;
        const email = formulario.email.value;
        const nombre = formulario.nombre.value;
        const anos_experiencia = formulario.experiencia.value;
        const especialidad = formulario.especialidad.value;
        const user = await axios.put('/api/v1/user/update', { nombre, password, password2, anos_experiencia, especialidad, email }, config)
        console.log(user)
    } catch (error) {
        alert(error.response.data.msg)
        console.log(error)
    }
}


function deleteDatos (e){
    e.preventDefault();
    eliminarDatos();
}

const eliminarDatos = async () =>{
    try {
        const email = formulario.email.value;
        await fetch(`/api/v1/user/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ email: email })
        })
        sessionStorage.clear();
    } catch (error) {
        console.log(error)
    }
}