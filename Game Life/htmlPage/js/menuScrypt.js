$(document).ready(function () {
});
$(".quit-button").click(function () {
    scryptCS.close();
});
$(".map-size-button").click(function () {
    $(".back-map-size").addClass("active");
});
$(".button-close").click(function () {
    $(".back-map-size").removeClass("active");
});
$(".button-ok").click(function () {
    var y = parseInt($(".height-input").val(), 10);
    var x = parseInt($(".width-input").val(), 10);
    if (Number.isInteger(x) && Number.isInteger(y)) {
        scryptCS.setMapSize(x, y);
        $(".back-map-size").removeClass("active");
    }
    else {
        alert("Введите целочисленные значения");
    }
});
