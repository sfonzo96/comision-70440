import crypto from "crypto";

class User {
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = crypto.hash("sha256", password);
        console.log(this.password);
    }
}

class UsersManager {
    static users = [];

    static createUser = (firstName, lastName, username, password) => {
        const user = new User(firstName, lastName, username, password);
        UsersManager.users.push(user);
    };

    static verifyUser(username, password) {
        const user = UsersManager.users.find(
            (user) => user.username === username
        );
        if (user && user.password === crypto.hash("sha1", password)) {
            console.log(`Bienvenido ${user.firstName} ${user.lastName}.\n`);
            return;
        }

        console.log(`Usuario o contraseña incorrectos.\n`);
    }

    static getUsers() {
        console.log(`Usuarios: \n`);
        UsersManager.users.forEach((user) => {
            console.log(`${user.username}: ${user.firstName} ${user.lastName}`);
        });
    }
}

UsersManager.createUser("Julia", "Perez", "juliap", "123456");
UsersManager.createUser("Franco", "Gomez", "francog", "123456");
UsersManager.verifyUser("juliap", "123456"); // Correcto
UsersManager.verifyUser("francog", "123455"); // Contraseña incorrecta
UsersManager.verifyUser("juanm", ""); // Usuario incorrecto

UsersManager.getUsers();
