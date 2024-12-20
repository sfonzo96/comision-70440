const sumar = (sum1, sum2) => {
    return new Promise((resolve, reject) => {
        if (sum1 === 0 || sum2 === 0) {
            reject("Operación innecesaria");
        }

        if (sum1 + sum2 < 0) {
            reject("La calculadora solo debe devolver valores positivos");
        }

        setTimeout(() => {
            resolve(sum1 + sum2);
        }, 1000);
    });
};

const restar = (minuendo, sustraendo) => {
    return new Promise((resolve, reject) => {
        if (minuendo === 0 || sustraendo === 0) {
            reject("Operación inválida");
        }

        if (minuendo - sustraendo < 0) {
            reject("La calculadora solo debe devolver valores positivos");
        }

        setTimeout(() => {
            resolve(minuendo - sustraendo);
        }, 1000);
    });
};

const multiplicar = (fact1, fact2) => {
    return new Promise((resolve, reject) => {
        if (fact1 * fact2 < 0) {
            reject("La calculadora solo debe devolver valores positivos");
        }

        setTimeout(() => {
            resolve(fact1 * fact2);
        }, 1000);
    });
};

const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if (divisor === 0) {
            reject("Operación inválida");
        }

        if (dividendo / divisor < 0) {
            reject("La calculadora solo debe devolver valores positivos");
        }

        setTimeout(() => {
            resolve(dividendo / divisor);
        }, 1000);
    });
};

const calcular = async () => {
    try {
        const suma = await sumar(3, 5);
        console.log(`3 + 5: ${suma}`);
    } catch (error) {
        console.log(`Promesa rechazada para 3 + 5: ${error}`);
    }

    try {
        const resta = await restar(8, 3);
        console.log(`8 - 3: ${resta}`);
    } catch (error) {
        console.log(`Promesa rechazada para 8 - 3: ${error}`);
    }

    try {
        const restaInv = await restar(3, 8);
        console.log(`3 - 8: ${restaInv}`);
    } catch (error) {
        console.log(`Promesa rechazada para 3 - 8: ${error}`);
    }

    try {
        const multiplicacion = await multiplicar(5, 2);
        console.log(`5 * 2: ${multiplicacion}`);
    } catch (error) {
        console.log(`Promesa rechazada para 5 * 2: ${error}`);
    }

    try {
        const division = await dividir(10, 5);
        console.log(`10 / 5: ${division}`);
    } catch (error) {
        console.log(`Promesa rechazada para 10 / 5: ${error}`);
    }

    try {
        const divisionInv = await dividir(5, 0);
        console.log(`5 / 0: ${divisionInv}`);
    } catch (error) {
        console.log(`Promesa rechazada para 5 / 0: ${error}`);
    }
};

calcular();
