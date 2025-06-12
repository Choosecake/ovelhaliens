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

    frameRate(60);

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
