let stoneX, stoneY;
let vx = 0;           
let rippleSize = 0;
let isSkipping = false;
let bounceCount = 0;  
let currentWord = "";

function setup() {
  
  let canvas = createCanvas(600, 400);
  canvas.parent('canvas');
  
  textAlign(CENTER);
  textStyle(BOLD);
}

function draw() {
  background(10, 20, 50); 

  if (isSkipping) {
    // 1. SYSTEM BEHAVIOR: Move the stone across the X-axis
    stoneX += vx;

    // 2. Draw the expanding ripple
    noFill();
    // rippleSize so it fades out exactly as it hits max size
    let alpha = map(rippleSize, 0, 150, 255, 0); 
    stroke(255, alpha);
    strokeWeight(2);
    circle(stoneX, stoneY, rippleSize);
    
    // 3. Display the sound word above the ripple
    fill(255, alpha);
    noStroke();
    textSize(40);
    text(currentWord, stoneX, stoneY - 50);

    // Increase ripple size over time
    rippleSize += 5; 

    // 4. FRICTION & LOGIC: Check if a "bounce" is complete
    if (rippleSize > 150) {
      rippleSize = 0;   
      bounceCount++;    
      vx *= 0.6;       

      // which word to show based on the bounceCount
      if (bounceCount === 1) {
        currentWord = "PLIP";
      } else if (bounceCount === 2) {
        currentWord = "THUD";
      } else if (bounceCount === 3) {
        currentWord = "SPLASH";
      } else {
        // After 3 bounces, the stone "sinks"
        isSkipping = false;
      }
    }

    // 5. THE PEBBLE: Draw the physical stone
    fill(200);
    circle(stoneX, stoneY, 8);

  } else {
    // Stillness / Instruction State
    fill(255, 100);
    noStroke();
    textSize(20);
    text("Click to skip a stone across the pond", width / 2, height / 2);
  }
}

function mousePressed() {
  // Reset all variables to start a new "throw"
  isSkipping = true;
  bounceCount = 1;
  currentWord = "PLIP";
  rippleSize = 0;
  
  stoneX = mouseX;
  stoneY = mouseY;
  vx = 12; 

}
