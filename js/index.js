
let cantHabitaciones = 0;

function obtenerInfoHabitaciones() {
    return new Promise((resolve, reject) => {
        let resultado="";
        fetch("./JSON/habitaciones.json")
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




const buttonResena = document.getElementById("reviewGoogle");

if (buttonResena) {
    buttonResena.addEventListener("click", function(e) {
        window.open("https://www.google.com/maps/place/Ambar+Posada/@-34.20478,-54.7653693,17z/data=!3m1!4b1!4m9!3m8!1s0x950b27936b33855f:0xd0a2007aff75538d!5m2!4m1!1i2!8m2!3d-34.20478!4d-54.7653693!16s%2Fg%2F11snyyr_1c?entry=ttu", "_blank");
    });
}



