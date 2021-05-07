import CONSTANTS from "./index";

const getChar = (p) => String.fromCharCode(p.random(CONSTANTS.CHAR_LOW, CONSTANTS.CHAR_HIGH));

class Column {
    constructor(p) {
        this.p = p;
        this.x = p.random(0, p.displayWidth);
        this.colSize = Math.round(p.random(CONSTANTS.MIN_ARRAY_SIZE, CONSTANTS.MAX_ARRAY_SIZE));

        this.size = Math.round(p.map(this.colSize, CONSTANTS.MIN_ARRAY_SIZE,
            CONSTANTS.MAX_ARRAY_SIZE, CONSTANTS.MIN_FONT_SIZE, CONSTANTS.MAX_FONT_SIZE));

        this.speed = this.p.random(CONSTANTS.MIN_SPEED, CONSTANTS.MAX_SPEED);
        this.chars = Array.from({length: this.colSize},
            ()=> getChar(this.p));

        this.resetY();
    }

    draw() {

        if (this.y > this.p.displayHeight - 250) {
            this.x = this.p.random(this.p.displayWidth);
            this.resetY();
        }
        for (let i = 0; i < this.colSize; i++) {

            let c = this.chars[i];

            if (i % 2 === 0 || i === this.colSize - 1)
                c = getChar(this.p);

            let y = this.y + i * this.size;

            this.p.fill(0);
            this.p.square(this.x, y, this.size);
            this.p.textSize(this.size);

            if (i !== this.colSize - 1) {
                this.p.fill(`rgba(0,255,0,${this.p.alphas[i]})`);
            } else {
                this.p.textSize(this.size + 2);
                this.p.fill(`rgba(255, 255, 255,${this.p.alphas[i]})`);
            }
            this.p.text(c, this.x, y);
        }
        this.y += this.speed;
    }

    resetY() {
        this.y = -1 * this.colSize * this.size;
    }

}


export default Column;