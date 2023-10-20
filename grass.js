let random = require("./random");
let LivingCreature = require('./livingCreature')
module.exports = class Grass extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index)
        this.multiply = 0;
    }


    mul() {
        this.multiply++;
        let aaa = this.chooseCell(0)
        var newCell = random(aaa);
        if (this.multiply >= 8 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], 1);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

