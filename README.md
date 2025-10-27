# Proyecto: Micro-Blog API (Backend) ✍️

Esta es la API RESTful para la aplicación "Micro-Blog", construida con el stack MERN como parte de mi plan de reactivación y portfolio. Interactúa con el [Frontend Micro-Blog Client](https://github.com/nicopowell/micro-blog-client). 


---

## 🚀 Stack de Tecnologías

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![bcrypt](https://img.shields.io/badge/bcrypt-62438A?style=for-the-badge)
![ES Modules](https://img.shields.io/badge/ES_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 🛠️ Instalación y Puesta en Marcha

1.  Clonar el repositorio:
    ```bash
    git clone https://github.com/nicopowell/micro-blog-api.git
    cd micro-blog-api 
    ```
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura (reemplaza con tus valores):
    ```bash
    # Conexión a MongoDB Atlas o local
    MONGO_CONNECT=mongodb+srv://tu_usuario:tu_password@tu_cluster...

    # Clave secreta larga y aleatoria para firmar los JWT
    JWT_SECRET=tu_secreto_aqui_inventado

    # Puerto donde correrá el servidor (Opcional, por defecto 3001)
    PORT=3001
    ```
4.  Correr el servidor en modo desarrollo (con recarga automática):
    ```bash
    npm run dev
    ```
    El servidor estará escuchando en `http://localhost:3001` (o el puerto que definiste).

---

## 📖 Endpoints (Rutas) de la API

### Autenticación (`/api/usuarios`)

* **`POST /api/usuarios/register`**
    * Crea un nuevo usuario.
    * **Body:**
        ```json
        {
          "nombre": "Nico",
          "email": "nico@correo.com",
          "password": "passwordCon8Caracteres"
        }
        ```
    * **Respuesta Exitosa (201 Created):**
        ```json
        {
          "msg": "Usuario registrado exitosamente"
        }
        ```
    * **Respuesta Error (400 Bad Request - Email duplicado):**
        ```json
        {
          "msg": "El email ya se encuentra registrado."
        }
        ```
    * **Respuesta Error (400 Bad Request - Validación):**
        ```json
        {
          "msg": "Error de validación:",
          "errors": [
            "El nombre debe tener al menos 3 caracteres",
            "La contraseña debe tener al menos 8 caracteres"
          ]
        }
        ```

* **`POST /api/usuarios/login`**
    * Inicia sesión y devuelve un token JWT.
    * **Body:**
        ```json
        {
          "email": "nico@correo.com",
          "password": "passwordCon8Caracteres"
        }
        ```
    * **Respuesta Exitosa (200 OK):**
        ```json
        {
          "msg": "Login exitoso",
          "token": "eyJh..."
        }
        ```
    * **Respuesta Error (400 Bad Request):**
        ```json
        {
          "msg": "Email o contraseña incorrectos"
        }
        ```

### Posts (`/api/posts`)

* **`GET /api/posts`**
    * Obtiene todos los posts, populando `nombre` y `email` del autor.
    * **Ruta pública.**
    * **Respuesta Exitosa (200 OK):**
        ```json
        {
          "statusCode": 200,
          "posts": [
            {
              "_id": "...",
              "titulo": "Mi Post",
              "contenido": "...",
              "autor": { "_id": "...", "nombre": "Nico", "email": "..." },
              "createdAt": "...",
              "updatedAt": "..."
            }
          ]
        }
        ```

* **`GET /api/posts/:postId`** * Obtiene un post específico por su ID, populando `nombre` y `email` del autor.
    * **Ruta pública.**
    * **Respuesta Exitosa (200 OK):**
        ```json
        {
          "_id": "...",
          "titulo": "Mi Post",
          "contenido": "...",
          "autor": { "_id": "...", "nombre": "Nico", "email": "..." },
          "createdAt": "...",
          "updatedAt": "..."
        }
        ```
    * **Respuesta Error (404 Not Found):**
        ```json
        {
          "msg": "No se encontro el post"
        }
        ```

* **`POST /api/posts`**
    * Crea un nuevo post.
    * **Ruta protegida (Requiere `Authorization: Bearer <token>`).**
    * **Body:**
        ```json
        {
          "titulo": "Nuevo Post",
          "contenido": "Contenido del nuevo post."
        }
        ```
    * **Respuesta Exitosa (201 Created):**
        ```json
        {
          "statusCode": 201,
          "msg": "Post creado"
        }
        ```

* **`PUT /api/posts/:postId`**
    * Actualiza un post existente. Solo el autor del post puede editarlo.
    * **Ruta protegida (Requiere `Authorization: Bearer <token>`).**
    * **Body (Ejemplo parcial):**
        ```json
        {
          "titulo": "Título actualizado"
        }
        ```
    * **Respuesta Exitosa (200 OK):**
        ```json
        {
          "msg": "Post editado",
          "post": { /* Objeto del post actualizado */ }
        }
        ```
    * **Respuesta Error (403 Forbidden):**
        ```json
        {
          "msg": "No tienes permiso de editar este post"
        }
        ```

* **`DELETE /api/posts/:postId`**
    * Elimina un post existente. Solo el autor del post puede eliminarlo.
    * **Ruta protegida (Requiere `Authorization: Bearer <token>`).**
    * **Respuesta Exitosa (200 OK):**
        ```json
        {
          "msg": "Post eliminado"
        }
        ```
    * **Respuesta Error (403 Forbidden):**
        ```json
        {
          "msg": "No tienes permiso de borrar este post"
        }
        ```