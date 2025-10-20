import express from "express";
import "dotenv/config"
import "./src/DB/config.js"

import usuariosRouter from "./src/routes/usuarios.routes.js"

const app = express();
const port = process.env.PORT || 3001

// MIDDLEWARES
app.use(express.json())
app.use("/api/usuarios", usuariosRouter)

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto", port)
})
