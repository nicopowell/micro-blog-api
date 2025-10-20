import UsuarioModel from "../models/usuario.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const registrarNuevoUsuario = async (body) => {
    try {
        const usuario = new UsuarioModel(body)
        await usuario.save();

        return {
            msg: "Usuario creado exitosamente",
            statusCode: 201
        }
    } catch (error) {
        return {
            msg: "Error al registrar el usuario",
            statusCode: 500,
            error
        }
    }
}

const loginUsuario = async (body) => {
    try {
        const {email, password} = body

        const usuarioExistente = await UsuarioModel.findOne({email})

        if(!usuarioExistente) {
            return {
                msg: "Email o contraseña incorrectos",
                statusCode: 400
            }
        }

        if (!bcrypt.compareSync(password, usuarioExistente.password)) {
            return {
                msg: "Email o contraseña incorrectos",
                statusCode: 400
            }
        }

        const payload = {
            idUsuario: usuarioExistente._id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})

        return {
            msg: "Usuario logueado exitosamente",
            token,
            statusCode: 200
        }
    } catch (error) {
        return {
            msg: "Error al loguear el usuario",
            statusCode: 500,
            error
        }
    }
}

export default {
    registrarNuevoUsuario,
    loginUsuario
}