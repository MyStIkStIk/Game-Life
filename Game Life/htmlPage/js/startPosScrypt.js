var MoveAccess;
var PaintAccess = false;
var PaintMoveAccess = false;
var PaintColor = "#eee";
var Action;
var Map;
var Context;
var Canvas;
var Timer = 300;
var rotatescroll = 1;
var timerId;
var mas;
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
};

function CanvasClear() {
    Context.clearRect(0, 0, Canvas.width, Canvas.height);
    for (var i = 0; i < Map.Y; i++) {
        for (var j = 0; j < Map.X; j++) {

            Context.strokeRect(j * Map.Cell, i * Map.Cell,
                Map.Cell, Map.Cell);
        }
    }
};
function SendImageData() {
    var CellCenter = Map.Cell / 2;
    mas = [];
    for (var i = 0; i < Map.Y; i++) {
        var row = [];
        for (var j = 0; j < Map.X; j++) {
            var pixel = Context.getImageData(j * Map.Cell + CellCenter, i * Map.Cell + CellCenter, 1, 1).data[0];
            if (pixel != 0 && pixel < 205) {
                row.push(1);
            }
            else {
                row.push(0);
            }

        }
        mas.push(row);
    }
    scryptCS.updateMap(mas);
};
function GetImageData() {
    if (Action == "play") {
    timerId = setInterval(function () {
        mas = JSON.parse(scryptCS.sendMap());
        Context.fillStyle = PaintColor;
        for (var i = 0; i < Map.Y; i++) {
            for (var j = 0; j < Map.X; j++) {
                if (mas[i][j] != 0) {
                    Context.fillStyle = "#cc0000";
                    Context.fillRect(j * Map.Cell, i * Map.Cell, Map.Cell, Map.Cell);
                    Context.strokeRect(j * Map.Cell, i * Map.Cell, Map.Cell, Map.Cell);
                }
                if (mas[i][j] == 0) {
                    Context.fillStyle = "#eee";
                    Context.fillRect(j * Map.Cell, i * Map.Cell, Map.Cell, Map.Cell);
                    Context.strokeRect(j * Map.Cell, i * Map.Cell, Map.Cell, Map.Cell);
                }
            }
        }
    }, Timer);
    };
    if (Action == "step") {
        setTimeout(function () {
            mas = JSON.parse(scryptCS.sendMap());
            Context.fillStyle = PaintColor;
            for (var i = 0; i < Map.Y; i++) {
                for (var j = 0; j < Map.X; j++) {
                    if (mas[i][j] != 0) {
                        Context.fillStyle = "#cc0000";
                        Context.fillRect(j * Map.Cell, i * Map.Cell, Map.Cell, Map.Cell);
                        Context.strokeRect(j * Map.Cell, i * Map.Cell, Map.Cell, Map.Cell);
                    }
                    if (mas[i][j] == 0) {
                        Context.fillStyle = "#eee";
                        Context.fillRect(j * Map.Cell, i * Map.Cell, Map.Cell, Map.Cell);
                        Context.strokeRect(j * Map.Cell, i * Map.Cell, Map.Cell, Map.Cell);
                    }
                }
            }
        }, 0);
    };
};
function UpdateImageData() {

};
function SaveImageData() {
    var CellCenter = Map.Cell / 2;
    mas = [];
    for (var i = 0; i < Map.Y; i++) {
        var row = [];
        for (var j = 0; j < Map.X; j++) {
            var pixel = Context.getImageData(j * Map.Cell + CellCenter, i * Map.Cell + CellCenter, 1, 1).data[0];
            if (pixel != 0 && pixel < 205) {
                row.push(1);
            }
            else {
                row.push(0);
            }

        }
        mas.push(row);
    }
    scryptCS.saveMap($(".input-form").val(), JSON.stringify(mas));
};
function DrawSaves() {
    saves = JSON.parse(scryptCS.getSaves());
    $(".saves-form").html("");
    for (var i = 0; i < saves.length; i++) {
        $(".saves-form").append($("<button class='my-button'><p>" + saves[i] + "</p></button>"));

    }
}

$('body').bind('mousewheel', function (e) {
    let min = 0.2;
    let max = 5;

    if (e.originalEvent.wheelDelta > 0) { if (rotatescroll < max) rotatescroll += 0.1; }
    else { if (rotatescroll > min) rotatescroll -= 0.1; }

    console.log(rotatescroll);
    $(".back").css('transform', 'scale(' + rotatescroll + ')');
});

$("#game-map").mousedown(function (e) {
    if (PaintAccess == true) {
        var pos = $("#game-map").offset();
        var X = (e.pageX - pos.left) / rotatescroll;
        var Y = (e.pageY - pos.top) / rotatescroll;

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
        var X = (e.pageX - pos.left) / rotatescroll;
        var Y = (e.pageY - pos.top) / rotatescroll;

        var XPos = Math.floor(X / Map.Cell);
        var YPos = Math.floor(Y / Map.Cell);
        Context.fillStyle = PaintColor;
        Context.fillRect(XPos * Map.Cell, YPos * Map.Cell, Map.Cell, Map.Cell);
        Context.strokeRect(XPos * Map.Cell, YPos * Map.Cell, Map.Cell, Map.Cell);
    }
});

$(".button-ok").click(function () {
    SaveImageData();
    $(".back-save").removeClass("active");
});
$(".save-block .button-close").click(function () {
    $(".back-save").removeClass("active");
});
$(".saves-block .button-close").click(function () {
    $(".back-save").removeClass("active2");
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
        PaintColor = "#cc0000";
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
    else if (action == "saves") {
        $(".playbox .tool-pause").click();
        $(".back-save").addClass("active2");
        MoveAccess.draggabilly("enable");
        $("#game-map").css("cursor", "move");
        $(".toolbox .tool").removeClass("active");
        $(".toolbox .tool:first-child").addClass("active");
        PaintAccess = false;
        DrawSaves();
    }
    else if (action == "save") {
        $(".playbox .tool-pause").click();
        $(".back-save").addClass("active");
        MoveAccess.draggabilly("enable");
        $("#game-map").css("cursor", "move");
        $(".toolbox .tool").removeClass("active");
        $(".toolbox .tool:first-child").addClass("active");
        PaintAccess = false;
    }
});

$(".playbox .tool").click(function () {
    $(".playbox .tool").removeClass("active");
    $(".playbox .tool-play").removeClass("active");
    $(".playbox .tool-pause").removeClass("active");
    $(this).addClass("active");

    Action = $(this).attr("name");
    if (Action == "slower") {
        Timer += 100;
        $(".playbox .tool").removeClass("active");
        $(".playbox .tool-play").click();
    }
    else if (Action == "play") {
        clearInterval(timerId);
        SendImageData();
        GetImageData();
    }
    else if (Action == "pause") {
        clearInterval(timerId);
    }
    else if (Action == "step") {
        clearInterval(timerId);
        SendImageData();
        GetImageData();
    }
    else if (Action == "faster") {
        if (Timer > 100) {
            Timer -= 100;
            $(".playbox .tool-play").click();
        }
    }
})

