import express from "express";
import Product from "../models/Product.js";
import FileManager from "../utils/FilesManager.js";

const productsRouter = express.Router();
const productsManager = new FileManager("./src/data/products.json");

productsRouter.get("/", async (req, res) => {
    const { limit = 10 } = req.query;
    const products = await productsManager.read();

    res.status(200).json({ success: true, products: products.slice(0, limit) });
});

productsRouter.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const products = await productsManager.read();

    const product = products.find((p) => p.id === pid);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "No se encontró el producto.",
        });
    }

    return res.status(200).json({ success: true, product });
});

productsRouter.post("/", async (req, res) => {
    const {
        title,
        description,
        code,
        price,
        status = true,
        category,
        stock,
        thumbnails,
    } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res
            .status(400)
            .json({ success: false, message: "Falta información." });
    }

    if (isNaN(price) || isNaN(stock)) {
        return res.status(400).json({
            success: false,
            message: "Stock y precio deben ser numéricos.",
        });
    }

    const products = await productsManager.read();

    const product = products.find((p) => p.code === code);
    if (product) {
        return res.status(409).json({
            success: false,
            message: "Ya existe un producto con ese código.",
        });
    }

    const newProduct = new Product(
        title,
        description,
        code,
        price,
        category,
        thumbnails,
        status
    );

    products.push(newProduct);

    await productsManager.write(products);

    return res.status(201).json({ success: true, newProduct });
});

productsRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { title, description, price, category, thumbnails, stock } = req.body;

    const products = await productsManager.read();
    const product = products.find((p) => p.id === pid);
    if (!product) {
        return res
            .status(404)
            .json({ succes: false, message: "El producto no existe." });
    }

    product.title = title ? title : product.title;
    product.description = description ? description : product.description;
    product.price = price ? price : product.price;
    product.category = category ? category : product.category;
    product.thumbnails = thumbnails ? thumbnails : product.thumbnails;
    product.stock = stock ? stock : product.stock;

    await productsManager.write(products);

    return res.status(200).json({ success: true, product });
});

productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    const { status } = req.body;

    if (status !== false) {
        return res.status(400).json({
            success: false,
            message: "El valor ingresado es incorrecto.",
        });
    }

    const products = await productsManager.read();

    const product = products.find((p) => p.id === pid);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "El producto no existe." });
    }

    product.status = status;

    await productsManager.write(products);

    return res
        .status(200)
        .json({ success: true, message: "Producto eliminado." });
});

productsRouter.put("/recover/:pid", async (req, res) => {
    const { pid } = req.params;
    const { status } = req.body;

    if (status !== true) {
        return res.status(400).json({
            success: false,
            message: "El valor ingresado es incorrecto.",
        });
    }

    const products = await productsManager.read();

    const product = products.find((p) => p.id === pid);
    if (!product) {
        return res
            .status(404)
            .json({ success: false, message: "El producto no existe." });
    }

    product.status = status;

    await productsManager.write(products);

    res.status(200).json({ success: true, message: "Producto recuperado." });
});

export default productsRouter;
