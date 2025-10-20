import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_CONNECT)
.then(console.log("DB conectada exitosamente"))
.catch((error) => console.log("Error al conectar la DB", error));