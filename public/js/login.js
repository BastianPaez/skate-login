const formLogin = document.querySelector('#form-login')


eventListeners();

function eventListeners () {
    formLogin.addEventListener('submit', login)
}

function login (e){
    e.preventDefault();
    verificarUsuario(e)
}

const verificarUsuario = async(e) =>{
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
        const {data} = await axios.post('/api/v1/user/login', {email, password});
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('email', data.email)
        window.location.href = "/Datos.html"
    } catch (error) {
        console.log(error)
    }
    
}