let efficiency = 5;
let workerEnergy = 5;
let xPos = 0;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvas');
}

function draw() {
    background(230, 230, 220);

    if (mouseIsPressed) {
        xPos += 1;
    }

    // THE UNEVEN RULE: 
    // (Top) always moves at full efficiency
    // (Bottom) energy decays over time if you click too much
    if (mouseIsPressed && workerEnergy > 0.5) {
        workerEnergy -= 0.01; // Decay: getting "tired" over time
    }

    // The Privileged Circle
    fill(100, 200, 100); // Green
    ellipse(xPos * efficiency, 150, 50, 50);

    // The Fatigued Circle
    fill(200, 100, 100); // Red
    ellipse(xPos * workerEnergy, 250, 50, 50);


    fill(0);
    noStroke();
    textSize(16);
    text("Hold Mouse to Move Both", 20, 30);
    text("Green Energy (Constant): " + efficiency.toFixed(1), 20, 140);
    text("Red Energy (Decaying): " + workerEnergy.toFixed(1), 20, 240);

    if (workerEnergy < 1) {
        text("STATE: EXHAUSTED", 20, 380);
    }
}