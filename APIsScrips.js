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



//Google Charts 


// Cargamos la libreria de google charts. 
google.charts.load('current', { packages: ['corechart'] });

// se ejecuta cuando la libreria esta cargada
google.charts.setOnLoadCallback(drawChart);

//Barras https://developers.google.com/chart/interactive/docs/gallery/columnchart?hl=es-419

function drawChart() {

    // Crear datos
    var data = google.visualization.arrayToDataTable([
        ['Mes', 'Ventas'],
        ['Enero', 1000],
        ['Febrero', 1170],
        ['Marzo', 660],
        ['Abril', 1030]
    ]);

    // Opciones del gráfico
    var options = {
        title: 'Ventas por Mes',
        hAxis: { title: 'Mes' },
        vAxis: { title: 'Ventas' },
        legend: 'none',
        colors: ['green'],
        width: 600,
        height: 400

    };

    // Crear gráfico
    var chart = new google.visualization.ColumnChart(
        document.getElementById('BarChart_div')
    );

    chart.draw(data, options);
}


//Geo Grafico sacado directamente de  https://developers.google.com/chart/interactive/docs/gallery/geochart?hl=es-419

google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(drawRegionsMap);

function drawRegionsMap() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'Poblacion en millones'],
        ['Canada', 38900000],
        ['United States', 331900000],
        ['Mexico', 129900000],
        ['Guatemala', 18000000],
        ['Belize', 405000],
        ['El Salvador', 6400000],
        ['Honduras', 10500000],
        ['Nicaragua', 6800000],
        ['Costa Rica', 5200000],
        ['Panama', 4400000],
        ['Cuba', 11200000],
        ['Dominican Republic', 11100000],
        ['Haiti', 11700000],
        ['Jamaica', 2800000],
        ['Trinidad and Tobago', 1400000],
        ['Bahamas', 410000],
        ['Barbados', 281000],
        ['Saint Lucia', 180000],
        ['Grenada', 113000],
        ['Antigua and Barbuda', 94000],
        ['Saint Vincent and the Grenadines', 110000],
        ['Dominica', 72000],
        ['Saint Kitts and Nevis', 54000],
        ['Colombia', 52000000],
        ['Venezuela', 28300000],
        ['Guyana', 800000],
        ['Suriname', 620000],
        ['Ecuador', 18000000],
        ['Peru', 34000000],
        ['Brazil', 203000000],
        ['Bolivia', 12300000],
        ['Paraguay', 7500000],
        ['Chile', 19600000],
        ['Argentina', 46000000],
        ['Uruguay', 3400000]

    ]);

    var options = {
        width: 600,
        height: 400
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
}




// Grafico organizacional https://developers.google.com/chart/interactive/docs/gallery/orgchart?hl=es-419

google.charts.load('current', { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawOrgChart);

function drawOrgChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');

    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows([
        [{ 'v': 'Profesor', 'f': 'Profesor<div style="color:red; font-style:italic">CEO de la Clase</div>' },
            '', 'The President'],

        ['Ricardo', 'Profesor', ''],
        ['Steven', 'Profesor', ''],
        ['Valery', 'Profesor', ''],
        ['Gabriel', 'Profesor', ''],
        ['Carlos', 'Profesor', ''],

    ]);

    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('org_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    chart.draw(data, { 'allowHtml': true });
}



//Diagrama Sankey.  https://developers.google.com/chart/interactive/docs/gallery/sankey?hl=es-419

google.charts.load("current", { packages: ["sankey"] });
google.charts.setOnLoadCallback(drawChartSankey);
function drawChartSankey() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'From');
    data.addColumn('string', 'To');
    data.addColumn('number', 'Weight');
    data.addRows([
        ['Español', 'México', 126],
        ['Español', 'Colombia', 52],
        ['Español', 'Argentina', 46],
        ['Español', 'España', 47],
        ['Español', 'Perú', 34],

        ['Inglés', 'Estados Unidos', 331],
        ['Inglés', 'Reino Unido', 67],
        ['Inglés', 'Canadá', 39],
        ['Inglés', 'Australia', 26],

        ['Portugués', 'Brasil', 203],
        ['Portugués', 'Portugal', 10],
        ['Portugués', 'Angola', 35],

        ['Francés', 'Francia', 65],
        ['Francés', 'Canadá', 8],
        ['Francés', 'Bélgica', 5],
        ['Francés', 'Senegal', 18],

        ['Alemán', 'Alemania', 83],
        ['Alemán', 'Austria', 9],
        ['Alemán', 'Suiza', 5],

        ['Árabe', 'Egipto', 110],
        ['Árabe', 'Arabia Saudita', 36],
        ['Árabe', 'Marruecos', 37],

        ['Chino', 'China', 1400],
        ['Chino', 'Singapur', 6],

        ['Hindi', 'India', 600],
        ['Hindi', 'Nepal', 30]
    ]);

    // Set chart options
    var options = {
        width: 600 ,
     };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.Sankey(document.getElementById('sankey_multiple'));
    chart.draw(data, options);
}
