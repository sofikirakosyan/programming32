var matrix = [];
var side = 30;
var socket = io();
var ln = 30;

function setup() {
    frameRate(6);
    createCanvas(ln * side, ln * side);
    background('#acacac');

}
let currentWeather = "Spring"
let weatherDocument = document.getElementById("weather")
//let SpoofButton = document.getElementById(SpoofButton)
let SpoofRegime = false;
let SpoofLayer = document.getElementById("SpoofLayer")
let clickRadius = 0;
let clickRadiusRange = document.getElementById("clickRadiusRange")
let toIndex = 5;
let toIndexDocument = document.getElementById("toIndex")

let grassBitenDocument = document.getElementById("grassBiten");
let grassAdustDocument = document.getElementById("grassAdust");
let grassBiterEatenDocument = document.getElementById("grassBiterEaten");
let tilesBurstDocument = document.getElementById("tilesBurst");
let grassSprayedDocument = document.getElementById("grassSprayed");
let instantNumberOfGrassDocument = document.getElementById("instantNumberOfGrass");

function drawmatrix(data) {
    matrix = data.matrix;
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("purple");
            }
            else if (matrix[y][x] == 4) {
                fill("blue");
            }
            else if (matrix[y][x] == 5) {
                fill("black");
            }
            rect(x * side, y * side, side, side);
        }
    }

}
socket.on("matrix", drawmatrix);
window.addEventListener("click", function () {
    var xCoordinate = Math.floor(mouseX / side)
    var yCoordinate = Math.floor(mouseY / side)
    if (SpoofRegime) {
        clickRadius = parseInt(clickRadiusRange.value)
        updateToIndex()
        socket.emit("onCheatClicked", xCoordinate, yCoordinate, clickRadius, toIndex)

    }
});

function drawFullRect() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            drawFullRect(x, y, matrix)
        }
    }
}

function drawRect(x, y, matrix) {
    let k = matrix[y][x];
    if (e == 1) {
        if (currentWeather == "Spring") fill("green");
        else if (currentWeather == "Summer") fill(100, 132, 234)
        else if (currentWeather == "Winter") fill(177, 0, 215)
        else fill(255, 254, 8)
    }
    else if (k == 2) fill("orange");
    else if (k == 3) fill("purple");
    else if (k == 4) fill("black");
    else if (k == 5) fill("blue");
    else if (k == 6) fill("green");
    else fill("#acacac");
    rect(x * side, y * side, side, side)
}

function updateToIndex() {
    switch (toIndexDocument.value) {
        case "Grass":
            toIndex = 1;
            return;
        case "GrassEater":
            toIndex = 2;
            return;
        case "Predator":
            toIndex = 3;
            return;
        case "Tiger":
            toIndex = 4;
            return;
        case "Bomb":
            toIndex = 5;
            return;
        case "Human":
            toIndex = 6;
            return;
    }
}
function tigerShowdown() {
    socket.emit("tigerShowdown");
}
function grassDay() {
    socket.emit("grassDay")
}
function burnTheWorld() {
    socket.emit("burnTheWorld")
}
socket.on("updateWholeRect", function (matrix, objects) {
    drawWholeRect()
});
socket.on("updateWeather", function (currentWeather) {
    currentWeatherr = currentWeather;
    weatherDocument.innerHTML = currentWeather;
});



socket.on("statistics", function (values) {
    grassBitenDocument.innerHTML = "Grass Biten:" + values[0];
    grassAdustDocument.innerHTML = "Grass Adust:" + values[1];
    grassBiterEatenDocument.innerHTML = "Grass Biter Eaten:" + values[2];
    tilesBurstDocument.innerHTML = "Tiles Burst:" + values[3];
    grassSprayedDocument.innerHTML = "Grass Sprayed:" + values[4];
    instantNumberOfGrassDocument.innerHTML = "Instant Number of Grass:" + values[5];
});