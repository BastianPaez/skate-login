const email = sessionStorage.getItem('email')

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', cargarUsuarios)
}

function cargarUsuarios(){
    getAxios();
}

const getAxios = async () =>{
    try {
        if ( email === 'admin@admin.com'){
            const {data} = await axios.get('/api/v1/user/list')
            const tabla = document.querySelector('#tabla-usuarios')
        
            data.forEach((usuario, index) => {
                if (usuario.email === 'admin@admin.com') {
                    return
                }
                const row = document.createElement('tr')
                const {nombre, anos_experiencia, especialidad, estado, id} = usuario
                row.innerHTML = `
                <th scope="row">${ index + 1 }1</th>
                <td><div></div></td>
                <td>${ nombre }</td>
                <td>${ anos_experiencia }</td>
                <td>${ especialidad }</td>
                <td><input type="checkbox" data-id="${id}"} ${estado ? 'checked' : ''}></td>
                `
                const checkbox = row.querySelector('input[type="checkbox"]');
                checkbox.addEventListener('change', async () => {
                    console.log(`Checkbox con ID ${id} fue cambiado: ${checkbox.checked}`);
                    try {
                        await axios.put('/api/v1/user/check', {id, checkbox: checkbox.checked})
                    } catch (error) {
                        console.log(error)
                    }
                });
        
                tabla.append(row)
            });
        } else {
            alert('No estas autorizado')
        }
    } catch (error) {
        console.log(error)
    }

}