import { Router } from "express";
import { loginUsuario, registerUsuario } from "../controllers/usuarios.controller.js"

const router = Router();

router.post("/register", registerUsuario)
router.post("/login", loginUsuario)

export default router