let images = [];
let currentIndex = 0;
let isLocked = true;
let imageContainer; // The box that will hold your fruit/lock
let lockImg;
let statusDiv;

function setup() {
    noCanvas();

    imageContainer = createDiv('');
    imageContainer.class('stage');
    lockImg = createImg('img/lock.png', 'locked');
    lockImg.parent(imageContainer);
    
    images[0] = createImg('img/blueberries.png', 'blueberries');
    images[1] = createImg('img/cherries.png', 'cherries');
    images[2] = createImg('img/oranges.png', 'oranges');
    images[3] = createImg('img/peaches.png', 'peaches');
    images[4] = createImg('img/pink_lemons.png', 'pink lemons');

    for (let img of images) {
        img.parent(imageContainer);
        img.hide();
    }

    let instructionBox = select('.direction'); 
    statusDiv = createDiv('');
    statusDiv.class('status-label');
    statusDiv.parent(instructionBox);
}

function draw() {
    updateVisibility();
    updateUI();
    updateStyling(); 
}

function updateVisibility() {
    if (isLocked) {
        for (let img of images) img.hide();
        lockImg.show();
    } else {
        lockImg.hide();
        for (let i = 0; i < images.length; i++) {
            (i === currentIndex) ? images[i].show() : images[i].hide();
        }
    }
}

function updateStyling() {
    // Only affects the imageContainer box
    if (isLocked) {
        imageContainer.style('background-color', '#ffb3b3'); 
        imageContainer.style('border', '5px solid #990000');

        statusDiv.style('color', '#990000');
    } else {
        imageContainer.style('background-color', '#e1e8dd'); 
        imageContainer.style('border', '5px solid #006600');
        statusDiv.style('color', '#006600');
    }
}

function updateUI() {
    if (isLocked) {
        statusDiv.html("SYSTEM LOCKED: Press 'k' to Unlock");
    } else {
        statusDiv.html("SYSTEM ACTIVE: Fruit " + (currentIndex + 1) + "/ 5");
    }
}

function keyPressed() {
    if (key === 'k' || key === 'K') isLocked = !isLocked;
    if (keyCode === RIGHT_ARROW && !isLocked) currentIndex = (currentIndex + 1) % images.length;
    if (keyCode === LEFT_ARROW && !isLocked) currentIndex = (currentIndex - 1 + images.length) % images.length;
}