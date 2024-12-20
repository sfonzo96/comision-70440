class Contador {
    static cuentaGlobal = 0;
    #cuentaIndividual = 0;
    #responsable = null;
    constructor(responsable) {
        this.responsable = responsable;
        // Contador.cuentaGlobal++;   // Esta línea es solo si se quiere incrementar el contador al crear la instancia
    }

    getResponsable() {
        return this.#responsable;
    }

    getCuentaIndividual() {
        return this.#cuentaIndividual;
    }

    getCuentaGlobal() {
        return Contador.cuentaGlobal;
    }

    contar() {
        this.#cuentaIndividual++;
        Contador.cuentaGlobal++;
    }
}

const contador1 = new Contador("Juan");
console.log(contador1.getCuentaGlobal());
contador1.contar();
contador1.contar();
console.log(contador1.getCuentaIndividual());

console.log("--------------------");

const contador2 = new Contador("Ana");
console.log(contador1.getCuentaGlobal());
contador2.contar();
console.log(contador2.getCuentaIndividual());
