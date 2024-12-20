import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const frase = "Frase inicial";

app.get("/api/frase", (req, res) => {
    res.status(200).json({
        frase: frase,
    });
});

app.get("/api/palabras/:pos", (req, res) => {
    const { pos } = req.params;

    const palabras = frase.split(" ");
    const palabra = palabras[pos - 1];

    if (!palabra) {
        return res.status(400).json({
            error: "No existe palabra en la posición indicada",
        });
    }

    res.status(200).json({
        palabra: palabra,
    });
});

app.post("/api/palabras", (req, res) => {
    const { palabra } = req.body;
    if (!palabra) {
        res.status(400).json({
            error: "No se ha enviado la palabra",
        });
    }

    frase.concat(` ${palabra}`);
    posicion = frase.split(" ").length - 1;

    res.status(200).json({
        agregada: palabra,
        posicion,
    });
});

app.put("/api/palabras/:pos", (req, res) => {
    const { pos } = req.params;
    const { palabra } = req.body;

    const palabras = frase.split(" ");
    const anterior = palabras[pos - 1];
    palabras[pos] = palabra;
    frase = palabras.join(" ");

    res.status(200).json({
        actualizada: palabra,
        anterior,
    });
});

app.delete("/api/palabras/:pos", (req, res) => {
    const { pos } = req.params;
    const palabras = frase.split(" ");
    const eliminada = palabras.splice(pos - 1, 1)[0];
    frase = palabras.join(" ");
    res.status(200).json({
        eliminada,
    });
});
