import fs from "fs";

export default class FileManager {
    constructor(path) {
        this.path = path;
    }

    async read() {
        await this.fileExists();

        const data = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(data);
    }

    async write(data) {
        await this.fileExists();

        await fs.promises.writeFile(this.path, JSON.stringify(data));
    }

    async getById(id) {
        const data = await this.read();
        return data.find((item) => item.id === id);
    }

    async fileExists() {
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]));
        }
    }
}
