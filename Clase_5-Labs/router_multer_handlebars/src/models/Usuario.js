import crypto from "crypto";

class Usuario {
    constructor(nombre, apellido, edad, genero) {
        this.id = crypto.randomUUID().split("-").join("");
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.genero = genero;
    }

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
}

export default Usuario;
