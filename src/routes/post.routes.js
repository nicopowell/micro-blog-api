import { Router } from "express"
import { obtenerPosts, crearPost, borrarPost } from "../controllers/post.controller.js"
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", obtenerPosts);
router.post("/", checkAuth, crearPost);
router.delete("/", checkAuth, borrarPost);

export default router