const sumar = async (sum1, sum2) => {
    if (sum1 === 0 || sum2 === 0) {
        throw new Error("Operación innecesaria");
    }

    if (sum1 + sum2 < 0) {
        throw new Error("La calculadora solo debe devolver valores positivos");
    }

    // Simular una operación asíncrona
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return sum1 + sum2;
};

const restar = async (minuendo, sustraendo) => {
    if (minuendo === 0 || sustraendo === 0) {
        throw new Error("Operación inválida");
    }

    if (minuendo - sustraendo < 0) {
        throw new Error("La calculadora solo debe devolver valores positivos");
    }

    // Simular una operación asíncrona
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return minuendo - sustraendo;
};

const multiplicar = async (fact1, fact2) => {
    if (fact1 * fact2 < 0) {
        throw new Error("La calculadora solo debe devolver valores positivos");
    }

    // Simular una operación asíncrona
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return fact1 * fact2;
};

const dividir = async (dividendo, divisor) => {
    if (divisor === 0) {
        throw new Error("Operación inválida");
    }

    if (dividendo / divisor < 0) {
        throw new Error("La calculadora solo debe devolver valores positivos");
    }

    // Simular una operación asíncrona
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return dividendo / divisor;
};

const calcular = async () => {
    try {
        const suma = await sumar(3, 5);
        console.log(`3 + 5: ${suma}`);
    } catch (error) {
        console.log(`Error en suma: ${error}`);
    }

    try {
        const resta = await restar(8, 3);
        console.log(`8 - 3: ${resta}`);
    } catch (error) {
        console.log(`Error en resta: ${error}`);
    }

    try {
        const restaInv = await restar(3, 8);
        console.log(`3 - 8: ${restaInv}`);
    } catch (error) {
        console.log(`Error en resta inversa: ${error}`);
    }

    try {
        const multiplicacion = await multiplicar(5, 2);
        console.log(`5 * 2: ${multiplicacion}`);
    } catch (error) {
        console.log(`Error en multiplicación: ${error}`);
    }

    try {
        const division = await dividir(10, 5);
        console.log(`10 / 5: ${division}`);
    } catch (error) {
        console.log(`Error en división: ${error}`);
    }

    try {
        const divisionInv = await dividir(5, 0);
        console.log(`5 / 0: ${divisionInv}`);
    } catch (error) {
        console.log(`Error en división inválida: ${error}`);
    }
};

calcular();
