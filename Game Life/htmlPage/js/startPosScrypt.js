var MoveAccess;
var PaintAccess = false;
var PaintMoveAccess = false;
var PaintColor = "#eee";
var Map;
var Context;
var Canvas;
var Timer = 300;
var rotatescroll = 1;
$(document).ready(function () {
    MoveAccess = $("#game-map").draggabilly();
    LoadCanvas();
});

function LoadCanvas() {
    Map = JSON.parse(scryptCS.getMapSize());
    Canvas = document.getElementById("game-map");
    Canvas.width = Map.X * Map.Cell;
    Canvas.height = Map.Y * Map.Cell;
    Context = Canvas.getContext("2d");
    CanvasClear();
}

$('body').bind('mousewheel', function (e) {
    let min = 0.2;
    let max = 5;

    if (e.originalEvent.wheelDelta > 0) { if (rotatescroll < max) rotatescroll += 0.1; }
    else { if (rotatescroll > min) rotatescroll -= 0.1; }

    console.log(rotatescroll);
    $(".back").css('transform', 'scale(' + rotatescroll + ')');
});



$(".toolbox .tool").click(function () {
    $(".toolbox .tool").removeClass("active");
    $(this).addClass("active");

    var action = $(this).attr("name");
if (action == "move") {
    MoveAccess.draggabilly("enable");
    $("#game-map").css("cursor", "move");
    PaintAccess = false;
}
else if (action == "paint") {
    MoveAccess.draggabilly("disable");
    $("#game-map").css("cursor", "pointer");
    PaintAccess = true;
    PaintColor = "#000";
}
else if (action == "clear") {
    MoveAccess.draggabilly("disable");
    $("#game-map").css("cursor", "pointer");
    PaintAccess = true;
    PaintColor = "#eee";
}
else if (action == "drop") {
    CanvasClear();
    MoveAccess.draggabilly("enable");
    $("#game-map").css("cursor", "move");
    $(".toolbox .tool").removeClass("active");
    $(".toolbox .tool:first-child").addClass("active");
    PaintAccess = false;
}
});

$("#game-map").mousedown(function (e) {
    if (PaintAccess == true) {
        var pos = $("#game-map").offset();
        var X = e.pageX - pos.left;
        var Y = e.pageY - pos.top;

        var XPos = Math.floor(X / Map.Cell);
        var YPos = Math.floor(Y / Map.Cell);
        Context.fillStyle = PaintColor;
        Context.fillRect(XPos * Map.Cell, YPos * Map.Cell, Map.Cell, Map.Cell);
        Context.strokeRect(XPos * Map.Cell, YPos * Map.Cell, Map.Cell, Map.Cell);
        PaintMoveAccess = true;
    }
});
$("#game-map").mouseup(function (e) {
    PaintMoveAccess = false;
});
$("#game-map").mousemove(function (e) {
    if (PaintMoveAccess == true) {
        var pos = $("#game-map").offset();
        var X = e.pageX - pos.left;
        var Y = e.pageY - pos.top;

        var XPos = Math.floor(X / Map.Cell);
        var YPos = Math.floor(Y / Map.Cell);
        Context.fillStyle = PaintColor;
        Context.fillRect(XPos * Map.Cell, YPos * Map.Cell, Map.Cell, Map.Cell);
        Context.strokeRect(XPos * Map.Cell, YPos * Map.Cell, Map.Cell, Map.Cell);
    }
});

function CanvasClear() {
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    for (var i = 0; i < Map.X; i++) {
        for (var j = 0; j < Map.Y; j++) {

            Context.strokeRect(i * Map.Cell, j * Map.Cell,
                Map.Cell, Map.Cell);
        }
    }
}



$(".playbox .tool").click(function () {
    $(".playbox .tool").removeClass("active");
    $(this).addClass("active");

    var action = $(this).attr("name");
    if (action == "slower") {
        Timer += 100;
    }
    else if (action == "play") {
        GetImageData();
    }
    else if (action == "pause") {

    }
    else if (action == "step") {

    }
    else if (action == "faster") {
        if (Timer > 300) {
            Timer -= 100;
        }
    }
})


function GetImageData() {
    var pixel = Context.getImageData(0, 0, 1, 1);
    var CellCenter = Map.Cell / 2;
    var mas = [];
    for (var i = 0; i < Map.X; i++) {
        var row = [];
        for (var j = 0; j < Map.Y; j++) {
            var pixel = Context.getImageData(i * Map.Cell + CellCenter, j * Map.Cell + CellCenter, 1, 1);
            row.push();
        }
        mas.push(row);
    }
    scryptCS.updateMap(mas);

    setInterval(function () {
        var mas = JSON.Parse(scryptCS.sendMap());
        Context.fillStyle = PaintColor;
        for (var i = 0; i < Map.X; i++) {
            for (var j = 0; j < Map.Y; j++) {
                if (mas[i][j] != 0) {
                    Context.fillRect(i * Map.Cell, j * Map.Cell, Map.Cell, Map.Cell);
                    Context.strokeRect(i * Map.Cell, j * Map.Cell, Map.Cell, Map.Cell);
                }
            }
        }
    }, Timer);
}