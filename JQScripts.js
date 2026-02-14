$(document).ready(function () {

    // Oculta todos contenidos de la historia al inicio
    $(".content").hide();

    // click para que se muestre el contenido de cada bloque de la historia
    $(".JQuery-Sub1").click(function () {

        $(this)
            .next()
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

    $("#btn-cambiar").click(function(){

    // Selector por ID
    $("#demo-texto")

        // Manipulación del DOM
        .text("El texto ha sido modificado usando jQuery.")

        .css("color", "green")

        .append(" ✔");

});

    //final del doc ready 
});