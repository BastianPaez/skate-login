const formulario = document.querySelector('#formulario-registrarse')

eventListeners();

function eventListeners (){
    formulario.addEventListener('submit', submitRegistrar);
}

function submitRegistrar(e){
    e.preventDefault();
    enviarDatos();
}

const enviarDatos = async ()=>{
    try {
        const email = formulario.email.value;
        const nombre = formulario.nombre.value;
        const password = formulario.password.value;
        const password2 = formulario.password2.value;
        const anos_experiencia = formulario.experiencia.value;
        const especialidad = formulario.especialidad.value;
        const foto = 'http://example.com/foto.jpg';

        const newUser = {email, nombre, password, password2, anos_experiencia, especialidad, foto}
        await axios.post('/api/v1/user/register', newUser)

        window.location.href = '/login'

    } catch (error) {
        console.log(error)
        alert(error.response.data.msg)
    }
}