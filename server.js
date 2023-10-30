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
let frameRate = 10;

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

objects = [];
grassArr = [];
grassEaterArr = [];
predatorArr = [];
tigerArr = [];
bombArr = [];
humanArr = [];

Grass = require('./grass');
GrassEater = require('./grasseater');
predator = require('./predator');
Bomb = require('./bomb');
Tiger = require('./tiger');
Human = require('./human');
let random = require("./random");

Grass

var cl = false;
io.on("connection", function (socket) {
    if (cl) {
        setInterval(drawserverayin, 200);
        cl = true;
    }
});

GlobalMethods = {
    classify: function (number, x, y) {
        switch (number) {
            case 0:
                return null;
            case 1:
                instantNumberOfGrass++;
                return new Grass(x, y);
            case 2:
                var genderChooser = Math.random();
                if (genderChooser < 0.6) return new GrassEater(x, y, "male");
                else return new GrassEater(x, y, "feamle");
            case 3:
                var genderChooser = Math.random();
                if (genderChooser < 0.6) return new Predator(x, y, "male");
                else return new Predator(x, y, "female");
            case 4:
                return new Tiger(x, y);
            case 5:
                return new Bomb(x, y);
            case 6:
                return new Human(x, y);

        }
    }
}

mutateMatrix: function (x, y, value, spread, remover = -1) {
    if (matrix[y][x] == 1) {
        if (remover == 2 || remover == 3)
            GrassBiten++;
        else if (remover == 98);
        grassAdust++;
    }
    else if (matrix[y][x] == 2) {
        if (remover == 3)
            GrassBiterEaten++;
    }
    matrix[y][x] = value;
    if (spread == true && value != 0) objects.push(GlobalMethods.classify(value, x, y));
}(
deleteObject: function(x, y) {
    for (let i in objects) {
        if (x == objects[i].x && y == objects[i].y) {
            if (objects[i].id == 1) instantNumberOfGrass--;
            objects.splice(i, 1);
            break;
        }
    }
}
matrix = [];

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
            var hum = new Human(x, y, 6)
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
setInterval(drawserverayin, 1000);

