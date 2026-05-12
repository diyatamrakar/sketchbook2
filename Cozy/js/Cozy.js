// Adjective: Cozy | Pattern: Constraint
function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent('canvas');
    rectMode(CENTER); // Draws rectangles from the center for easier math
    noStroke();
}

function draw() {
    background(225, 225, 210);

    // 1. Draw the "Nook" (the boundary)
    fill(225, 215, 200);
    rect(width / 2, height / 2, 500, 300, 20); // The "safe" area

    // 2. Constraint Logic
    // This keeps the square's position within a specific box in the center
    let constrainedX = constrain(mouseX, width / 2 - 220, width / 2 + 220);
    let constrainedY = constrain(mouseY, height / 2 - 120, height / 2 + 120);

    // 3. The "Cozy" Form
    fill(150, 120, 100); // Soft brown/earth tone
    rect(constrainedX, constrainedY, 60, 60, 15);
}