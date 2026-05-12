let jitter;
let homeX = 300;
let homeY = 200;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvas');
}

function draw() {
    background(200, 220, 200);

    // jittery
    jitter = random(-2, 2);

    // Home Base 
    noFill();
    stroke(150);
    ellipse(homeX, homeY, 80, 80);

    // THE ITERATION: If/Else Logic
    if (mouseIsPressed) {

        // BEHAVIOR A: Commuting (Active)
        fill(100, 100, 250);
        ellipse(mouseX + jitter, mouseY + jitter, 60, 60);

        fill(0);
        text("Status: Commuting to work...", 20, 30);
    } else {
        // BEHAVIOR B: The 'else' (Alternative Behavior)
        // When not commuting, the circle "rests" at home and grows/shrinks
        let pulse = sin(frameCount * 0.1) * 10;

        // color change for 'Resting'
        fill(250, 150, 150);
        ellipse(homeX + jitter, homeY + jitter, 60 + pulse, 60 + pulse);

        fill(0);
        text("Status: Resting at home", 20, 30);
    }

    text("Rule: Mouse Press = Commute | Else = Rest & Pulse", 20, 50);
}