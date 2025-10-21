import jwt from "jsonwebtoken"

const checkAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')

        if(!token) {
            res.status(401).json({ msg: 'No hay token, permiso no valido' })
        }

        const tokenLimpio = token.split(' ')[1];

        const payload = jwt.verify(tokenLimpio, process.env.JWT_SECRET)

        req.idUsuario = payload.idUsuario

        next()
    } catch (error) {
        res.status(401).json({ msg: 'Token no válido' })
    }
}

export { checkAuth }