var express = require("express");
var fs = require('fs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("../programming32"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});
var count = 0;
genders =["male","female"]
server.listen(3000, function () {
    console.log("Example is running on port 3000");

});
let frameRate = 20;

let Weather = {
    Spirng: "Spring",
    Summer: "Summer",
    Autumn: "Autumn",
    Winter: "Winter"
}
currentWeather = Weather.Spirng
currentFrame = 0;

xLength = 50;
yLength = 50;
matrix = [];

objects = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
tigerArr = [];
bombArr = [];
humanArr = [];
bombs = [];
predators = [];
grassobjs = [];
grasseaters = [];
genders = ["male","feamle"]

Grass = require('./grass');
GrassEater = require('./grasseater');
predator = require('./predator');
Bomb = require('./bomb');
Tiger = require('./tiger');
Human = require('./human');
let random = require("./random");


var cl = false;
io.on("connection", function (socket) {
    if (cl) {
        setInterval(drawserverayin, 200);
        cl = true;
    }
});

GrassBiten = 0;
grassAdust = 0;
GrassBiterEaten = 0;
tilesBurst = 0;
grassSprayed = 0;
instantNumberOfGrass = 0;


function MatrixGenerator(size, countGrass, countGrassEater, predatorCount, tigerCount, bombCount, humanCount) {
    for (let i = 0; i < size; i++) {
        matrix[i] = [];
        for (let j = 0; j < size; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let k = 0; k < countGrass; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < countGrassEater; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < predatorCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < tigerCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < bombCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
        // else {
        //     k--
        // }
    }
    for (let k = 0; k < humanCount; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6;
        }
        // else {
        //     k--
        // }
    }

    return matrix

}
matrix = MatrixGenerator(50, 60, 60, 60, 28, 3);



for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            let gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            let gre = new GrassEater(x, y, 2)
            grassEaterArr.push(gre);
        }
        else if (matrix[y][x] == 3) {
            var gre = new predator(x, y, 3)
            predatorArr.push(gre);
        }
        else if (matrix[y][x] == 4) {
            var gre = new Tiger(x, y, 4)
            tigerArr.push(gre);
        }
        else if (matrix[y][x] == 5) {
            var bom = new Bomb(x, y, 5)
            bombArr.push(bom);
        }
        else if (matrix[y][x] == 6) {
            var gre = new Human(x, y, 6)
            humanArr.push(bom);
        }

    }
}

function drawserverayin() {
    for (let i in grassArr) {
        grassArr[i].mul()
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].eat()
    }
    for (let i in tigerArr) {
        tigerArr[i].eat()
    }
    for (let i in bombArr) {
        bombArr[i].eat()
    }
    for (let i in humanArr) {
        huamnArr[i].eat()
    }

    let sendData = {
        matrix: matrix
    }

    io.sockets.emit("matrix", sendData)
}
    let statistics = {
        "GrassBiten": GrassBiten,
        "grassAdust": grassAdust,
        "GrassBiterEaten": GrassBiterEaten,
        "tilesBurst": tilesBurst,
        "instantNumberOfGrass": instantNumberOfGrass,
    }

setInterval(drawserverayin, 1000);

fs.writeFileSync("statistics.json", statistics);

io.on("connection", function (socket) {
    socket.emit("matrix info", matrix);
    socket.emit("initial matrix", matrix);
});
io.emit("statistics", [GrassBiten,grassAdust,GrassBiterEaten,tilesBurst,grassSprayed,instantNumberOfGrass])

   return matrix;
clearInterval();
io.on("connection", function (socket) {
    GrassBiten = 0;
    grassAdust = 0;
    GrassBiterEaten = 0;
    tilesExploded = 0;
    instantNumberOfGrass = 0;
    matrix = [];
    objects = [];
    createCanvas()
    socket.emit("initial", matrix)
    socket.on("disconnect", function () {
        console.log("A user leaving!")
    });
});
