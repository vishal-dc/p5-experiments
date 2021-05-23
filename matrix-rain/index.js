const validateSketchClass = sketchClass =>{
    if(!sketchClass)
        throw new Error("sketchClass is undefined");

    if(!sketchClass.prototype.constructor instanceof Function)
        throw new Error("setup should be a constructor function");

    if(!sketchClass.prototype.setup instanceof Function)
        throw new Error("setup should be a function");

    if(!sketchClass.prototype.draw instanceof Function)
        throw new Error("draw should be a function");
}

const sketchContainer = (p, window, sketchClass) => {
    validateSketchClass(sketchClass);

    const sketch = new sketchClass(p);

    p.setup = () => {
        p.createCanvas(CONSTANTS.CANVAS_SIZE, CONSTANTS.CANVAS_SIZE);
        p.isPaused = false;
        sketch.setup();
    };

    p.draw = () => {
        sketch.draw();
    };

    p.mouseClicked = () => {
        // todo check coords of click to determine the click is within the canvas.
        p.isPaused = !p.isPaused;
        if (p.isPaused)
            p.noLoop();
        else
            p.loop();
    };

    p.doubleClicked = () => {
        p.isFullScreen = !p.isFullScreen;
        if (p.isFullScreen) {
            p.resizeCanvas(p.displayWidth, p.displayHeight);
        } else {
            p.resizeCanvas(CONSTANTS.CANVAS_SIZE, CONSTANTS.CANVAS_SIZE);
        }
        p.fullscreen(p.isFullScreen);
        p.background(0);
    };

    window.onblur = () => p.noLoop();

    window.onfocus = () => {
        if(!p.isPaused)
            p.loop();
    }
};

let myp5 = new p5(p => sketchContainer(p, window, MatrixRain), document.getElementById('p5-container'));