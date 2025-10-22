# Proyecto: Micro-Blog API (Backend)

Esta es la API RESTful para la aplicación "Micro-Blog", construida con el stack MERN como parte de mi plan de reactivación y portfolio.

## 🚀 Stack de Tecnologías

* **Node.js**
* **Express.js**
* **MongoDB (con Mongoose)**
* **JSON Web Tokens (JWT)** para autenticación
* **bcrypt** para hasheo de contraseñas

---

## 🛠️ Instalación y Puesta en Marcha

1.  Clonar el repositorio:
    ```bash
    git clone https://github.com/nicopowell/micro-blog-api
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Crear un archivo `.env` en la raíz del proyecto y añadir las siguientes variables de entorno:
    ```bash
    # Conexión a MongoDB Atlas
    MONGO_CONNECT=tu_connection_string_aqui

    # Clave para firmar los JWT
    JWT_SECRET=tu_clave_secreta_larga_y_aleatoria

    # Puerto (Opcional, por defecto 3001)
    PORT=3001
    ```
4.  Correr el servidor en modo desarrollo:
    ```bash
    npm run dev
    ```

---

## 📖 Endpoints (Rutas) de la API

### Autenticación (`/api/usuarios`)

* **`POST /api/usuarios/register`**
    * Crea un nuevo usuario.
    * **Body:** `{ "nombre": "Nico", "email": "nico@correo.com", "password": "pass123" }`

* **`POST /api/usuarios/login`**
    * Inicia sesión y devuelve un token JWT.
    * **Body:** `{ "email": "nico@correo.com", "password": "pass123" }`

### Posts (`/api/posts`)

* **`GET /api/posts`**
    * Obtiene todos los posts, "populando" la información del autor.
    * **Ruta pública.**

* **`POST /api/posts`**
    * Crea un nuevo post.
    * **Ruta protegida (Requiere Bearer Token).**
    * **Body:** `{ "titulo": "Mi primer post", "contenido": "Este es el contenido." }`

* **`PUT /api/posts/:idPost`**
    * Actualiza un post existente. Solo el autor del post puede editarlo.
    * **Ruta protegida (Requiere Bearer Token).**
    * **Body:** `{ "titulo": "Título editado" }` (Admite edición parcial).

* **`DELETE /api/posts/:idPost`**
    * Elimina un post existente. Solo el autor del post puede eliminarlo.
    * **Ruta protegida (Requiere Bearer Token).**