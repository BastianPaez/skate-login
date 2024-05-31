
document.addEventListener('DOMContentLoaded', cargarSkaters);

function cargarSkaters () {
    getAxios();
}

const getAxios = async () => {
    try {
        const {data} = await axios.get('/api/v1/user/list')
        const tabla = document.querySelector('#tabla-skaters')
        data.forEach((usuario, index) => {
            if (usuario.email === 'admin@admin.com') {
                return
            }
            const row = document.createElement('tr')
            const {nombre, anos_experiencia, especialidad, estado} = usuario
            row.innerHTML = `
            <th scope="row">${ index + 1 }</th>
            <td><div></div></td>
            <td>${ nombre }</td>
            <td>${ anos_experiencia }</td>
            <td>${ especialidad }</td>
            <td class="text-warning font-weight-bold">${ estado === true ? 'Aprobado' : 'En revision' }</td>
            `
            tabla.append(row)
        });
    } catch (error) {
        console.log(error)
    }
}