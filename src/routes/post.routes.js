import { Router } from "express"
import { obtenerPosts, crearPost } from "../controllers/post.controller.js"

const router = Router()

router.get("/", obtenerPosts);
router.post("/", crearPost);

export default router