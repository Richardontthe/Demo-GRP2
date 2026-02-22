$(document).ready(function () {

    // Oculta todos contenidos de la historia al inicio
    $(".content").hide();

    // click para que se muestre el contenido de cada bloque de la historia
    $(".JQuery-Sub1").click(function () {

        $(this)
            .next(".col")
            .find(".content")
            .slideToggle(400);

    });

    // efecto de hover para que se note lo interactivo de cada bloque
    $(".JQuery-Sub1").hover(
        function () {
            $(this).stop().animate({
                marginLeft: "10px"
            }, 200);
        },
        function () {
            $(this).stop().animate({
                marginLeft: "0px"
            }, 200);
        }
    );

    $("#btn-cambiar").click(function () {

        // Selector por ID
        $("#demo-texto")

            // Manipulación del DOM
            .text("El texto ha sido modificado usando jQuery.")

            .css("color", "green")

            .append(" ✔");

    });

    //Demostracion del evento on change 

    $("#input-superheroe").change(function () {
        $("#mostrar-superheroe").text("Tu supeheroe favorito es: " + $(this).val());
        $("#input-superheroe").css("border", "3px solid rgba(231, 103, 12, 0.51)");
    });



    $("#caja-escapista").mouseenter(function () {
        // podemos usar let para calcular variables
        let zonaWidth = $("#zona").width();
        let zonaHeight = $("#zona").height();

        let cajaWidth = $(this).width();
        let cajaHeight = $(this).height();

        // usamos la funcion math para poder generar un numero aleatoreo dentro de los limites del contenedor 
        let nuevaX = Math.random() * (zonaWidth - cajaWidth);
        let nuevaY = Math.random() * (zonaHeight - cajaHeight);

        // animamos con la funcion animate y le pasamos las nuevas coordenadas. 
        $(this).animate({
            left: nuevaX + "px",
            top: nuevaY + "px"
        }, 300);

    });


    // demo de doble click para contar las veces que se ha hecho doble click en el bloque. 
    let contador = 0;

    $("#demo-dblclick").on("dblclick", function (e) {

        e.stopPropagation();

        contador++;

           $(".contador")
            .fadeOut(100, function() {
                $(this).text("Contador: " + contador).fadeIn(100);  // agregamos la funcion fade in y out para que se vea bonito. 
            });

    });


    // ejemplo de keyup 

    $("#input-keyup").keyup(function () {

        $("#mostrar-keyup")
            .text("Espejito: " + $(this).val())
            .css("color", "blue");

    });

    //ejemplo del context menu 

    $("#caja-context").contextmenu(function (e) {

    e.preventDefault(); // evita que aparezca el menú normal del navegador

    $(this)
        .css("background-color", "orange")
        .text("Dia!");

 

});





    //final del doc ready 
});