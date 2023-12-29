
//desplegar menú hamburguesa
const menuIcon = document.getElementById('menuIcon');
const navbarLinks = document.getElementById('navbarMenu');

menuIcon.addEventListener('click', function () {
    navbarLinks.classList.toggle('show');
});



//LocalStorage

let reservasLocalStorage = JSON.parse(localStorage.getItem("nuevasReservas")) || []; //operador OR para valores falsy
//lo parseo para poder utilizarlo
//utilizo sugar syntax or para evitar errores por si no hay nada en local storage
//localStorage.clear(); //si quisera borrar el LocalStorage. Pero si lo borro, no funcionan las dos líneas de arriba


//estructura array y objeto ppal

//const reservas = []; //no lo borro porque quiero usar este con la API más adelante

class Reserva {
    constructor (nroReserva, nombre, apellido, cantDias, cantHuespedes, email) {
        this.nroReserva = nroReserva;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cantDias = cantDias;
        this.cantHuespedes = cantHuespedes;
        this.email = email;
    }
}

let nombre = "",
    apellido = "",
    iDias = "",
    iHuespedes = "",
    email = "",
    nroValidaciones = 0;


//mostrar y ocultar formularios reserva y busqueda

const mostrarFormReserva = document.getElementById("mostrarFormReserva");
const formReserva = document.getElementById("formReserva");

mostrarFormReserva.addEventListener('click', function () {
    formBusqueda.classList.add("hide"); // oculto el form que no uso
    formReserva.classList.toggle("hide");
    formReserva.classList.toggle("show");
});

const mostrarFormBusqueda = document.getElementById("mostrarFormBusqueda");
const formBusqueda = document.getElementById("formBusqueda");

mostrarFormBusqueda.addEventListener('click', function () {
    formReserva.classList.add("hide") // oculto el form que no uso
    formBusqueda.classList.toggle("hide");
    formBusqueda.classList.toggle("show");
}); 


//funciones anidadas

function formatearPalabra (element) {
    element = element.replace(/\s+/g, '');
    element = element.toLowerCase(); 
    element = element.trim();
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
}

function generarNumeroReserva () {
    return ( Math.ceil (Math.random () * 9999 + 1));
}

//aquí tmb hay local storage
function guardarReservasLocalStorage() {
    const ultimaReserva = reservas.length > 0 ? reservas[reservas.length - 1] : null; //operador ternario

    if (ultimaReserva) {
        reservasLocalStorage.push(ultimaReserva); 
        localStorage.setItem("nuevasReservas", JSON.stringify(reservasLocalStorage));
    }
}

function guardarReserva() {
    const nuevaReserva = new Reserva(
        generarNumeroReserva(),
        nombre,
        apellido,
        iDias,
        iHuespedes,
        email
    );

    reservas.push(nuevaReserva);
    guardarReservasLocalStorage();
}

function validarNumero (el, titulo, ubicacion) {
    let divValidacion = ubicacion;
    divValidacion.innerText = " ";
    if (el === ""){
        divValidacion.innerText =  ` Debes ingresar un número `;
        divValidacion.classList.add("errorValidacion");
    }
    else if (!/^[0-9]\d*$/.test(el)) {
        divValidacion.innerText =  ` Ingresa un número válido`;
        divValidacion.classList.add("errorValidacion");
    }
    else if ( el < 1) {
        divValidacion.innerText =  ` Este valor no puede ser menor a 1 `;
        divValidacion.classList.add("errorValidacion");
    }
    else {  
        nroValidaciones ++;
        return nroValidaciones;
    }
    return nroValidaciones; 
}

function validarPalabra (el, titulo, ubicacion) {
    let divValidacion = ubicacion;
    divValidacion.innerText = " ";
    if (el === ""){
        divValidacion.innerText =  ` Debes ingresar tu ${titulo} `;
        divValidacion.classList.add("errorValidacion");
    }
    else if (/^[0-9]+$/.test(el) === true) {
        divValidacion.innerText = ` Ingresa ${titulo} válido sin números ni caracteres especiales`;
        divValidacion.classList.add("errorValidacion");
    }
    else {
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
        nroValidaciones ++;
        return nroValidaciones;
    } else {
        divValidacion.innerText = ` Ingresa un ${titulo} válido`;
        divValidacion.classList.add("errorValidacion");
    }
    return nroValidaciones;
}

function borrarValoresInputs () {
    inputNombre.value = " ";
    inputApellido.value = " ";
    inputDias.value = " ";
    inputCHuespedes.value = " ";
    inputEmail.value = " ";
}


//acciones botón reserva

const buttonReserva = document.getElementById("buttonReserva");

if (buttonReserva) {
    buttonReserva.addEventListener("click", function(e) {
        nroValidaciones = 0;
        e.preventDefault();
        obtenerDatosReserva ();
        validarPalabra (nombre, "nombre", document.getElementById("divValidacionNombre"));
        validarPalabra (apellido, "apellido", document.getElementById("divValidacionApellido")); 
        validarNumero (iDias, "cantidad de días", document.getElementById("divValidacionIdias"));
        validarNumero (iHuespedes, "cantidad de huéspedes", document.getElementById("divValidacionIhuesped"));
        validarEmail(email, "email", document.getElementById("divValidacionEmail"));
        if (nroValidaciones >= 5) {
            guardarReserva ();
            /*//mostrar modal!
            const modalContent = document.getElementById("modal-1-BusquedaReserva-content");
            modalContent.innerHTML = " "; 
            modalContent.innerHTML = ` <img src="../assets/img/logo.png" alt="Logo Ambar Posada" class="size-logo-reserva"></img>
                                    <p> Se ha guardado tu solicitud de reserva correctamente. 
                                    <br> A la brevedad nos comunicaremos con vos para indicarte los medios de pago </p>
                                    `;
            modal1.style.display = 'block'; 
            borrarValoresInputs ();
            setTimeout( () => {
                modal1.style.display = "none"; // O modal.style.visibility = "hidden";
            }, 2000);
            clearTimeout (); */ 
            //dejo esto porque volveré a usar modal y sacar el toastify
            Toastify({
                close: true,
                text: "\n \n Solicitud de reserva exitosa. \n A la brevedad nos comunicaremos con vos para indicarte los medios de pago ",
                gravity: "top",
                duration: 2000,
                avatar: "../assets/img/logo.png",
                style: {
                    color: "#C7B6BA", 
                    fontFamily: "Montserrat, sans-serif", 
                    fontSize: "1.4rem",
                    background: "white",
                    height: "25vh",
                    width: "80%",
                    display: "flex",  
                    flexDirection: "column", 
                    alignItems: "center", 
                    justifyContent: "center",
                }  
            }).showToast();
        }   
    });
}


//fx y acciones botones búsquedas

if (busquedaNombreApellido) {
    busquedaNombreApellido.addEventListener("click", function(e) {
        e.preventDefault();
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
const modal2 = document.getElementById ("modal-2-Busqueda");


function busquedaXnombre () {   
    let nombreBusqueda = document.getElementById("inputBusquedaNombre").value;
    let apellidoBusqueda = document.getElementById("inputBusquedaApellido").value;
    nombreBusqueda = formatearPalabra (nombreBusqueda);
    apellidoBusqueda = formatearPalabra (apellidoBusqueda);
    

    console.log('ReservasLocaStorage:', reservasLocalStorage);

    const BusquedaReserva = reservasLocalStorage.filter ( (el) =>(el.nombre === (nombreBusqueda) && el.apellido === (apellidoBusqueda))) ;
    const modalContent = document.getElementById("modal-2-BusquedaReserva-content");
    console.log (BusquedaReserva);        
        if (BusquedaReserva.length === 0) {
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
    modal2.style.display = 'block';        
}

function busquedaXnro() {    
    let busqueda = document.getElementById("inputBusquedaNro").value;

    const BusquedaReserva = reservasLocalStorage.filter ( (el) =>(el.nroReserva === (parseInt (busqueda)) )) ;
    const modalContent = document.getElementById("modal-2-BusquedaReserva-content");

            
        if (BusquedaReserva.length === 0) {
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
    modal2.style.display = 'block';             
}


//cerrar modal 

function cerrarModal(idBtn, modalNro) {
    const closeModalBtn = document.getElementById(idBtn);

    closeModalBtn.addEventListener('click', function () {
        modalNro.style.display = "none";
    });
}

cerrarModal ("closeModal1", modal1);
cerrarModal ("closeModal2", modal2);


