import { Schema, model } from "mongoose";

const PostSchema = new Schema(
    {
        titulo: {
            type: String,
            required: [true, "El titulo es obligatorio"],
            minlength: [3, "El titulo debe tener al menos 3 caracteres"],
            maxlength: [75, "El titulo no puede exceder los 75 caracteres"],
            trim: true,
        },
        contenido: {
            type: String,
            required: [true, "El contenido es obligatorio"],
            minlength: [3, "El contenido debe tener al menos 3 caracteres"],
            maxlength: [500, "El contenido no puede exceder los 500 caracteres"],
        },
        autor: {
            type: Schema.Types.ObjectId,
            ref: "usuarios",
        },
    },
    {
        timestamps: true,
    }
);

export default model('posts', PostSchema)
