$(document).ready(function () {
});
$(".quit-button").click(function () {
    scryptCS.close();
});
$(".map-size-button").click(function () {
    $(".map-size-block").addClass("active");
});
$(".button-close").click(function () {
    $(".map-size-block").removeClass("active");
});
