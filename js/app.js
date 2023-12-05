
// mejoras pendientes:
// agregar que se compare en la búsqueda sin espacios
// Hacer que la ventana modal me permita scroll cuando hay muchas reservas


//desplegar menú hamburguesa
const menuIcon = document.getElementById('menuIcon');
const navbarLinks = document.getElementById('navbarMenu');

menuIcon.addEventListener('click', function () {
    navbarLinks.classList.toggle('show');
});



const reservas = [];

let reservasLocalStorage = JSON.stringify(localStorage.getItem("nuevasReservas"));//sólo para cumplir con el curso
console.log (JSON.parse (reservasLocalStorage));//sólo para cumplir con el curso
//localStorage.clear(); //si quisera borrar el LocalStorage. Pero si lo borro, no funcionan las dos líneas de arriba

class Reserva {
    constructor (nroReserva, nombre, apellido, cantDias, cantHuespedes, email) {
        this.nroReserva = nroReserva;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cantDias = cantDias;
        this.cantHuespedes = cantHuespedes;
        this.email = email;
        this.mensaje = function () {
            console.log (`Reserva nro ${nroReserva} confirmada. Por ${cantDias} días para ${cantHuespedes} personas.`)
        }
    }
}


let nombre = "";
let apellido = "";
let iDias = "";
let iHuespedes = "";
let email = "";
let nroValidaciones = 0;


function formatearPalabra (element) {
    element = element.toLowerCase(); 
    return element.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');     
}

function obtenerDatosReserva() {
    nombre = document.getElementById("inputNombre").value;
    nombre = formatearPalabra (nombre);
    apellido = document.getElementById("inputApellido").value;
    apellido = formatearPalabra (apellido);
    iDias = document.getElementById("inputDias").value;
    iDias = parseInt (iDias);
    iHuespedes = document.getElementById("inputCHuespedes").value;
    iHuespedes = parseInt (iHuespedes);
    email = document.getElementById("inputEmail").value;
    email = email.toLowerCase();
    console.log (`Se obtuvieron los siguientes datos: Nombre: ${nombre}, Apellido: ${apellido}`)
}



function generarNumeroReserva () {
    return ( Math.ceil (Math.random () * 9999 + 1));
}

function guardarReservasLocalStorage (){ //sólo para cumplir con el curso
    let nuevasReservas = JSON.stringify (reservas);
    localStorage.setItem("nuevasReservas", nuevasReservas);
}


function guardarReserva () {
    reservas.push (new Reserva(
        generarNumeroReserva(),
        nombre,
        apellido,
        iDias,  
        iHuespedes,
        email
    ));
    guardarReservasLocalStorage (); //sólo para cumplir con el curso
}


const buttonReserva = document.getElementById("buttonReserva");

if (buttonReserva) {
    buttonReserva.addEventListener("click", function(e) {
        nroValidaciones = 0;
        e.preventDefault();
        obtenerDatosReserva ();
        validarPalabra (nombre, "nombre", document.getElementById("divValidacionNombre"));
        console.log (nroValidaciones);
        validarPalabra (apellido, "apellido", document.getElementById("divValidacionApellido")); 
        console.log (nroValidaciones);
        validarNumero (iDias, "cantidad de días", document.getElementById("divValidacionIdias"));
        console.log (nroValidaciones);  
        validarNumero (iHuespedes, "cantidad de huéspedes", document.getElementById("divValidacionIhuesped"));
        console.log (nroValidaciones);
        validarEmail(email, "email", document.getElementById("divValidacionEmail"));
        console.log (nroValidaciones);
        if (nroValidaciones >= 5) {
            console.log ("reserva guardada correctamente");
            guardarReserva ();
            //mostrar modal!
            const modalContent = document.getElementById("modal-1-BusquedaReserva-content");
            modalContent.innerHTML = " "; 
            modalContent.innerHTML = ` <img src="../assets/img/logo.png" alt="Logo Ambar Posada" class="size-logo-reserva"></img>
                                    <p> Se ha guardado tu solicitud de reserva correctamente. 
                                    <br> A la brevedad nos comunicaremos con vos para indicarte los medios de pago </p>
                                    `;
            modal1.style.display = 'block'; 
        }
        else {
            console.log ("Corrige los campos mal completados para finalizar tu reserva");
        }    
    });
}


function validarNumero (el, titulo, ubicacion) {
    let divValidacion = ubicacion;
    divValidacion.innerText = " ";
    if (el === ""){
        console.log (`Debes ingresar un valor para ${titulo} `);
        divValidacion.innerText =  ` Debes ingresar un valor para ${titulo} `;
        divValidacion.classList.add("errorValidacion");
    }
    else if (!/^[0-9]\d*$/.test(el)) {
        console.log (`Ingresa un número válido para ${titulo} `);
        divValidacion.innerText =  ` Ingresa un número válido para ${titulo} `;
        divValidacion.classList.add("errorValidacion");
    }
    else if ( el < 1) {
        console.log (`El valor para ${titulo} no puede ser menor a 1`);
        divValidacion.innerText =  ` El valor para ${titulo} no puede ser menor a 1 `;
        divValidacion.classList.add("errorValidacion");
    }
    else {  
        console.log (` ${titulo} registrado`);
        nroValidaciones ++;
        return nroValidaciones;
    }
    return nroValidaciones; 
}


function validarPalabra (el, titulo, ubicacion) {
    let divValidacion = ubicacion;
    divValidacion.innerText = " ";
    if (el === ""){
        console.log (` Debes ingresar un valor para ${titulo} `);
        divValidacion.innerText =  ` Debes ingresar un valor para ${titulo} `;
        divValidacion.classList.add("errorValidacion");
    }
    else if (/^[0-9]+$/.test(el) === true) {
        console.log (` Ingresa ${titulo} válido sin números ni caracteres especiales`);
        divValidacion.innerText = ` Ingresa ${titulo} válido sin números ni caracteres especiales`;
        divValidacion.classList.add("errorValidacion");
    }
    else {
        console.log (` ${titulo} registrado`);
        nroValidaciones ++;
        return nroValidaciones;
    }
    return nroValidaciones; 
}                 


function validarEmail(el, titulo, ubicacion) {
    let divValidacion = ubicacion;
    divValidacion.innerText = " ";
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let esEmailValido = regex.test(el);

    if (esEmailValido) {
        console.log(` ${titulo} registrado`);
        nroValidaciones ++;
        return nroValidaciones;
    } else {
        console.log(`Ingresa un ${titulo} válido`);
        divValidacion.innerText = ` Ingresa un ${titulo} válido`;
        divValidacion.classList.add("errorValidacion");
    }
    return nroValidaciones;
}


if (busquedaNombreApellido) {
    busquedaNombreApellido.addEventListener("click", function(e) {
        e.preventDefault();
        console.log ("Click busqueda por nombre y apellido activado");
        busquedaXnombre ();
    });
}

if (busquedaNroReserva) {
    busquedaNroReserva.addEventListener("click", function(e) {
        e.preventDefault();
        busquedaXnro ();
    });
}


const modal1 = document.getElementById("modal-1-Reservas");


function busquedaXnombre () {    
    let nombreBusqueda = document.getElementById("inputBusquedaNombre").value;
    let apellidoBusqueda = document.getElementById("inputBusquedaApellido").value;
    nombreBusqueda = formatearPalabra (nombreBusqueda);
    apellidoBusqueda = formatearPalabra (apellidoBusqueda);
            
    console.log ("se entró a la función busquedaXnombre");
    const BusquedaReserva = reservas.filter ( (el) =>(el.nombre === (nombreBusqueda) && el.apellido === (apellidoBusqueda))) ;
    console.log (BusquedaReserva);
    const modalContent = document.getElementById("modal-1-BusquedaReserva-content");
            
        if (BusquedaReserva.length === 0) {
            //let contenidoReservas = document.createElement ("div");
            modalContent.innerHTML = " "; 
            modalContent.innerHTML = ` <img src="../assets/img/logo.png" alt="Logo Ambar Posada" class="size-logo-reserva"></img>
                                    <p>No se encontró ninguna búsqueda bajo el nombre ${nombreBusqueda} ${apellidoBusqueda} </p>
                                    `;  
        } else { 
            modalContent.innerHTML = " ";
            modalContent.innerHTML = `<img src="../assets/img/logo.png" alt="Logo Ambar Posada" class="size-logo-reserva"></img>
                                    <p>Se encontraron las siguientes reservas bajo el nombre ${nombreBusqueda} ${apellidoBusqueda}:</p>
                                    `
            
            BusquedaReserva.map((el) => {
                let reservaInfo = document.createElement ("div");
                reservaInfo.innerHTML = " "; 
                reservaInfo.innerHTML = `
                                        <br><br>
                                        <p class="negrita">Reserva número ${el.nroReserva} </p>
                                        <br>
                                        <p>Cantidad de dias: ${el.cantDias} </p>
                                        <p>Cantidad de huéspedes: ${el.cantHuespedes} </p>
                                        <p>Email de contacto: ${el.email} </p>
                                        <br>
                                        `
                reservaInfo.classList.add("flex-main");
                modalContent.appendChild (reservaInfo); 
                });
        }
    //muestro modal
    modal1.style.display = 'block';        
}


//cerrar modal
const closeModalBtn = document.getElementById("closeModal1");

closeModal1.addEventListener('click', function () {
    modal1.style.display = 'none';
});


function busquedaXnro() {    
    let busqueda = document.getElementById("inputBusquedaNro").value;
    console.log (busqueda);

    const BusquedaReserva = reservas.filter ( (el) =>(el.nroReserva === (parseInt (busqueda)) )) ;
    console.log (BusquedaReserva);
    const modalContent = document.getElementById("modal-1-BusquedaReserva-content");

            
        if (BusquedaReserva.length === 0) {
            //let contenidoReservas = document.createElement ("div");
            modalContent.innerHTML = " "; 
            modalContent.innerHTML = `<p>No se encontró ninguna búsqueda bajo el número de reserva ${busqueda} </p>`;
        } else { 
            modalContent.innerHTML = " ";
            modalContent.innerHTML = `<img src="../assets/img/logo.png" alt="Logo Ambar Posada" class="size-logo-reserva"></img>                                    `
            
            BusquedaReserva.map((el) => {
                let reservaInfo = document.createElement ("div");
                reservaInfo.innerHTML = " "; 
                reservaInfo.innerHTML = `    
                                        <p>Se encontraron las siguientes reservas bajo el número de reserva ${el.nroReserva} :</p>
                                        <p>Nombre: ${el.nombre} ${el.apellido} </p>
                                        <p>Cantidad de dias: ${el.cantDias} </p>
                                        <p>Cantidad de huéspedes: ${el.cantHuespedes} </p>
                                        <p>Email de contacto: ${el.email} </p>
                                        `
                reservaInfo.classList.add("flex-main");
                modalContent.appendChild (reservaInfo); 
                });
        }
    modal1.style.display = 'block';             
}