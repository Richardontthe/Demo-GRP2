let mapa;
let marcadorUsuario;
let marcadorUTN;
let servicioRutas;
let renderRutas;

// Coordenadas UTN
const UTN = { lat: 10.007354, lng: -84.217755 };

function inicializarMapa() {

    // Crear mapa
    mapa = new google.maps.Map(document.getElementById("mapa"), {
        center: UTN,
        zoom: 14
    });

    // Marcador UTN
    marcadorUTN = new google.maps.Marker({
        position: UTN,
        map: mapa,
        icon: "https://maps.google.com/mapfiles/ms/icons/flag.png",
        title: "UTN"
    });

    // Servicio de rutas
    servicioRutas = new google.maps.DirectionsService();
    renderRutas = new google.maps.DirectionsRenderer({
        suppressMarkers: false
    });
    renderRutas.setMap(mapa);
}

// Esperar a que cargue el DOM completo por si acaso.
$(document).ready(function () {

    $("#btnUbicacion").click(function () {
        //Limpiamos todos los mensajes.
        $("#mensajeError").text("");
        $("#distanciaInfo").text("");
        $("#rutaInfo").text("");
        $("#tiempoInfo").text("");

        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(
                mostrarPosicion,
                manejarError
            );

        } else {
            $("#mensajeError").text("La geolocalización no es soportada por este navegador.");
        }

    });

});

function mostrarPosicion(position) {

    const usuario = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };

    // Centrar mapa en usuario
    mapa.setCenter(usuario);

    // Eliminar marcador anterior si existe
    if (marcadorUsuario) {
        marcadorUsuario.setMap(null);
    }

    // Crear marcador del usuario
    marcadorUsuario = new google.maps.Marker({
        position: usuario,
        map: mapa,
        title: "Tu ubicación"
    });

    // Distancia en línea recta (geométrica)
    calcularDistanciaLineaRecta(usuario);

    // Trazar ruta y calcular distancia real
    trazarRuta(usuario);
}


// Menojo de errores de geolocalización atrapamos errores para demostrar. 
function manejarError(error) {

    let mensaje = "";

    switch (error.code) {
        case error.PERMISSION_DENIED:
            mensaje = "Permiso de ubicación denegado.";
            break;
        case error.POSITION_UNAVAILABLE:
            mensaje = "Ubicación no disponible.";
            break;
        case error.TIMEOUT:
            mensaje = "Tiempo de espera agotado.";
            break;
        default:
            mensaje = "Error desconocido.";
    }

    $("#mensajeError").text(mensaje);
}

function calcularDistanciaLineaRecta(usuario) {

    const distancia = google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(usuario),
        new google.maps.LatLng(UTN)
    );

    const km = (distancia / 1000).toFixed(2);

    $("#distanciaInfo").text("Distancia en línea recta: " + km + " km");
}

function trazarRuta(usuario) {

    const solicitud = {
        origin: usuario,
        destination: UTN,
        travelMode: google.maps.TravelMode.DRIVING
    };

    servicioRutas.route(solicitud, function (resultado, estado) {

        if (estado === "OK") {

            renderRutas.setDirections(resultado);

            // Datos reales de la ruta. 
            const ruta = resultado.routes[0].legs[0];

            const distanciaReal = ruta.distance.text;
            const distanciaMetros = ruta.distance.value;
            const duracion = ruta.duration.text;

            $("#rutaInfo").html(
                "Distancia por carretera: " + distanciaReal  
 
            );
            $("#tiempoInfo").html(
                 "Duración estimada: " + duracion
            );



        } else {

            $("#mensajeError").text("No se pudo calcular la ruta.");

        }

    });
}


//uso de google translate Widget
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        {
            pageLanguage: 'es',
        
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        },
        'google_translate_element'
    );
}
