const generateRandomHistogram = async (n, min, max) => {
    const histogram = {};

    for (let i = 0; i < n; i++) {
        const number = Math.floor(Math.random() * max + min);
        histogram[number] = histogram[number] ? histogram[number] + 1 : 1;
    }

    return histogram;
};

const printHistogram = (histogram, symbol = "#") => {
    for (number in histogram) {
        const frequency = histogram[number];
        let line = `${number}:\t`;
        for (i = 0; i < frequency; i++) {
            line += symbol;
        }

        console.log(line);
    }
};

const getMode = (histogram) => {
    // Moda es el dato que más se repite en una muestra
    let mode = {
        value: 0,
        frequency: 0,
    };

    for (number in histogram) {
        const frequency = histogram[number];

        if (frequency > mode.frequency) {
            mode.value = number;
            mode.frequency = frequency;
        }
    }

    return mode;
};

const getMean = (histogram) => {
    // Media es esencialmente el promedio
    const sum = Object.keys(histogram).reduce((acc, key) => {
        return acc + histogram[key];
    }, 0);

    const mean = sum / Object.keys(histogram).length;

    return mean.toFixed(2);
};

const getStandarDeviation = (histogram) => {
    // La desviación estándar es una medida de dispersión, indica cuánto se alejan, en promedio, los datos de la media
    const mean = getMean(histogram);
    const squaredSum = Object.keys(histogram).reduce((acc, key) => {
        return acc + Math.pow(histogram[key] - mean, 2);
    }, 0);

    const variance = squaredSum / (Object.keys(histogram).length - 1);
    const standarDeviation = Math.sqrt(variance);

    return standarDeviation.toFixed(2);
};

const printStatistics = (histogram) => {
    const mode = getMode(histogram);
    console.log(
        `La moda es: ${mode.value}. Tiene una frecuencia absoluta de ${mode.frequency}.`
    );
    console.log(`La media es: ${getMean(histogram)}`);
    console.log(`La desviación estándar es: ${getStandarDeviation(histogram)}`);
};

const run = async () => {
    const histogram = await generateRandomHistogram(500, 1, 20);
    console.log("Histograma: \n");
    printHistogram(histogram), "#";

    console.log("\nEstadísticas: \n");
    printStatistics(histogram);
};

run();
