import p5 from "p5";
import Column from "./column";
// https://unicode-table.com/en/#kangxi-radicals

const CONSTANTS = {
    FRAME_RATE: 12,
    COLS: 80,
    CHAR_LOW: 0x3030,//0x3040,
    CHAR_HIGH: 0x31D0,//0x31E0,
    MAX_ARRAY_SIZE: 50,
    MIN_ARRAY_SIZE: 10,
    MIN_FONT_SIZE: 10,
    MAX_FONT_SIZE: 18,
    MIN_SPEED: 5,
    MAX_SPEED: 18
};

const sketch = (p) => {

    p.setup = () => {

        if(p.isFullScreen){
            p.createCanvas(p.displayWidth, p.displayHeight);
        }else{
            p.createCanvas(500, 500);
        }
        p.fullscreen(p.isFullScreen);

        p.background(0);

        p.frameRate(CONSTANTS.FRAME_RATE);
        p.alphas = Array.from({length: CONSTANTS.MAX_ARRAY_SIZE},
            (_, i) => p.map(i, 0, CONSTANTS.MAX_ARRAY_SIZE, 0.1, 1));

        p.cols = Array.from({length: CONSTANTS.COLS}, () => new Column(p));

    };

    p.draw = () =>{
        p.background('rgba(0,0,0,0.1)');
        p.cols.forEach(c => c.draw());
    };

    p.doubleClicked = () =>{
        p.isFullScreen = !p.isFullScreen;
        p.setup();
    }

};

export default CONSTANTS;
let myp5 = new p5(sketch, document.getElementById('p5-container'));