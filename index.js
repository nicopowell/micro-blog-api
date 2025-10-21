import express from "express";
import "dotenv/config"
import morgan from "morgan"
import "./src/DB/config.js"

import usuariosRouter from "./src/routes/usuarios.routes.js"

const app = express();
const port = process.env.PORT || 3001

// MIDDLEWARES
app.use(express.json())
app.use(morgan("tiny"))
app.use("/api/usuarios", usuariosRouter)

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto", port)
})
