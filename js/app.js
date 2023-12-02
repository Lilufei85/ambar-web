
// mejoras pendientes:
// agregar que se compare en la búsqueda sin espacios
// Hacer que la búsqueda sea en una ventana modal


//desplegar menú hamburguesa
const menuIcon = document.getElementById('menuIcon');
const navbarLinks = document.getElementById('navbarMenu');

menuIcon.addEventListener('click', function () {
    navbarLinks.classList.toggle('show');
});



const reservas = [];


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

function guardarReserva () {
    reservas.push (new Reserva(
        generarNumeroReserva(),
        nombre,
        apellido,
        iDias,  
        iHuespedes,
        email
    ));
}


const buttonReserva = document.getElementById("buttonReserva");


if (buttonReserva) {
    buttonReserva.addEventListener("click", function(e) {
        nroValidaciones = 0;
        e.preventDefault();
        obtenerDatosReserva ();
        validarPalabra (nombre, "nombre");
        console.log (nroValidaciones);
        validarPalabra (apellido, "apellido");
        console.log (nroValidaciones);
        validarNumero (iDias, "cantidad de días");
        console.log (nroValidaciones);
        validarNumero (iHuespedes, "cantidad de huéspedes");
        console.log (nroValidaciones);
        validarEmail(email, "email");
        console.log (nroValidaciones);
        if (nroValidaciones >= 5) {
            console.log ("reserva guardada correctamente");
            guardarReserva ();
        }
        else {
            console.log ("Corrige los campos mal completados para finalizar tu reserva");
        }    
    });
}


function validarNumero (el, titulo) {
    if (el === ""){
        console.log (`Debes ingresar un valor para ${titulo} `);
    }
    else if (!/^[0-9]\d*$/.test(el)) {
        console.log (`Ingresa un número válido para ${titulo} `);
    }
    else if ( el < 1) {
        console.log (`El valor para ${titulo} no puede ser menor a 1`);
    }
    else {  
        console.log (` ${titulo} registrado`);
        nroValidaciones ++;
        return nroValidaciones;
    }
    return nroValidaciones; 
}


function validarPalabra (el, titulo) {
    if (el === ""){
        console.log (` Debes ingresar un valor para ${titulo} `);
    }
    else if (/^[0-9]+$/.test(el) === true) {
        console.log (` Ingresa ${titulo} válido sin números ni caracteres especiales`);
    }
    else {
        console.log (` ${titulo} registrado`);
        nroValidaciones ++;
        return nroValidaciones;
    }
    return nroValidaciones; 
}                 


function validarEmail(el, titulo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let esEmailValido = regex.test(el);

    if (esEmailValido) {
        console.log(` ${titulo} registrado`);
        nroValidaciones ++;
        return nroValidaciones;
    } else {
        console.log(`Ingresa un ${titulo} válido`);
    }
    return nroValidaciones;
}


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



function busquedaXnombre () {    
    let nombreBusqueda = document.getElementById("inputBusquedaNombre").value;
    let apellidoBusqueda = document.getElementById("inputBusquedaApellido").value;
    nombreBusqueda = formatearPalabra (nombreBusqueda);
    apellidoBusqueda = formatearPalabra (apellidoBusqueda);
            
    const BusquedaReserva = reservas.filter ( (el) =>(el.nombre === (nombreBusqueda) && el.apellido === (apellidoBusqueda))) ;
    console.log (BusquedaReserva);
            
        if (BusquedaReserva.length === 0) {
            let contenidoReservas = document.createElement ("div");
            contenidoReservas.innerHTML = " "; 
            contenidoReservas.innerHTML = `<p>No se encontró ninguna búsqueda bajo el nombre ${nombreBusqueda} ${apellidoBusqueda} </p>`;
            document.body.appendChild (contenidoReservas);   
        } else { 
            BusquedaReserva.map((el) => {
                let contenidoReservas = document.createElement ("div");
                contenidoReservas.innerHTML = " "; 
                contenidoReservas.innerHTML = `<img src="../assets/img/logo.png" alt="Logo Ambar Posada" class="size-logo-reserva">
                                                    <p>Se encontraron las siguientes reservas bajo el nombre ${nombreBusqueda} ${apellidoBusqueda}:</p>
                                                    <p>Reserva número ${el.nroReserva} </p>
                                                    <p>Cantidad de dias: ${el.cantDias} </p>
                                                    <p>Cantidad de huéspedes: ${el.cantHuespedes} </p>
                                                    <p>Email de contacto: ${el.email} </p>
                                                    `
                contenidoReservas.classList.add("flex-main");
                document.body.appendChild (contenidoReservas); 
                });
        }        
}


function busquedaXnro() {    
    let busqueda = document.getElementById("inputBusquedaNro").value;
    console.log (busqueda);

    const BusquedaReserva = reservas.filter ( (el) =>(el.nroReserva === (parseInt (busqueda)) )) ;
    console.log (BusquedaReserva);
            
        if (BusquedaReserva.length === 0) {
            let contenidoReservas = document.createElement ("div");
            contenidoReservas.innerHTML = " "; 
            contenidoReservas.innerHTML = `<p>No se encontró ninguna búsqueda bajo el número de reserva ${busqueda} </p>`;
            document.body.appendChild (contenidoReservas);   
        } else { 
            BusquedaReserva.map((el) => {
                let contenidoReservas = document.createElement ("div");
                contenidoReservas.innerHTML = " "; 
                contenidoReservas.innerHTML = `<img src="../assets/img/logo.png" alt="Logo Ambar Posada" class="size-logo-reserva">
                                                    <p>Se encontraron las siguientes reservas bajo el número de reserva ${el.nroReserva} :</p>
                                                    <p>Nombre: ${el.nombre} ${el.apellido} </p>
                                                    <p>Cantidad de dias: ${el.cantDias} </p>
                                                    <p>Cantidad de huéspedes: ${el.cantHuespedes} </p>
                                                    <p>Email de contacto: ${el.email} </p>
                                                    `
                contenidoReservas.classList.add("flex-main");
                document.body.appendChild (contenidoReservas); 
                });
        }        
}


// CORREGIR HASTA ACÁ! 
// LO QUE SIGUE ES DE LA PRE ENTREGA ANTERIOR. 
// Es el modelo viejo (botones superiores con prompts y alerts) 
// los tengo en los botones que se mueven arriba

const simuladorBtn = document.getElementById("reservarViaTransfe");

if (simuladorBtn) {
    simuladorBtn.addEventListener("click", function() {
        let iDias;
        let iHuespedes;


        function validateCantDias () {
            let checked = 0;

            while (checked === 0) {
                iDias = prompt ("Ingrese la cantidad de días que deseas hospedarte");
                if (iDias === ""){
                    alert ("No ingresaste la cantidad de días que deseas hospedarte");
                }
                else if (isNaN(iDias)) {
                    alert ("Ingresa un número válido");
                }
                else if ( iDias < 1) {
                    alert ("El número de días no puede ser menor a 1");
                }
                else {  
                    alert ("Bien, continuemos");
                    checked = 1;
                    return parseInt (iDias); 
                } 
            }
        
        }

        function validateCantHuesped () {
            checked = 0;
            iHuespedes = prompt ("Ingrese la cantidad de personas que desean hospedarse");
        
            while (checked === 0) {
                if (iHuespedes === ""){
                    alert ("No ingresaste la cantidad de personas que desean hospedarse");
                    iHuespedes = prompt ("Ingrese la cantidad de personas que desean hospedarse");
                }
                else if (isNaN(iHuespedes)) {
                    alert ("Ingresa un número válido");
                    iHuespedes = prompt ("Ingrese la cantidad de personas que desean hospedarse");
                }
                else if ( iHuespedes < 1) {
                    alert ("La cantidad de personas que desean hospedarse no puede ser menor a 1");
                    iHuespedes = prompt ("Ingrese la cantidad de personas que desean hospedarse");
                }
                else {
                    alert ("Bien, continuemos");
                    checked = 1;
                    return parseInt (iHuespedes) ; 
                } 
            }  
        }

        
        function validateHuespedes () {
            let huespedes = [];
            for (i=0 ; i < iHuespedes; i++) {
                let nombre = prompt (`Ingrese el nombre y apellido del/la huésped número ${parseInt(i+1)}`);
                checked = 0;
                while (checked === 0) {
                    if (nombre === ""){
                        alert ("No ingresaste el nombre y apellido");
                        nombre = prompt (`Ingrese el nombre y apellido del/la huésped número ${parseInt(i+1)}`);
                    }
                    else if (/^[0-9]+$/.test(nombre) === true) {
                        alert ("Ingresa un nombre y apellido válido sin números");
                        nombre = prompt (`Ingrese el nombre y apellido del/la huésped número ${parseInt(i+1)}`);
                    }
                    else {
                        nombre = nombre.toLowerCase(); 
                        nombre = nombre.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
                        huespedes.push (nombre);
                        alert ("Nombre y apellido registrado");
                        checked = 1;
                    } 
                }                 
            }
            return (huespedes);
        }


        function validateEmail (){
            const validateEmail = function (email) {
                let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return regex.test(email);
            }
        
            checked = 0;
            email = prompt ("Por último, ingresa tu email. Te contactaremos con toda la información para completar el pago y asegurar tu reserva");
        
            while (checked === 0) {
                if (email === ""){
                    alert ("No ingresaste tu email");
                    email = prompt ("Ingresa tu email");
                }
                else if (!validateEmail (email) ) {
                    alert("La dirección de correo electrónico no es válida.");
                    email = prompt ("Ingresa tu email");        
                }
                else {                
                    alert (`Quedó registrada tu consulta por una estadía de ${iDias} días para ${iHuespedes} personas. A la brevedad, te enviaremos toda la información por email. Gracias!`);
                    checked = 1;
                    return email;
                } 
            }   
        }
        
        
        function generarNumeroReserva () {
            return ( Math.ceil (Math.random () * 9999 + 1));
        }
        
        function uploadReserva (e) {
            //e.preventDefault ();
            reservas.push (new Reserva(
                generarNumeroReserva(),
                validateCantDias(),
                validateCantHuesped(),
                validateHuespedes(),
                validateEmail()
            )); 
        }
        
        uploadReserva ();
    });
}



const simuladorBtn2 = document.getElementById("buscarReserva");

if (simuladorBtn2) {
    simuladorBtn2.addEventListener("click", function() {
        let busqueda = prompt ("A nombre de quién está la reserva que buscás?");
        busqueda = busqueda.toLowerCase(); // acá paso todo a minúscula
        busqueda = busqueda.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
        
        const BusquedaReserva = reservas.filter ( (el) => el.huespedes.includes (busqueda));
        // AYUDAAAA const BusquedaReserva = reservas.filter ( (el) => (el.huespedes.toLowerCase()).includes ( busqueda.toLowerCase() ));
        console.log (BusquedaReserva);
        
        if (BusquedaReserva.length === 0) {
        alert(`No se encontró ninguna búsqueda bajo el nombre ${busqueda}` );
        } else { 
            BusquedaReserva.map((el) => {
                let contenidoReservas = document.createElement ("div");
                contenidoReservas.innerHTML = " "; 
                contenidoReservas.innerHTML = `<img src="../assets/img/logo.png" alt="Logo Ambar Posada" class="size-logo-reserva">
                                                <p>Se encontraron las siguientes reservas bajo el nombre ${busqueda}:</p>
                                                <p>Reserva número ${el.nroReserva} </p>
                                                <p>Cantidad de dias: ${el.iDias} </p>
                                                <p>Cantidad de huéspedes: ${el.cantHuespedes} </p>
                                                <p>Email: ${el.email} </p>
                                                `
                contenidoReservas.classList.add("flex-main");
                document.body.appendChild (contenidoReservas); 
                });
        }
    });   
}    





    /* function obtenerDatos() {
        const buttonReserva = document.getElementById("buttonReserva");
    
        if (buttonReserva) {
            buttonReserva.addEventListener("click", function(e) {
                e.preventDefault();
                let nombre = document.getElementById("inputNombre").value;
                let apellido = document.getElementById("inputApellido").value;
                let iDias = document.getElementById("inputDias").value;
                let iHuespedes = document.getElementById("inputCHuespedes").value;
                let email = document.getElementById("inputEmail").value;
                console.log (`Se obtuvieron los siguientes datos: Nombre: ${nombre}, Apellido: ${apellido}`)
            });
        }
    }
 */
