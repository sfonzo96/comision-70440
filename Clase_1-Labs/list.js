const mostrarLista = (list) => {
    if (list.length > 0) {
        list.forEach((item) => {
            console.log(item);
        });

        return list.length;
    }

    return "Lista vacía";
};

const listaVacia = [];

const listaLlena = ["item1", "item2", "item3"];

console.log("Lista llena:\n");
console.log(mostrarLista(listaVacia));
console.log("----------------------------------");
console.log("Lista llena:\n");
console.log(mostrarLista(listaLlena));
