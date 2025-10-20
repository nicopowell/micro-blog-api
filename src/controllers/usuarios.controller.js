import usuarioServices from "../services/usuario.services.js"

const registerUsuario = async (req, res) => {
    try {
        const result = await usuarioServices.registrarNuevoUsuario(req.body)

        if(result.statusCode === 201) {
            res.status(result.statusCode).json({msg: result.msg})
        } else {
            res.status(result.statusCode).json({msg: result.msg, error: result.error})
        }
    } catch (error) {
        res.status(500).json({msg: "Error en el controlador", error: error})
    }
    
}

const loginUsuario = async (req, res) => {
    try {
        const result = await usuarioServices.loginUsuario(req.body)

        if(result.statusCode === 200) {
            res.status(result.statusCode).json({msg: result.msg, token: result.token})
        } else {
            res.status(result.statusCode).json({msg: result.msg, error: result.error})
        }
    } catch (error) {
        
    }
    
}

export default {
    registerUsuario,
    loginUsuario
}