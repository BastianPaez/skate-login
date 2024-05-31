import { UserModel } from "../models/user.model.js";
import { handleErrorDatabase } from "../database/errors.database.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config'

// /api/v1/user
const listUsers = async (req, res) => {
    try {
        const users = await UserModel.allUsers();

        res.json(users)
    } catch (error) {
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json( {ok: false, msg} )
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findUserByEmail(email)

        if (!user)return res.status(400).json({
            ok:false,
            msg: "El email no esta registrado"
        });

        if (password !== user.password) return res.status(401).json({
            ok: false,
            msg: "Contraseña incorrecta"
        })


        const token = jwt.sign(
            {email: user.email},
            process.env.SECRET_JWT,
            { expiresIn: '1h'}
        )

        return res.json({token, email});
    } catch (error) {
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json( {ok: false, msg} )
    }
}

const register = async (req, res) => {
    try {
        const { email, nombre, password, password2, anos_experiencia, especialidad, foto } = req.body;
        const newUser = await UserModel.findUserByEmail(email);
        if (newUser) return res.status(400).json( { 
            ok: false,
            msg: 'El email ya esta registrado'
        });
        
        if (password !== password2) return res.status(400).json( { 
            ok: false,
            msg: 'Las contraseñas no coinciden'
        });

        if (!email || !nombre || !password || !password2 || !anos_experiencia || !especialidad || !foto) return res.status(400).json( { 
            ok: false,
            msg: 'Todos los campos son obligatorios'
        });
        const user = await UserModel.createUser({email, nombre, password, anos_experiencia, especialidad, foto})

        return res.json(user);
    } catch (error) {
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json( {ok: false, msg} )
    }
}

const updateUser = async (req, res) => {
    try {
        const  email  = req.email;
        const { nombre, password, password2, anos_experiencia, especialidad } = req.body;
        
        if (password !== password2) return res.status(400).json( { 
            ok: false,
            msg: 'Las contraseñas no coinciden'
        });

        const user = await UserModel.updateUserByEmail({email, nombre, password, anos_experiencia, especialidad})

        return res.json(user);
    } catch (error) {
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json( {ok: false, msg} )
    }
}

const infoUser = async (req, res) => {
    try {
        const {email} = req.body;
        const { nombre, password, anos_experiencia, especialidad} = await UserModel.findUserByEmail(email)
        

        res.json({email, nombre, password, anos_experiencia, especialidad})
    } catch (error) {
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json( {ok: false, msg} )
    }
}

const removeUser = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await UserModel.deleteUserByEmail(email)
        res.json(user)
    } catch (error) {
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json( {ok: false, msg} )
    }
}

const checkChanged = async (req, res) => {
    try {
        const {id, checkbox} = req.body;
        const user = await UserModel.updateEstadoById(id, checkbox)
        res.json(user)
    } catch (error) {
        const { code, msg } = handleErrorDatabase(error);
        return res.status(code).json( {ok: false, msg} )
    }
}

export const UserController = {
    login,
    register,
    listUsers,
    updateUser,
    infoUser,
    removeUser,
    checkChanged
}