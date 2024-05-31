import {pool} from '../database/connection.database.js'

const findUserByEmail = async (email) => {
    const query = {
        text: `SELECT * FROM skaters WHERE email = $1`,
        values: [email]
    }
    const { rows } = await pool.query(query);
    return rows[0]
}

const createUser = async ({ email, nombre, password, anos_experiencia, especialidad, foto }) => {
    const estado = false;
    const query = {
        text: `INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado) VALUES 
        ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;`,
        values: [ email, nombre, password, anos_experiencia, especialidad, foto, estado]
    }
    
    const { rows } = await pool.query(query);
    return rows[0]
}

const updateUserByEmail = async ({ nombre, password, anos_experiencia, especialidad, email }) => {
    const query = {
        text: ` UPDATE skaters
                SET nombre = $1,
                    password = $2,
                    anos_experiencia = $3,
                    especialidad = $4
                WHERE email = $5
                RETURNING *;`,
        values: [nombre, password, anos_experiencia, especialidad, email]
    }
    
    const { rows } = await pool.query(query);
    return rows[0]
}

const allUsers = async () => {
    const query = {
        text: `SELECT id, email, nombre, anos_experiencia, especialidad, estado, foto FROM skaters`,
    }
    
    const { rows } = await pool.query(query);
    return rows
}

const updateEstadoById = async (  id, checkbox ) => {
    const query = {
        text: ` UPDATE skaters
                SET estado = $1
                WHERE Id = $2
                RETURNING *;`,
        values: [checkbox, id]
    }
    
    const { rows } = await pool.query(query);
    return rows[0]
}

const deleteUserByEmail = async (email) => {
    const query = {
        text: ` DELETE FROM  skaters
                WHERE email = $1
                RETURNING *;`,
        values: [email]
    }
    const { rows } = await pool.query(query);
    return rows[0]
}



export const UserModel = {
    findUserByEmail,
    createUser,
    allUsers,
    updateUserByEmail,
    updateEstadoById,
    deleteUserByEmail
}