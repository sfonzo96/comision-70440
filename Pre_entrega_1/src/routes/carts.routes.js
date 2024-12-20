import express from "express";
import Cart from "../models/Cart.js";
import FileManager from "../utils/FilesManager.js";

const cartsManager = new FileManager("./src/data/carts.json");
const productsManager = new FileManager("./src/data/products.json");

const cartsRouter = express.Router();

cartsRouter.post("/", async (req, res) => {
    const { products } = req.body;

    const cart = new Cart(products);
    await cartsManager.write([cart]);

    res.status(201).json({ success: true, cart });
});

cartsRouter.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    const cart = await cartsManager.getById(cid);
    if (!cart) {
        return res
            .status(404)
            .json({ success: false, message: "No se encontró el carrito." });
    }

    const products = await productsManager.read();
    cart.products = cart.products.map((p) => {
        const product = products.find((prod) => p.product === prod.id);
        return {
            product,
            quantity: p.quantity,
        };
    });

    res.status(200).json({ success: true, cart });
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity = 1 } = req.body;

    const carts = await cartsManager.read();
    const cart = carts.find((c) => c.id === cid);

    if (!cart) {
        return res
            .status(404)
            .json({ success: false, message: "No se encontró el carrito." });
    }

    const product = await productsManager.getById(pid);
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "No se encontró el producto que querés agregar.",
        });
    }

    const productInCart = cart.products.find((p) => p.product === pid);

    if (productInCart) {
        productInCart.quantity += quantity;

        const updatedCarts = carts.map((c) => {
            if (c.id === cid) {
                return cart;
            }

            return c;
        });

        await cartsManager.write(updatedCarts);

        return res.status(200).json({ success: true, cart });
    }

    const newProductInCart = {
        product: pid,
        quantity,
    };

    cart.products.push(newProductInCart);

    const updatedCarts = carts.map((c) => {
        if (c.id === cid) {
            return cart;
        }

        return c;
    });

    await cartsManager.write(updatedCarts);

    res.status(201).json({ success: true, cart });
});
export default cartsRouter;
