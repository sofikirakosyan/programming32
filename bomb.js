//ays kerpar@ tigeri char tesakn e 
let  random = require("./random");
module.exports = class Bomb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 40;
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character, food1, food2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == food1 || matrix[y][x] == food2 ) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    mul() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell && this.energy >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;
            bombArr.push(new Bomb(newX, newY));
            this.energy = 5;
        }
    }

    move() {
        var found = this.chooseCell(0);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
        this.energy--;

        if (this.energy < 0) {
            this.die();
        }
    }

    eat() {
        var found = this.chooseCell(1, 2, 4);
        var newCell = random(found);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
            this.energy++;

            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in tigerArr) {
                if (newX == tigerArr[i].x && newY == tigerArr[i].y) {
                    tigerArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 5) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }

    die() {
        for (var i in bombArr) {
            if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                bombArr.splice(i, 1);
                break;
            }
        }
        matrix[this.y][this.x] = 0;
    }
}


