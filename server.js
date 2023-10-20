var express = require("express");

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("../programming32"));

app.get("/", function (req, res) {
    res.redirect("index.html");
});

server.listen(3000, function () {
    console.log("Example is running on port 3000");
});


 grassArr = [];
 grassEaterArr = [];
 predatorArr = [];
 tigerArr = [];
 bombArr = [];

Grass = require('./grass');
GrassEater = require('./grasseater');
predator = require('./predator');
Bomb = require('./bomb');
Tiger = require('./tiger');
let  random = require("./random");

var cl = false;
io.on("connection", function (socket) {
    if (cl) {
        setInterval(drawserverayin, 200);
        cl = true;
    }
});

 matrix = [];

function MatrixGenerator(size, countGrass, countGrassEater, predatorCount, tigerCount, bombCount) {
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


    let sendData = {
        matrix: matrix
    }

    io.sockets.emit("matrix", sendData)
}
setInterval(drawserverayin, 1000);