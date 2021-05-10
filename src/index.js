import p5 from "p5";
import matrixRain from "./matrixRain";
// https://unicode-table.com/en/#kangxi-radicals

export const CONSTANTS = {
    FRAME_RATE: 30,
    COLS: 50,
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

export const doubleClicked = p => {
    p.isFullScreen = !p.isFullScreen;
    if (p.isFullScreen) {
        p.resizeCanvas(p.displayWidth, p.displayHeight);
    } else {
        p.resizeCanvas(CONSTANTS.CANVAS_SIZE, CONSTANTS.CANVAS_SIZE);
    }
    p.fullscreen(p.isFullScreen);
    p.background(0);
};

export const mouseClicked = p => {
    p.isPaused = !p.isPaused;
};


let myp5 = new p5(matrixRain, document.getElementById('p5-container'));