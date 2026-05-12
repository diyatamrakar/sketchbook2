let isBroken = false;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvas');
}

function draw() {
    background(240, 230, 210);

    // Home Zone (Start)
    noStroke();
    fill(200, 200, 200, 150);
    rect(0, 0, 100, 400);
    fill(100);
    text("HOME", 35, 380);

    // Coffee Shop (End)
    fill(100, 50, 0);
    rect(500, 150, 60, 80);
    fill(100, 50, 0);
    text("COFFEE SHOP", 495, 250);

    // If mouse is pressed, the machine "breaks" and we can move
    if (mouseIsPressed) {
        isBroken = true;
        fill(255, 100, 100);
        text("COFFEE MACHINE STATUS: BROKEN. Walking to shop...", 20, 30);
    } else {
        isBroken = false;
        fill(0, 150, 0);
        text("COFFEE MACHINE STATUS: WORKING. Staying at home.", 20, 30);
    }

    let xPos;

    if (isBroken) {
        // Constrain to keep the circle between Home and the Shop
        xPos = constrain(mouseX, 50, 530);
    } else {
        // Otherwise (When machine is working), the circle is locked at home
        xPos = 50;
    }

    fill(50, 50, 200);
    ellipse(xPos, 200, 40, 40);

    if (xPos >= 530) {
        fill(0);
        text("ARRIVED! Caffeine acquired.", 440, 140);
    }
}