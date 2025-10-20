import { Router } from "express";
import controladoresUsuario from "../controllers/usuarios.controller.js"

const router = Router();

router.post("/register", controladoresUsuario.registerUsuario)
router.post("/login", controladoresUsuario.loginUsuario)

export default router