import { Router } from "express"
import { obtenerPosts, crearPost } from "../controllers/post.controller.js"
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", obtenerPosts);
router.post("/", checkAuth, crearPost);

export default router