import fs from "fs";

export const getFromJSON = async (path) => {
    const JSONdata = await fs.promises.readFile(path, "utf-8");
    return JSON.parse(JSONdata);
};

export const saveToJSON = async (path, data) => {
    await fs.promises.writeFile(path, JSON.stringify(data, null, 2));
};

export const JSONExists = async (path) => {
    try {
        await fs.promises.access(
            path,
            fs.promises.constants.W_OK | fs.promises.constants.R_OK
        );
        return true;
    } catch (error) {
        return false;
    }
};
