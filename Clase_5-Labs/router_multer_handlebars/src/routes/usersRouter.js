import express from "express";
import fs from "fs";
import Usuario from "../models/Usuario.js";
import { getFromJSON, saveToJSON, JSONExists } from "../utils/jsonTools.js";

const usersRouter = express.Router();
const JSONpath = "./src/data/usuarios.json";

usersRouter.get("/", async (req, res) => {
    const { genero } = req.query;

    if (!(await JSONExists(JSONpath))) {
        saveToJSON(JSONpath, []);
    }

    const usuarios = await getFromJSON(JSONpath);

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

usersRouter.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!(await JSONExists(JSONpath))) {
        return res.status(404).json({
            success: false,
            message: "No hay usuarios cargados",
        });
    }

    const usuarios = await getFromJSON(JSONpath);
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

usersRouter.post("/", async (req, res) => {
    const { nombre, apellido, edad, genero } = req.body;

    if (!nombre || !apellido || !edad || !genero) {
        // Comment: se pueden hacer más validaciones, por ej. tipos de dato con middleware express-validator
        return res.status(400).json({
            success: false,
            message: "Faltan datos",
        });
    }

    const nuevoUsuario = new Usuario(nombre, apellido, edad, genero);

    if (!(await JSONExists(JSONpath))) {
        const usuarios = [nuevoUsuario];
        await saveToJSON(JSONpath, usuarios);

        return res.status(201).json({
            success: true,
            usuario: nuevoUsuario,
        });
    }

    const usuarios = await getFromJSON(JSONpath);
    usuarios.push(nuevoUsuario);
    await saveToJSON(JSONpath, usuarios);

    res.status(201).json({
        success: true,
        usuario: nuevoUsuario,
    });
});

usersRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, edad, genero } = req.body;

    if (!(await JSONExists(JSONpath))) {
        return res.status(404).json({
            success: false,
        });
    }

    const usuarios = await getFromJSON(JSONpath);
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

    await saveToJSON(JSONpath, usuarios);

    res.status(200).json({
        success: true,
        usuario,
    });
});

usersRouter.delete("/:id", async (req, res) => {
    const { id } = req.params;

    if (!(await JSONExists(JSONpath))) {
        return res.status(404).json({
            success: false,
            message: "No hay usuarios cargados",
        });
    }
    const usuarios = await getFromJSON(JSONpath);
    const index = usuarios.findIndex((usuario) => usuario.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "No existe el usuario",
        });
    }

    usuarios.splice(index, 1);
    await saveToJSON(JSONpath, usuarios);

    res.status(200).json({
        success: true,
        usuarios,
    });
});
export default usersRouter;
