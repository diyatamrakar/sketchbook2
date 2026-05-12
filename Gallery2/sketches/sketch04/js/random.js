let jitter;
let homeX = 300;
let homeY = 200;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvas');
}

function draw() {
    background(200, 220, 200);

    // jitter 
    jitter = random(-5, 5);

    // home
    noFill();
    stroke(150); // Grey outline
    strokeWeight(2);
    ellipse(homeX, homeY, 70, 70);

    fill(150);
    noStroke();
    textAlign(CENTER);
    text("HOME", homeX, homeY + 50);

    let targetX, targetY;

    // If the mouse is pressed, commute to the cursor.
    if (mouseIsPressed) {
        targetX = mouseX;
        targetY = mouseY;
    } else {
        targetX = homeX;
        targetY = homeY;
    }

    // --- THE COMMUTER ---
    fill(100, 100, 250);
    noStroke();
    // The commuter moves, but also jitters (One New Thing)
    ellipse(targetX + jitter, targetY + jitter, 60, 60);

    // --- UI TEXT ---
    fill(0);
    textAlign(LEFT);
    text("Verb: Commuting", 20, 30);
    text("Rule: Hold mouse to leave home and go to work.", 20, 50);
}