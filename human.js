let Grass = require('./grass')



module.exports = class Human extends livingCreature {
  
    constructor(x, y) {
        super(x,y);   
        this.energy = 20;
    }
    getNewDirections(){
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
    mul() {
        let newCell = this.random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            let human = new Human(x, y);
            HuamnArr.push(human);
            this.energy = 10;
        }
    }
    die() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < HumanArr.length; i++) {
            if (HumanArr[i].x == this.x && HumanArr[i].y == this.y) {
                HumanArr.splice(i, 1)
            }
        }
    }
    kill() {
        this.getNewDirections();
        let newCell2 = this.random(this.chooseCell(2));
        let newCell0 = this.random(this.chooseCell(0));
        if (newCell2) {
            this.energy += 4;
            let x = newCell2[0];
            let y = newCell2[1];

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;

            for (let i = 0; i < grassEaterArr.length; i++) {
                if (grassEaterArr[i].x == x && grassEaterArr[i].y == y) {
                    grassEaterArr.splice(i, 1)
                }
            }

            if (this.energy >= 18) {
                this.mul()
            }
        }
        else if (newCell0) {
            this.move()
        }
        else { this.stay() }
    }
    move() {
        this.energy--;
        let newCell = this.random(this.chooseCell(0));
        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.y = y;
            this.x = x;
        }
        if (this.energy < 0) {
            this.die();
        }
    }
    stay() {
        this.energy -= 2;
        if (this.energy < 0) {
            this.die();
        }
    }
}