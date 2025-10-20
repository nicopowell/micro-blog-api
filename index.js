import express from "express";
import "dotenv/config"
import "./src/DB/config.js"

const app = express();

const port = process.env.PORT || 3001

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto", port)
})
