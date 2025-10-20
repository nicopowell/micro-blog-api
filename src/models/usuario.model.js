import bcrypt from "bcrypt"
import { Schema, model } from "mongoose"

const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'El nombre no puede exceder los 50 caracteres'],
        trim: true
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
            "Ingrese un correo valido"
        ]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"],
        minlength: [3, 'La contraseña debe tener al menos 8 caracteres'],
        maxlength: [50, 'La contraseña no puede exceder los 100 caracteres'],
        trim: true
    }
}, {
    timestamps: true
})

UsuarioSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }

    let salt = bcrypt.genSaltSync();
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

const UsuarioModel = model("usuarios", UsuarioSchema)
export default UsuarioModel