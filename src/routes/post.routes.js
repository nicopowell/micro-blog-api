import { Router } from "express"
import { obtenerPosts, crearPost, borrarPost, editarPost, obtenerPostPorId } from "../controllers/post.controller.js"
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/", obtenerPosts);
router.get("/:idPost", obtenerPostPorId);
router.post("/", checkAuth, crearPost);
router.delete("/:idPost", checkAuth, borrarPost);
router.put("/:idPost", checkAuth, editarPost);

export default router