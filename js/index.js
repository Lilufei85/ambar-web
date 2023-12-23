
let cantHabitaciones = 0;

function obtenerInfoHabitaciones() {
    return new Promise((resolve, reject) => {
        let resultado="";
        fetch("../JSON/habitaciones.json")
            .then(response => {
                if (!response.ok) { throw new Error("Error al cargar la API de habitaciones"); }
                return response.json();
            })
            .then(data => {
                calcularHabitaciones(data);
                resolve(data);
                resultado="resuelta";
            })
            .catch(error => {
                reject(error);
                resultado= "rechazada";
            })   
            .finally (() => {
                console.log ("Fin del proceso obterner info habitaciones. La promesa fue", resultado);
            })
    });
}

function calcularHabitaciones(habitacionesDisponibles) {
    habitacionesDisponibles.map((el) => {
        el.disponible === true && cantHabitaciones++; //&& remplaza al if simple. if (el.disponible === true) 
        return cantHabitaciones;
    });
}

function mostrarHabitaciones (cantHabitaciones) {
    const domHabitacionesDisponibles = document.getElementById ("divHabitacionesDisponibles");
    domHabitacionesDisponibles.innerHTML = ` <p> Quedan <span class="negrita"> ${cantHabitaciones} </span> habitaciones disponibles para hoy</p> </p>
    `; 
}

async function consultarHabitacionesDisponibles () {
    try {
        const habitacionesDisponibles = await obtenerInfoHabitaciones ();
        mostrarHabitaciones (cantHabitaciones);
    }
    catch (error) { console.error ("Error de consultarHabitacionesDisponibles:", error); }
}


consultarHabitacionesDisponibles ();