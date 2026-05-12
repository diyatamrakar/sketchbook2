// Adjective: Relaxing | Pattern: Accumulation
function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvas');
    background(20, 30, 35); // Dark background
}

function draw() {
    // 1. Draw the "fade" layer FIRST
    noStroke();
    // If you want to see the circles more clearly, 
    // keep the last number (alpha) very low, like 5 or 10.
    fill(20, 30, 35, 10);
    rect(0, 0, width, height);

    // 2. Draw the circle SECOND
    // This puts the circle and the black border ON TOP
    stroke(0); // Black border
    strokeWeight(2);
    fill(180, 200, 220, 150); // Increased alpha to 150 so it's less see-through

    // Ensure you use mouseX and mouseY
    ellipse(mouseX, mouseY, 40, 40);
}