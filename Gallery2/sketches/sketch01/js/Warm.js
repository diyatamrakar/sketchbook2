// Adjective: Warm | Pattern: Direct Manipulation + Accumulation
let ripples = [];
let pulse = 0;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvas');
    noStroke();
}

function draw() {
    background(180, 40, 40);

    // 1. CALCULATE GLOBAL PULSE
    pulse = sin(frameCount * 0.05) * 25;

    // 2. MAIN LIGHT (Direct Manipulation)
    fill(255, 200, 50, 100);
    circle(mouseX, mouseY, 100 + pulse);

    fill(255, 255, 150, 180);
    circle(mouseX, mouseY, 50 + pulse / 2);

    // 3. CREATE RIPPLES
    let mouseSpeed = dist(mouseX, mouseY, pmouseX, pmouseY);
    if (mouseSpeed > 2) {
        ripples.push({
            x: mouseX,
            y: mouseY,
            size: 100 + pulse,
            alpha: 100
        });
    }

    // 4. UPDATE AND DRAW RIPPLES
    for (let i = ripples.length - 1; i >= 0; i--) {
        let r = ripples[i];

        fill(255, 200, 50, r.alpha);
        circle(r.x, r.y, r.size);

        // This makes the ripples stay on screen 4x longer
        r.alpha -= 0.5;

        //Slow down the shrinking 
        r.size -= 0.05;

        if (r.alpha <= 0) {
            ripples.splice(i, 1);
        }
    }
}