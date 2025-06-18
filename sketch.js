let gameManager;
let assetLoader;
let preRenderedBackground;
let currentBackgroundColor;
let tesouraFechada, tesouraAberta;
let behSnd, beh2Snd, beh3Snd, startGameSnd, shearSnd, shear2Snd, shear3Snd, shear4Snd;

function preload() {
    assetLoader = new AssetLoader();
    assetLoader.preloadAssets();
    tesouraAberta = assetLoader.getAsset('tesouraAbertaImg');
    tesouraFechada = assetLoader.getAsset('tesouraFechadaImg');
    behSnd = loadSound('assets/sounds/bah.mp3');
    beh2Snd = loadSound('assets/sounds/bah2.mp3');
    beh3Snd = loadSound('assets/sounds/bah3.mp3');
    startGameSnd = loadSound('assets/sounds/startgame.mp3');
    shearSnd = loadSound('assets/sounds/shear.mp3');
    shear2Snd = loadSound('assets/sounds/shear2.mp3');
    shear3Snd = loadSound('assets/sounds/shear3.mp3');
    shear4Snd = loadSound('assets/sounds/shear4.mp3');
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

    preRenderBackground();
}

function draw() {
    image(preRenderedBackground, 0, 0);

    gameManager.updateGame();

    for (let i = allFallingWool.length - 1; i >= 0; i--) {
        let wool = allFallingWool[i];
        wool.update();
        wool.display();
        if (wool.isFaded()) {
            allFallingWool.splice(i, 1);
        }
    }

    image(tesouraAberta, mouseX - 25, mouseY - 25, 48, 48);

    /*U
    if (!mouseIsPressed) {
    }
    else {
        image(tesouraFechada, mouseX - 25, mouseY - 25, 48, 48);
	return;
    }
    */

}

function mouseClicked() {
    gameManager.handleMouseClick(mouseX, mouseY);
}

function windowResized() {
    resizeCanvas(min(windowWidth * 0.8, SCREEN_WIDTH), min(windowHeight * 0.8, SCREEN_HEIGHT));
    preRenderBackground(currentBackgroundColor);
}

function preRenderBackground(colorToUse = null) {
    preRenderedBackground = createGraphics(width, height);
    preRenderedBackground.pixelDensity(1);

    if (colorToUse === null) {
        currentBackgroundColor = color(random(255), random(255), random(255));
    } else {
        currentBackgroundColor = colorToUse;
    }
    
    preRenderedBackground.background(currentBackgroundColor);
    
    let bgImg = assetLoader.getAsset('bgImg');
    
    preRenderedBackground.tint(255, 100);
    
    for (let x = 0; x < width; x += bgImg.width) {
        for (let y = 0; y < height; y += bgImg.height) {
            preRenderedBackground.image(bgImg, x, y);
        }
    }
    
    preRenderedBackground.noTint(); 
}

function spawnFallingWool(x, y, baseWoolImage, tintColor, sheepBodySize) { 
    const numWoolPieces = floor(random(3, 7)); 
    for (let i = 0; i < numWoolPieces; i++) {
        if (allFallingWool.length < MAX_FALLING_WOOL_PIECES) {
            let woolX = x + random(-sheepBodySize / 4, sheepBodySize / 4);
            let woolY = y + random(-sheepBodySize / 4, sheepBodySize / 4);
            let woolSize = random(sheepBodySize * 0.1, sheepBodySize * 0.2); 
            allFallingWool.push(new FallingWool(woolX, woolY, baseWoolImage, tintColor, woolSize)); 
        } else {
            allFallingWool.shift();
            let woolX = x + random(-sheepBodySize / 4, sheepBodySize / 4);
            let woolY = y + random(-sheepBodySize / 4, sheepBodySize / 4);
            let woolSize = random(sheepBodySize * 0.3, sheepBodySize * 0.2);
            allFallingWool.push(new FallingWool(woolX, woolY, baseWoolImage, tintColor, woolSize));
        }
    }
}
