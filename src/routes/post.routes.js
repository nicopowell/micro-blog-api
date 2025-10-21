import { Router } from "express"
import { obtenerPosts, crearPost, borrarPost, editarPost } from "../controllers/post.controller.js"
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", obtenerPosts);
router.post("/", checkAuth, crearPost);
router.delete("/:idPost", checkAuth, borrarPost);
router.put("/:idPost", checkAuth, editarPost);

export default router