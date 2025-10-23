import express from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import "./src/DB/config.js";

import usuariosRouter from "./src/routes/usuarios.routes.js";
import postsRouter from "./src/routes/post.routes.js";

const app = express();
const port = process.env.PORT || 3001;

// MIDDLEWARES
app.use(express.json());
app.use(morgan("tiny"));
app.use(cors())

// RUTAS
app.use("/api/usuarios", usuariosRouter);
app.use("/api/posts", postsRouter);

app.listen(port, () => {
	console.log("Servidor corriendo en el puerto", port);
});
