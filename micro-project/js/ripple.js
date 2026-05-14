let stoneX, stoneY;
let impactX, impactY; 
let vx = 0;           
let rippleSize = 0;
let isSkipping = false;
let bounceCount = 0;  
let currentWord = "";
let sinkThreshold = 1.0; 

function setup() {
  let canvas = createCanvas(600, 400);
  canvas.parent('canvas');
  textAlign(CENTER);
  textStyle(BOLD);
}

function draw() {
    background(10, 20, 50); 

    if (isSkipping) {
        stoneX += vx;

        // DRAW RIPPLES at the IMPACT site (not the stone site)
        noFill();
        strokeWeight(2);

        // rippleSize so it fades out exactly as it hits max size
        let alpha1 = map(rippleSize, 0, 150, 255, 0); 
        stroke(255, alpha1);
        
        // so the ripple stays behind while stone moves forward
        circle(impactX, impactY, rippleSize);

        if (rippleSize > 20) {
            let alpha2 = map(rippleSize - 20, 0, 150, 255, 0);
            stroke(255, alpha2);
            circle(impactX, impactY, rippleSize - 20);
        }
        if (rippleSize > 40) {
            let alpha3 = map(rippleSize - 40, 0, 150, 255, 0);
            stroke(255, alpha3);
            circle(impactX, impactY, rippleSize - 40);
        }
        if (rippleSize > 60) {
            let alpha4 = map(rippleSize - 60, 0, 150, 255, 0);
            stroke(255, alpha4);
            circle(impactX, impactY, rippleSize - 60);
        }

        // SOUND WORDS (at impact site)
        fill(255, alpha1);
        noStroke();
        textSize(40);
        text(currentWord, impactX, impactY - 50);

        rippleSize += 2.5; 

        // Check if a "bounce" is complete
        if (rippleSize > 170) { 
            rippleSize = 0;   
            bounceCount++;    
            vx *= 0.6; 

            // impact point to where the stone is NOW
            impactX = stoneX;
            impactY = stoneY;

            if (bounceCount === 1) {
                currentWord = "THUD";
            } else if (bounceCount === 2) {
                currentWord = "SPLASH";
            } else {
                 // After 2 bounces, the stone "sinks"
                isSkipping = false; 
            }
        }

        //THE PEBBLE (Always moving)
        if (bounceCount < 2) {
            fill(200);
            circle(stoneX, stoneY, 11);
        }

    } else {
        // Stillness / Instruction State
        fill(255, 100);
        noStroke();
        textSize(30);
        text("Click to skip a stone across the pond", width/2, height/2);
    }
}

function mousePressed() {
  // Reset all variables to start a new "throw"
  isSkipping = true;
  bounceCount = 0; 
  currentWord = "PLIP"; 
  rippleSize = 0;
  
  stoneX = mouseX;
  stoneY = mouseY;
  impactX = mouseX; 
  impactY = mouseY;
  vx = 1.9;
}