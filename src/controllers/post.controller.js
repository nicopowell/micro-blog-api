import {
    crearPost as crearPostService,
    obtenerPosts as obtenerPostsService,
    borrarPost as borrarPostService,
    editarPost as editarPostService
} from "../services/post.service.js";

const crearPost = async (req, res) => {
    try {
        const result = await crearPostService(req.body, req.idUsuario);

        if (result.statusCode === 201) {
            res.status(result.statusCode).json({ msg: result.msg });
        } else {
            res.status(result.statusCode).json({ msg: result.msg, errors: result.errors });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error en el controlador del post", error: error.message });
    }
};

const obtenerPosts = async (req, res) => {
    try {
        const result = await obtenerPostsService();

        res.status(result.statusCode).json(result);
    } catch (error) {
        res.status(500).json({ msg: "Error en el controlador de post", error: error.message });
    }
};

const borrarPost = async (req, res) => {
    try {
        const result = await borrarPostService(req.params.idPost, req.idUsuario);

        res.status(result.statusCode).json({ msg: result.msg });
    } catch (error) {
        res.status(500).json({ msg: "Error en el controlador de delete", error: error.message });
    }
};

const editarPost = async (req, res) => {
    try {
        const result = await editarPostService(req.params.idPost, req.idUsuario, req.body)
        
        if (result.statusCode === 200) {
            res.status(result.statusCode).json({ 
                msg: result.msg, 
                post: result.postActualizado 
            });
        } else {
            res.status(result.statusCode).json({ 
                msg: result.msg,
                errors: result.errors
            });
        }
    } catch (error) {
        res.status(500).json({ msg: "Error en el controlador de update", error: error.message });
    }
}

export { crearPost, obtenerPosts, borrarPost, editarPost };
