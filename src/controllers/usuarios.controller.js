import usuarioServices from "../services/usuario.services"

const registerUsuario = (req, res) => {
    const result = usuarioServices.registrarNuevoUsuario(req.body)

    if(result.statusCode === 201) {
        res.status(result.statusCode).json({msg: result.msg})
    } else {
        res.status(result.statusCode).json({msg: result.msg, error: error})
    }
}

const loginUsuario = (req, res) => {
    const result = usuarioServices.loginUsuario(req.body)

    if(result.statusCode === 200) {
        res.status(result.statusCode).json({msg: result.msg})
    } else {
        res.status(result.statusCode).json({msg: result.msg, error: error})
    }
}

export default {
    registerUsuario,
    loginUsuario
}