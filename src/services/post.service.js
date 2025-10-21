import PostModel from "../models/post.model.js";

const crearPost = async (datosPost, idUsuario) => {
    try {
        const nuevoPost = new PostModel({ ...datosPost, autor: idUsuario });
        await nuevoPost.save();

        return {
            statusCode: 201,
            msg: "Post creado",
        };
    } catch (error) {
        if (error.name === "ValidationError") {
            const mensajesError = Object.values(error.errors).map((val) => val.message);

            return {
                msg: "Error de validación:",
                statusCode: 400,
                errors: mensajesError,
            };
        }

        return {
            msg: "Error al crear el post",
            statusCode: 500,
            error: error.message,
        };
    }
};

const obtenerPosts = async () => {
    try {
        const posts = await PostModel.find().populate("autor");

        return {
            statusCode: 200,
            posts: posts,
        };
    } catch (error) {
        return {
            msg: "Error al obtener los posts",
            statusCode: 500,
            error: error.message,
        };
    }
};

export { crearPost, obtenerPosts };
