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

const obtenerPostPorId = async (idPost) => {
	try {
        const post = await PostModel.findById(idPost).populate("autor");
		if (!post)
			return {
				statusCode: 404,
                msg: "No se encontro el post"
			};

		return {
			statusCode: 200,
			post: post,
		};
	} catch (error) {
		return {
			msg: "Error al obtener los posts",
			statusCode: 500,
			error: error.message,
		};
	}
};

const borrarPost = async (idPost, idUsuario) => {
	try {
		const post = await PostModel.findById(idPost);

		if (!post) {
			return {
				msg: "No se encontro el post",
				statusCode: 404,
			};
		}

		if (post.autor.toString() !== idUsuario) {
			return {
				msg: "No tienes permiso de borrar este post",
				statusCode: 403,
			};
		}

		await PostModel.findByIdAndDelete(idPost);
		return {
			msg: "Post eliminado",
			statusCode: 200,
		};
	} catch (error) {
		return {
			msg: "Error al eliminar un post",
			statusCode: 500,
			error: error.message,
		};
	}
};

const editarPost = async (idPost, idUsuario, nuevosDatos) => {
	try {
		const post = await PostModel.findById(idPost);

		if (!post) {
			return {
				msg: "No se encontro el post",
				statusCode: 404,
			};
		}

		if (post.autor.toString() !== idUsuario) {
			return {
				msg: "No tienes permiso de editar este post",
				statusCode: 403,
			};
		}

		const postActualizado = await PostModel.findByIdAndUpdate(idPost, nuevosDatos, {
			new: true,
			runValidators: true,
		});

		return {
			msg: "Post editado",
			postActualizado,
			statusCode: 200,
		};
	} catch (error) {
		if (error.name === "ValidationError") {
			const mensajesError = Object.values(error.errors).map((val) => val.message);
			return {
				msg: "Error de validación al editar:",
				statusCode: 400,
				errors: mensajesError,
			};
		}

		return {
			msg: "Error al editar un post",
			statusCode: 500,
			error: error.message,
		};
	}
};

export { crearPost, obtenerPosts, obtenerPostPorId, borrarPost, editarPost };
