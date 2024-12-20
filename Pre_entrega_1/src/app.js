import express from "express";
import indexRouter from "./routes/index.routes.js";

const app = express();
const PORT = 8080;
// Configuracion inicial para interpretar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(PORT, (err) => {
    if (err) {
        console.log("No se pudo iniciar el servidor");
        return;
    }

    console.log(`Servidor iniciado con éxito en puerto ${PORT}`);
});
