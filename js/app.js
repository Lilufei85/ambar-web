

// agregar evento en el botón de reserva 
// agregar inputs y eventos busqueda
// agregar evento en botón de buscar reserva (por nombre y apellido o por nro de reserva)
// agregar que se compare en la búsqueda sin espacios y con formato Oración- primer letra mayúscula y resto minúscula
// Hacer que la búsqueda sea en una ventana modal

const reservas = [];


class Reserva {
    constructor (nroReserva, cantDias, cantHuespedes, huespedes, email) {
        this.nroReserva = nroReserva;
        this.cantDias = cantDias;
        this.cantHuespedes = cantHuespedes;
        this.huespedes = huespedes;
        this.email = email;
        this.mensaje = function () {
            console.log (`Reserva nro ${nroReserva} confirmada. Por ${cantDias} días para ${cantHuespedes} personas.`)
        }
    }
}

/* function mayusIniciales (el) {
    el = el.toLowerCase(); // acá paso todo a minúscula
    el = el.split(' ').map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1)).join(' ');
    // .split separa por espacios las palabras. 
    //Con el método map() puedo trabajar sobre cada palabra por separado
    //.join (); //acá vuelvo a juntar las palabras
    return el;
}
 */




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
                        //mayusIniciales (nombre);
                        nombre = nombre.toLowerCase(); // acá paso todo a minúscula
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

    const menuIcon = document.getElementById("menuIcon");
    //const navbarLinks = document.getElementById("navbarMenu");
    const navbarLinks = document.getElementById("navbarMenu");

    menuIcon.addEventListener("click", function () {
    navbarLinks.classList.toggle("show");
    });


 /*    const menuIcon = document.getElementById("menu-icon");
    const navbarLinks = document.getElementsByClassName("navbarMenu");

    menuIcon.addEventListener("click", function () {
        for (let i = 0; i < navbarLinks.length; i++) {
            navbarLinks[i].classList.toggle("show");
        }
    });
 */