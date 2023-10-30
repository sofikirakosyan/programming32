var matrix = [];
var side = 10;
var socket = io();
var ln = 50;

function setup() {
    frameRate(6);
    createCanvas(ln * side, ln * side);
    background('#acacac');

}
let currentWeather = "Spring"
let weatherDocument = document.getElementById("weather")
let SpoofButton  = document.getElementById(SpoofButton)
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
socket.on ("matrix",drawmatrix);