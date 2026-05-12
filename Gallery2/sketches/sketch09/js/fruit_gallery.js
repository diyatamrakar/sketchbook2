let images = [];
let currentIndex = 0;
let counterDiv;
let statusDiv; 
let isLocked = true; 

function setup() {
    noCanvas(); 

    images[0] = createImg('img/blueberries.png', 'blueberries');
    images[1] = createImg('img/cherries.png', 'cherries');
    images[2] = createImg('img/oranges.png', 'oranges');
    images[3] = createImg('img/peaches.png', 'peaches');
    images[4] = createImg('img/pink_lemons.png', 'pink lemons');

    for (let i = 0; i < images.length; i++) {
        images[i].hide();
    }

    // Initialize UI Elements (State Communication)
    counterDiv = createDiv('');
    counterDiv.class('counter');
    
    statusDiv = createDiv(''); // New element for Sketch 9
    statusDiv.class('status-label');
}

function draw() {
    // Modularizing behavior into clearly defined functions
    updateVisibility(); 
    updateUI();         
    updateStyling();    
}

// Logic for showing/hiding elements
function updateVisibility() {
    for (let i = 0; i < images.length; i++) {
        (i === currentIndex) ? images[i].show() : images[i].hide();
    }
}

// Logic for state communication
function updateUI() {
    counterDiv.html("picture " + (currentIndex + 1) + " / 5");
    
    // Interaction Expansion: Meaningful feedback
    if (isLocked) {
        statusDiv.html("SYSTEM LOCKED: Press 'U' to Unlock Navigation");
    } else {
        statusDiv.html("SYSTEM ACTIVE: Use Arrow Keys to Browse");
    }
}

// Visual overlay/feedback per state
function updateStyling() {
    if (isLocked) {
        select('body').style('background-color', '#f5f0e6'); // Light brown
        statusDiv.style('color', '#990000');
    } else {
        select('body').style('background-color', '#e1e8dd'); // Light sage
        statusDiv.style('color', '#006600');
    }
}

// Navigation logic with wrap/boundary logic
function navigate(direction) {
    if (isLocked) return; // Intentional boundary logic expansion

    currentIndex = (currentIndex + direction + images.length) % images.length;
}

function keyPressed() {
    // Interaction Expansion: Secondary input trigger
    if (key === 'u' || key === 'U') {
        isLocked = !isLocked;
    }

    if (keyCode === RIGHT_ARROW) navigate(1);
    if (keyCode === LEFT_ARROW) navigate(-1);
}