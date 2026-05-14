let stoneX = 0, stoneY = 0, vx = 0, vy = 0; 
let bounceCount = 0, bounceLimit = 1;       
let isSkipping = false, isDragging = false; 
let startX, startY;                         
let activeRipples = [];                    
let totalStones = 5;                       
let scatteredStones = [];                  
let currentStoneSize = 11;                 
let distToNextBounce = 100;                 
let traveledDist = 0;                       
let firstTime = true;                       
const pW = 1111, pH = 525;                  

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textStyle(BOLD);
  resetStones(); 
}

function resetStones() {
  scatteredStones = [];
  let cX = width / 2, cY = height / 2;
  for (let i = 0; i < totalStones; i++) {
    let x, y, isInside = true;
    while (isInside) {
      x = random(width); y = random(height);
      let dx = x - cX, dy = y - cY;
      let rx = pW / 2 + 20, ry = pH / 2 + 20;
      // Generate stones on the sand, not in the water
      if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) > 1) isInside = false;
    }
    let shade = random(90, 120);
    scatteredStones.push({ x: x, y: y, size: random(12, 28), color: shade });
  }
}

function draw() {
  // Land
  background(220, 215, 200); 
  let cX = width / 2, cY = height / 2;
  
  // Stones that are still left to be thrown.
  drawScatteredStones(); 

  // Pond
  noStroke(); fill(60, 100, 130); 
  ellipse(cX, cY, pW, pH);

  push();
    // Constrain all ripple/stone to the pond 
    drawingContext.beginPath();
    drawingContext.ellipse(cX, cY, pW / 2, pH / 2, 0, 0, TWO_PI);
    drawingContext.clip();

    for (let i = activeRipples.length - 1; i >= 0; i--) {
      let r = activeRipples[i];
      drawSingleRipple(r);
      r.size += 1.8; 
      r.alpha -= 2.5; 
      if (r.alpha <= 0) activeRipples.splice(i, 1);
    }

    // Stone movement and skipping
    if (isSkipping) {
      stoneX += vx;
      stoneY += vy;
      traveledDist += dist(0, 0, vx, vy);

      // Sink stone if it hits the shore
      let dx = stoneX - cX;
      let dy = stoneY - cY;
      let angle = atan2(dy, dx);
      let a = pW / 2;
      let b = pH / 2;
      let maxR = (a * b) / sqrt(sq(b * cos(angle)) + sq(a * sin(angle)));
      let currentR = dist(cX, cY, stoneX, stoneY);

      if (currentR >= maxR) {
        let edgeDist = constrain(currentR, 0, maxR);
        stoneX = cX + cos(angle) * edgeDist;
        stoneY = cY + sin(angle) * edgeDist;
        createRipple(stoneX, stoneY, "SINK");
        isSkipping = false; 
      } 

      // Trigger skip ripple based on distance traveled
      if (isSkipping && traveledDist >= distToNextBounce && bounceCount < bounceLimit) {
        createRipple(stoneX, stoneY, bounceCount);
        bounceCount++;
        traveledDist = 0;
        distToNextBounce *= 0.8; 
        vx *= 0.82; vy *= 0.82; 
      }

      // Sink stone if skip limit reached
      if (isSkipping && (bounceCount >= bounceLimit && traveledDist > 50)) {
        createRipple(stoneX, stoneY, "SINK");
        isSkipping = false; 
      }

      // Skipping stone
      if (isSkipping) {
        fill(255, 220); noStroke();
        circle(floor(stoneX), floor(stoneY), currentStoneSize);
      }
    }
  pop(); 

  // Rim
  noFill(); stroke(255, 120); strokeWeight(10);
  ellipse(cX, cY, pW, pH);
  
  drawUI(); 

  // Empty state message
  if (scatteredStones.length === 0 && !isSkipping && activeRipples.length === 0 && !isDragging) {
    fill(255); noStroke(); textSize(30);
    text("No more Stones Press 'K' to Find more.", width/2, height/2);
  }
}

function mousePressed() {
  let cX = width / 2, cY = height / 2;
  let dx = mouseX - cX, dy = mouseY - cY;
  let rx = pW / 2, ry = pH / 2;

  // Constrain land
  if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) > 1) return;

  firstTime = false;

  // stone drag
  if (!isSkipping && scatteredStones.length > 0) {
    startX = mouseX; startY = mouseY; 
    isDragging = true;
    let lastStone = scatteredStones.pop();
    currentStoneSize = lastStone.size;
  }
}

function mouseReleased() {
  if (isDragging) {
    isDragging = false; 
    let d = dist(startX, startY, mouseX, mouseY);
    let angle = atan2(startY - mouseY, startX - mouseX);
    
    // Set skip count based on drag distance
    if (d < 40){
      bounceLimit = 1; 
    }else if (d < 80){
      bounceLimit = 3;
    }else if (d < 120){
      bounceLimit = 5;
    }else bounceLimit = 8; 
    
    // Launch stone 
    let cappedDist = constrain(d, 0, 100); 
    let speed = 1.8 + (cappedDist / 100) * 2.8; 
    vx = cos(angle) * speed; 
    vy = sin(angle) * speed;

    isSkipping = true; 
    bounceCount = 0; 
    traveledDist = 1000; 
    distToNextBounce = map(d, 0, 100, 30, 80); 
    stoneX = startX; stoneY = startY;
  }
}

//Ripples with wording
function createRipple(x, y, type) {
  let scale = map(currentStoneSize, 12, 28, 0.7, 1.3);
  let words = ["PLOP", "PLIP", "DIP", "BLOOP", "THUD", "Plunk", "Splosh", "Ker-plunk"];

  activeRipples.push({
    x: x, y: y, size: 0, 
    maxSize: 160 * scale,
    alpha: 220, scale: scale, 
    txt: (type === "SINK") ? "Glub Glub" : (words[type] || "...")
  });
}


function drawSingleRipple(r) {
  noFill();
  let rx = floor(r.x), ry = floor(r.y);
  for (let i = 0; i < 4; i++) {
    let s = r.size - (i * 24); 
    if (s > 0) {
      stroke(255, map(s, 0, r.maxSize, r.alpha, 0));
      strokeWeight(1.2);
      circle(rx, ry, s * r.scale);
    }
  }
  push();
    fill(255, r.alpha * .99); noStroke(); textSize(26); 
    text(r.txt, rx, ry - 45); 
  pop();
}

// Drag Line
function drawUI() {
  if (isDragging) {
    stroke(150, 200, 190, 180); strokeWeight(2.5);
    line(startX, startY, mouseX, mouseY);
    fill(255, 80); noStroke();
    // Ghost stone at origin
    circle(startX, startY, currentStoneSize); 
  } else if (firstTime && scatteredStones.length > 0) {
    fill(255, 180); noStroke(); textSize(36);
    text(" Click and Drag within the pond to skip stones.", width/2, height/2);
  }
}

function drawScatteredStones() {
  noStroke(); 
  for (let s of scatteredStones) {
    fill(s.color); 
    // Stones on sand
    ellipse(s.x, s.y, s.size, s.size * 0.8); 
  }
}

//refill stone supply
function keyPressed() {
  if (key.toLowerCase() === 'k') { 
    resetStones(); 
    isSkipping = false; 
    activeRipples = []; 
  }
}