let graphics;
let image;
let x = 0, z = 0;
let font;
let initialized = false;
let particles = [];

function preload() {
    font = loadFont('../assets/Roboto-Light.ttf');
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    particles = Array.from({length: 2000}, _ => new Particle());
    textFont(font);
    textSize(30);
    textAlign(CENTER, CENTER);
}


function move() {
    initialized = true;
    if (x > -windowWidth / 2 && (keyCode === LEFT_ARROW || keyCode === 65)) {
        x -= 15;
    } else if (x < windowWidth / 2 && (keyCode === RIGHT_ARROW || keyCode === 68)) {
        x += 15;
    } else if ((z >= -(height/2/tan(PI/6)) ) &&(keyCode === UP_ARROW || keyCode === 87) ){
        z -= 10;
    } else if ((z <= 0 ) && (keyCode === DOWN_ARROW || keyCode === 83)) {
        z += 10;
    }

}

function draw() {
    background(0);
    ambientLight(0, 255, 0);
    // let v = createVector(mouseX, mouseY, 0);
    let mapMouseX = mouseX - windowWidth / 2;
    let mapMouseY = mouseY - windowHeight / 2;

    if (!initialized) {
        text('move mouse change direction', 0, 0);
        text('A, S, D and W keys to move', 0, 50);
    }

    // text((height / 2) / tan(PI / 6), 0,0);
    // text(z, 0,50);

    if (keyIsPressed) {
        move()
    }

    camera(x, 0, (height / 2) / tan(PI / 6) + z, mapMouseX + x, mapMouseY, 0, 0, 1, 0);

    particles.forEach(p => p.draw());
}


class Particle{
    constructor() {
        this.x = round(random(-windowWidth / 2, windowWidth / 2));
        this.y = round(random(-windowHeight / 2, windowHeight / 2));
        let zPos = (height / 2) / tan(PI / 6);
        this.z = round(random(100, -1000));

    }

    draw(){
        push();
        noStroke();
        translate(this.x, this.y, this.z);
        ambientMaterial(244);
        sphere(1)
        pop();
    }
}