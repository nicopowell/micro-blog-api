import { loguearUsuario, registrarNuevoUsuario } from "../services/usuario.services.js";

const registerUsuario = async (req, res) => {
    try {
        const result = await registrarNuevoUsuario(req.body);

        if(result.statusCode === 201) {
            res.status(result.statusCode).json({ msg: result.msg });
        } else {
            res.status(result.statusCode).json({ msg: result.msg, errors: result.errors}); 
        }
    } catch (error) {
        res.status(500).json({ msg: "Error inesperado en el controlador", error: error.message });
    }
};

const loginUsuario = async (req, res) => {
    try {
        const result = await loguearUsuario(req.body)

        if(result.statusCode === 200) {
            res.status(result.statusCode).json({msg: result.msg, token: result.token})
        } else {
            res.status(result.statusCode).json({msg: result.msg, error: result.error})
        }
    } catch (error) {
        
    }
    
}

export {
    registerUsuario,
    loginUsuario
}