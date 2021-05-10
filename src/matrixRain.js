import {CONSTANTS, mouseClicked, doubleClicked, windowOnBlur, windowOnFocus} from "./index";

const getChar = (p) => String.fromCharCode(p.random(CONSTANTS.CHAR_LOW, CONSTANTS.CHAR_HIGH));

class RainColumn {
    constructor(p, alphas) {
        //todo sizes, bounds, etc. can also be injected instead of relying on constants.
        this.p = p;
        this.alphas = alphas;
        this.colSize = Math.round(p.random(CONSTANTS.MIN_ARRAY_SIZE, CONSTANTS.MAX_ARRAY_SIZE));

        this.size = Math.round(p.map(this.colSize, CONSTANTS.MIN_ARRAY_SIZE,
            CONSTANTS.MAX_ARRAY_SIZE, CONSTANTS.MIN_FONT_SIZE, CONSTANTS.MAX_FONT_SIZE));

        this.speed = this.p.random(CONSTANTS.MIN_SPEED, CONSTANTS.MAX_SPEED);
        this.chars = Array.from({length: this.colSize},
            () => getChar(this.p));

        this.resetY();
        this.resetX();
    }

    draw() {
        if (this.y > this.p.displayHeight - 250) {
            this.resetY();
            this.resetX();
        }

        let change = this.p.frameCount % 10 === 0;

        for (let i = 0; i < this.colSize; i++) {

            if (change && (i % 5 === 0 || i === this.colSize - 1))
                this.chars[i] = getChar(this.p);

            let y = this.y + i * this.size;

            // drawing a dark square displays the character clearly, otherwise new char is overwritten
            // on the old one with a delta y of value speed.
            this.p.fill(`rgba(0, 0, 0, 0.9)`);
            this.p.square(this.x, y, this.size);
            this.p.textSize(this.size);

            if (i !== this.colSize - 1) {
                this.p.fill(`rgba(0,255,0,${this.alphas[i]})`);
            } else {
                this.p.textSize(this.size + 2);
                this.p.fill(`rgba(255, 255, 255,${this.alphas[i]})`);
            }
            this.p.text(this.chars[i], this.x, y);
        }
        this.y += this.speed;
    }

    resetY() {
        this.y = -1 * this.colSize * this.size;
    }

    resetX() {
        this.x = this.p.random(this.p.displayWidth);
    }

}

class MatrixRain {
    constructor(p) {
        this.alphas = Array.from({length: CONSTANTS.MAX_ARRAY_SIZE},
            (_, i) => p.map(i, 0, CONSTANTS.MAX_ARRAY_SIZE, 0.1, 1));
        this.cols = Array.from({length: CONSTANTS.COLS}, () => new RainColumn(p, this.alphas));
        this.p = p;
    }

    setup() {
        this.p.background(0);
    }

    draw() {
        this.p.background('rgba(0,0,0,0.1)');
        this.cols.forEach(c => c.draw());
    }

}


export default MatrixRain;