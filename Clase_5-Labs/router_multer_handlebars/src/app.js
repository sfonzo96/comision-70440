import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import indexRouter from "./routes/index.js";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/pics/pets", express.static(`src/public/assets/pets`));

app.use("/", indexRouter);

app.get("*", (req, res) => {
    res.status(404).send("404 | Page not found");
});

app.listen(8080, () => {
    console.log("Server corriendo en puerto 8080");
});
