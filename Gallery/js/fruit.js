let images = [];
let currentIndex = 0;

function setup() {
    noCanvas(); 

    images[0] = createImg('img/blueberries.png', 'blueberries');
    images[1] = createImg('img/cherries.png', 'cherries');
    images[2] = createImg('img/oranges.png', 'oranges');
    images[3] = createImg('img/peaches.png', 'peaches');
    images[4] = createImg('img/pink_lemons.png', 'pink lemons');

    // Style images for centering and smaller sizing 
    for (let i = 0; i < images.length; i++) {
        images[i].hide(); 
    }

    counterDiv = createDiv('');
    counterDiv.class('counter');
}

function draw() {
    // Only toggle visibility when needed to prevent flickering
    for (let i = 0; i < images.length; i++) {
        if (i === currentIndex) {
            images[i].show();
        } else {
            images[i].hide();
        }
    }
    counterDiv.html("Fruits " + (currentIndex + 1) + " / 5");
}

function keyPressed() {
    if (keyCode === RIGHT_ARROW) {
        currentIndex = (currentIndex + 1) % images.length;
    } else if (keyCode === LEFT_ARROW) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
    }
}