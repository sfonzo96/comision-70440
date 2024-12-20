import express from "express";
import productsRouter from "./products.routes.js";
import cartsRouter from "./carts.routes.js";

const indexRouter = express.Router();

indexRouter.use("/api/products", productsRouter);
indexRouter.use("/api/carts", cartsRouter);

indexRouter.use("*", (req, res) => {
    res.status(404).json({ message: "La ruta no existe." });
});

export default indexRouter;
