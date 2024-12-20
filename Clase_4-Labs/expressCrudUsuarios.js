import express from "express";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

class Usuario {
    constructor(nombre, apellido, edad, genero) {
        this.id = crypto.randomUUID().split("-").join("");
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.genero = genero;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
}
const usuarios = [];

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Comment: endpoint/ruta para obtener listado de usuarios, con filtro opcional por género
app.get("/api/usuarios", (req, res) => {
    const { genero } = req.query;
    if (!genero) {
        return res.status(200).json({ success: true, usuarios: usuarios });
    }

    if (genero !== "M" && genero !== "F") {
        return res.status(400).json({
            success: false,
        });
    }

    const usuariosDeGenero = usuarios.filter(
        (usuario) => usuario.genero == genero
    );
    res.status(200).json({ success: true, usuarios: usuariosDeGenero });
});

// Comment: endpoint/ruta para obtener un usuario particular por id
app.get("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const usuario = usuarios.find((usuario) => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({
            success: false,
            message: "No existe el usuario",
        });
    }

    res.status(200).json({
        usuario,
    });
});

// Comment: endpoint/ruta para crear un nuevo usuario
app.post("/api/usuarios", (req, res) => {
    const { nombre, apellido, edad, genero } = req.body;

    if (!nombre || !apellido || !edad || !genero) {
        // Comment: se pueden hacer más validaciones, por ej. tipos de dato
        return res.status(400).json({
            success: false,
            message: "Faltan datos",
        });
    }

    const nuevoUsuario = new Usuario(nombre, apellido, edad, genero);

    usuarios.push(nuevoUsuario);
    res.status(201).json({
        success: true,
        usuario: nuevoUsuario,
    });
});

// Comment: endpoint/ruta para modificar un usuario
app.put("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, genero } = req.body;

    const usuario = usuarios.find((usuario) => usuario.id === id);

    if (!usuario) {
        return res.status(404).json({
            success: false,
            message: "No existe el usuario",
        });
    }

    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.edad = edad;
    usuario.genero = genero;

    res.status(200).json({
        success: true,
        usuario,
    });
});

// Comment: endpoint/ruta para eliminar un usuario
app.delete("/api/usuarios/:id", (req, res) => {
    const { id } = req.params;

    const index = usuarios.findIndex((usuario) => usuario.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "No existe el usuario",
        });
    }

    usuarios.splice(index, 1);

    res.status(200).json({
        success: true,
        usuarios,
    });
});

// Comment: ejemplo sobre como enviar un html al navegador
app.get("/bienvenida", (req, res) => {
    res.sendFile(path.join(__dirname, "welcome.html"));
});

// Comment: endpoint/ruta para manejar errores 404 por ruta inexistente
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "error404.html"));
});

app.listen(3000, () => {
    console.log("Server corriendo en puerto 3000");
});
