class Evento {
    static maxId = 0;
    constructor(nombre, lugar, precio, capacidad = 50, fecha = new Date()) {
        this.id = ++Evento.maxId;
        this.nombre = nombre;
        this.lugar = lugar;
        this.precio = precio;
        this.capacidad = capacidad;
        this.fecha = fecha;
        this.participantes = [];
        console.log(
            `Se creo el evento ${this.nombre} en ${lugar}, con un precio de ${
                this.precio
            }, el día ${this.fecha.getDate()}-${this.fecha.getMonth()}-${this.fecha.getFullYear()}`
        );
    }

    agregarUsuario(usuario) {
        if (this.participantes.length >= this.capacidad) {
            console.log("Evento lleno");
            return;
        }

        if (this.participantes.includes(usuario)) {
            console.log("Usuario ya registrado en evento");
            return;
        }

        if (this.fecha < new Date()) {
            console.log("El evento ya finalizó");
            return;
        }

        this.participantes.push(usuario);
        console.log(`Usuario ${usuario} registrado en evento ${this.nombre}`);
    }
}

class TicketManager {
    static eventos = [];
    static maxId = 0;
    #margenGanancia;

    constructor(margenGanancia) {
        this.#margenGanancia = margenGanancia + 1;
    }

    getEventos() {
        return TicketManager.eventos;
    }

    agregarEvento(evento) {
        // evento.id = ++TicketManager.maxId // Se llevo propiedad estatica a clase Evento
        TicketManager.eventos.push(evento);
        console.log(`Evento ${evento.nombre} agregado`);
    }

    agregarUsuarioAEvento(eventoId, usuario) {
        const evento = TicketManager.eventos.find(
            (evento) => evento.id === eventoId
        );
        if (evento) {
            evento.agregarUsuario(usuario);
        } else {
            console.log("Evento no encontrado");
        }
    }

    ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
        const evento = TicketManager.eventos.find(
            (evento) => evento.id === idEvento
        );
        if (evento) {
            const copiaEvento = {
                ...evento,
                id: ++Evento.maxId,
                lugar: nuevaLocalidad,
                fecha: nuevaFecha,
            };

            TicketManager.eventos.push(copiaEvento);

            console.log(
                `Evento ${copiaEvento.nombre} se puso en gira, ahora en ${
                    copiaEvento.lugar
                }, el día ${copiaEvento.fecha.getDate()}-${copiaEvento.fecha.getMonth()}-${copiaEvento.fecha.getFullYear()}`
            );
        } else {
            console.log("Evento no encontrado");
        }
    }

    mostrarEventos() {
        TicketManager.eventos.forEach((evento) => {
            console.log(
                `- Evento ${evento.nombre} en ${evento.lugar}, con un precio de ${evento.precio}`
            );
        });
    }
}

const evento1 = new Evento(
    "Evento 1",
    "Lugar 1",
    2000,
    100,
    new Date(2024, 11, 24)
);
const evento2 = new Evento(
    "Evento 2",
    "Lugar 2",
    3000,
    50,
    new Date(2024, 11, 25)
);
const ticketManager = new TicketManager(0.15);
ticketManager.agregarEvento(evento1);
ticketManager.agregarEvento(evento2);

ticketManager.agregarUsuarioAEvento(1, "u1");
ticketManager.agregarUsuarioAEvento(1, "u2");
ticketManager.agregarUsuarioAEvento(2, "u1");

ticketManager.ponerEventoEnGira(1, "Lugar 3", new Date(2024, 11, 31));

ticketManager.mostrarEventos();
