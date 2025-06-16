let gameManager;
let assetLoader;

function preload() {
    assetLoader = new AssetLoader();
    assetLoader.preloadAssets();
}

function setup() {
    const container = select('#p5-canvas-container');
    const canvas = createCanvas(min(windowWidth * 0.8, SCREEN_WIDTH), min(windowHeight * 0.8, SCREEN_HEIGHT));
    canvas.parent(container);

	pixelDensity(1);
    frameRate(60);
	noCursor();

    gameManager = new GameManager(assetLoader);
    gameManager.initializeUI();
}

function draw() {
    for (let x = 0; x < width; x += assetLoader.getAsset('bgImg').width) {
        for (let y = 0; y < height; y += assetLoader.getAsset('bgImg').height) {
            image(assetLoader.getAsset('bgImg'), x, y);
        }
    }

    gameManager.updateGame();

	for (let i = allFallingWool.length - 1; i >= 0; i--) {
        let wool = allFallingWool[i];
        wool.update();
        if (wool.isFaded()) {
            allFallingWool.splice(i, 1);
        }
    }

    for (let i = 0; i < allFallingWool.length; i++) {
        allFallingWool[i].display();
    }

    image(assetLoader.getAsset('tesouraAbertaImg'), mouseX - 25, mouseY - 25, 50, 50);

	/*
    if (mouseIsPressed) {
        image(assetLoader.getAsset('tesouraFechadaImg'), mouseX, mouseY, 50, 50);
    } else {
        image(assetLoader.getAsset('tesouraAbertaImg'), mouseX, mouseY, 50, 50);
    }
	*/
}

function mouseClicked() {
    gameManager.handleMouseClick(mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(min(windowWidth * 0.8, SCREEN_WIDTH), min(windowHeight * 0.8, SCREEN_HEIGHT));
}

function spawnFallingWool(x, y, woolColor, sheepBodySize) {
    const numWoolPieces = floor(random(3, 7)); 
    for (let i = 0; i < numWoolPieces; i++) {
        if (allFallingWool.length < MAX_FALLING_WOOL_PIECES) {
            let woolX = x + random(-sheepBodySize / 4, sheepBodySize / 4);
            let woolY = y + random(-sheepBodySize / 4, sheepBodySize / 4);
            let woolSize = random(sheepBodySize * 0.1, sheepBodySize * 0.2); 
            allFallingWool.push(new FallingWool(woolX, woolY, woolColor, woolSize));
        } else {
            allFallingWool.shift();
            let woolX = x + random(-sheepBodySize / 4, sheepBodySize / 4);
            let woolY = y + random(-sheepBodySize / 4, sheepBodySize / 4);
            let woolSize = random(sheepBodySize * 0.3, sheepBodySize * 0.2);
            allFallingWool.push(new FallingWool(woolX, woolY, woolColor, woolSize));
        }
    }
}
