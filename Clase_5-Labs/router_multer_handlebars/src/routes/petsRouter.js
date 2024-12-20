import express from "express";
import { getFromJSON, saveToJSON, JSONExists } from "../utils/jsonTools.js";
import upload from "../middlewares/multerUploader.js";
import Pet from "../models/Pet.js";

const petsRouter = express.Router();
const JSONpath = "./src/data/pets.json";

petsRouter.get("/", async (req, res) => {
    if (!(await JSONExists(JSONpath))) {
        await saveToJSON(JSONpath, []);
    }

    const pets = await getFromJSON(JSONpath);
    res.status(200).json({ success: true, pets });
});

petsRouter.post("/", upload.single("file"), async (req, res) => {
    try {
        const pets = await getFromJSON(JSONpath);
        const { name, description } = req.body;
        const file = req.file;
        const newPet = new Pet(
            name,
            description,
            `http://localhost:8080/pics/pets/${file.filename}`
        );

        pets.push(newPet);
        await saveToJSON(JSONpath, pets);
        res.status(201).json({ success: true, newPet });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

export default petsRouter;
