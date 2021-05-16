let graphics ;
let image;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    graphics = createGraphics(windowWidth, windowHeight);
    image = new MatrixRain(graphics);
    image.setup();
}

function draw() {
    background(0);
    ambientLight(255,255,255);
    // let v = createVector(mouseX, mouseY, 0);
    let mapMouseX = mouseX - windowWidth / 2;
    let mapMouseY = mouseY - windowHeight / 2;
    // camera(0, 0, (height / 2) / tan(PI / 6), mapMouseX, mapMouseY, 0, 0, 1, 0);

    // plane(windowWidth, windowHeight);
    // texture(graphics);


    // stroke(100);

    push();
    ambientMaterial(175);
    translate(0, windowHeight / 2, 0);
    rotateX(radians(90));
    plane(windowWidth, windowWidth);
    pop();

    texture(graphics);

    push();
    translate(-windowWidth / 2, 0, 0);
    rotateY(radians(90));
    plane(windowWidth, windowHeight);

    pop();

    push();
    translate(windowWidth / 2, 0, 0);
    rotateY(radians(-90));
    plane(windowWidth, windowHeight);
    pop();
    image.draw();


}

const CONSTANTS = {
    FRAME_RATE: 30,
    COLS: 25,
    CHAR_LOW: 0x3030,
    CHAR_HIGH: 0x31D0,
    MAX_ARRAY_SIZE: 50,
    MIN_ARRAY_SIZE: 10,
    MIN_FONT_SIZE: 12,
    MAX_FONT_SIZE: 28,
    MIN_SPEED: 4,
    MAX_SPEED: 12,
    CANVAS_SIZE: 500

};

const getChar = () => String.fromCharCode(random(CONSTANTS.CHAR_LOW, CONSTANTS.CHAR_HIGH));

class RainColumn {
    constructor(g) {
        this.g = g;
        this.colSize = Math.round(random(CONSTANTS.MIN_ARRAY_SIZE, CONSTANTS.MAX_ARRAY_SIZE));
        this.speed = random(CONSTANTS.MIN_SPEED, CONSTANTS.MAX_SPEED);
        this.chars = Array.from({length: this.colSize}, getChar);
        this.size = 20;//map(this.x,0, windowWidth, CONSTANTS.MIN_FONT_SIZE, CONSTANTS.MAX_FONT_SIZE);
        this.resetX();
        this.resetY();
        this.resetAlpha();
    }

    draw() {
        if (this.y > windowHeight ) {
            this.resetY();
            this.resetX();
            this.resetAlpha();
        }

        let change = frameCount % 10 === 0;

        for (let i = 0; i < this.colSize; i++) {

            if (change && (i % 5 === 0 || i === this.colSize - 1))
                this.chars[i] = getChar();

            let y = this.y + i * this.size;

            // drawing a dark square displays the character clearly, otherwise new char is overwritten
            // on the old one with a delta y of value speed.
            this.g.fill(`rgba(0, 0, 0, 0.9)`);
            this.g.square(this.x, y, this.size);
            this.g.textSize(this.size);
            if (i !== this.colSize - 1) {
                this.g.fill(`rgba(0,255,0,${alpha})`);
            } else {
                this.g.textSize(this.size + 2);
                this.g.fill(`rgba(255, 255, 255,${alpha})`);
            }
            this.g.text(this.chars[i], this.x, y);
        }
        this.y += this.speed;
    }

    resetY() {
        this.y = -1 * this.colSize * this.size;
    }

    resetX() {
        this.x = random(windowWidth);

    }

    resetAlpha() {
        this.alpha =  map(this.x, 0, windowWidth,0.1, 1);
    }
}

class MatrixRain {
    constructor(g) {
        this.cols = Array.from({length: CONSTANTS.COLS}, () => new RainColumn(g));
        this.g = g;
    }

    setup() {
        this.g.background(0);
    }

    draw() {
        this.g.background('rgba(0,0,0,0.1)');
        this.cols.forEach(c => c.draw());
    }

}
