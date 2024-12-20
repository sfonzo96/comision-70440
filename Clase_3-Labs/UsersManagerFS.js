import crypto from "crypto";
import fs from "fs";

class User {
    constructor(firstName, lastName, username, password) {
        this.id = crypto.randomUUID().split("-").join("");
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = crypto.hash("sha1", password);
    }
}

class UsersManager {
    constructor(path) {
        this.path = path;
    }

    async createUser(firstName, lastName, username, password) {
        const user = new User(firstName, lastName, username, password);

        await this.#saveUser(user);
    }

    async verifyUser(username, password) {
        const users = await this.#readUsers();
        const user = users.find((user) => user.username === username);
        if (user && user.password === crypto.hash("sha1", password)) {
            console.log(`Bienvenido ${user.firstName} ${user.lastName}.\n`);
            return;
        }

        console.log(`Usuario o contraseña incorrectos.\n`);
    }

    async getUsers() {
        const users = await this.#readUsers();
        console.log(`Usuarios: \n`);
        users.forEach((user) => {
            console.log(`${user.username}: ${user.firstName} ${user.lastName}`);
        });
    }

    async #readUsers() {
        try {
            if (!fs.existsSync(this.path)) {
                await fs.promises.writeFile(this.path, JSON.stringify([]));
            }

            const users = await fs.promises.readFile(this.path, "utf-8");
            if (!users) {
                return [];
            }

            return JSON.parse(users);
        } catch (error) {
            console.error(error);
        }
    }

    async #saveUser(user) {
        if (!fs.existsSync(this.path)) {
            await fs.promises.writeFile(this.path, JSON.stringify([]));
        }

        try {
            const users = await this.#readUsers();
            if (users.find((u) => u.username === user.username)) {
                console.log("El usuario ya existe.\n");
                return;
            }

            users.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(users));
        } catch (error) {
            console.error(error);
        }
    }
}

const usersManager = new UsersManager("./users.json");

const run = async () => {
    await usersManager.createUser("Julia", "Perez", "juliap", "123456");
    await usersManager.createUser("Franco", "Gomez", "francog", "123456");
    await usersManager.verifyUser("juliap", "123456"); // Correcto
    await usersManager.verifyUser("francog", "123455"); // Contraseña incorrecta
    await usersManager.verifyUser("juanm", ""); // Usuario incorrecto
    await usersManager.getUsers();
};

run();
