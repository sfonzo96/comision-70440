import express from "express";
import path from "path";
import sourcePath from "../sourcePath.js";
const viewsRouter = express.Router();

viewsRouter.get("/pets", (req, res) => {
    res.sendFile(path.join(sourcePath, "views/pets.html"));
});

export default viewsRouter;
