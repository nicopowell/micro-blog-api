import jwt from "jsonwebtoken"

const checkAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')

        if(!token) {
            res.status(401).json({ msg: 'No hay token, permiso no valido' })
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)

        req.idUsuario = payload.idUsuario

        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' })
    }
}

export default checkAuth