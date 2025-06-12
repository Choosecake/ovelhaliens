let screenWidth = 500;
let screenHeight = 500;
let sheepArray = [];
let maxSheep = 3;
let score = 0;
let timer = 60;
let gameStarted = false;
let gameOver = false;
let gameInterval;

let scoreDisplay;
let timerDisplay;
let startOverlay;
let startButton;
let gameOverOverlay;
let finalScoreDisplay;
let restartButton;

let tesouraAbertaImg, tesouraFechadaImg;
let ovelhaPadraoImg, ovelhaAlienImg, ovelhaCafezinhoImg, ovelhaCervejinhaImg, ovelhaCogumelitaImg, ovelhaDocinhoImg, ovelhaMoranguinhoImg, ovelhaSorvetinhoImg, ovelhaTrevosaImg;
let ovelhaPeladaImg, alienPeladaImg, cafezinhoPeladaImg, moranguinhoPeladaImg;
let peloAmareloImg, peloAzulImg, peloBrancoImg, peloCinzaImg, peloRosaImg, peloVerdeImg;
let bgImg;

const APPEARING = 0;
const ACTIVE = 1;
const LEAVING = 2;

const type = ['padrao', 'alien', 'cafezinho', 'cervejinha', 'cogumelita', 'docinho', 'moranguinho', 'sorvetinho', 'trevosa'];

class Sheep {
    constructor() {
        this.reset();
    }

    reset() {
        this.state = APPEARING;
        this.pos = createVector(width / 2, height + 50); 
        this.targetPos = createVector(random(50, width - 50), random(50, height - 150)); 
        this.speed = 3;
        this.woolHealth = 5;
        this.isSheared = false;
        this.bodySize = 1024/8;
        this.image = ovelhaPadraoImg;
        this.peladaImage = ovelhaPeladaImg;
		this.sheepType = type[floor(random(0, type.length))];
		this.woolColor = peloBrancoImg;  

		switch (this.sheepType) {
			case 'padrao':
				this.woolColor = peloBrancoImg;
				this.image = ovelhaPadraoImg;
				this.peladaImage = ovelhaPeladaImg;
				break;
			case 'alien':
				this.woolColor = peloVerdeImg
				this.image = ovelhaAlienImg;
				this.peladaImage = alienPeladaImg;
				break;
			case 'cafezinho':
				this.woolColor = peloCinzaImg
				this.image = ovelhaCafezinhoImg;
				this.peladaImage = cafezinhoPeladaImg;
				break;
			case 'cervejinha':
				this.woolColor = peloAmareloImg;
				this.image = ovelhaCervejinhaImg;
				this.peladaImage = ovelhaPeladaImg;
				break;
			case 'cogumelita':
				this.woolColor = peloBrancoImg;
				this.image = ovelhaCogumelitaImg;
				this.peladaImage = ovelhaPeladaImg;
				break;
			case 'docinho':
				this.woolColor = peloRosaImg;
				this.image = ovelhaDocinhoImg;
				this.peladaImage = ovelhaPeladaImg;
				break;
			case 'moranguinho':
				this.woolColor = peloRosaImg;
				this.image = ovelhaMoranguinhoImg;
				this.peladaImage = moranguinhoPeladaImg;
				break;
			case 'sorvetinho':
				this.woolColor = peloBrancoImg;
				this.image = ovelhaSorvetinhoImg;
				this.peladaImage = ovelhaPeladaImg;
				break;
			case 'trevosa':
				this.woolColor = peloCinzaImg;
				this.image = ovelhaTrevosaImg;
				this.peladaImage = ovelhaPeladaImg;
				break;
		}
    }

    display() {
        if (this.isSheared) {
            image(this.peladaImage, this.pos.x - this.bodySize / 2, this.pos.y - this.bodySize / 2, this.bodySize, this.bodySize);
        } else {
            image(this.image, this.pos.x - this.bodySize / 2, this.pos.y - this.bodySize / 2, this.bodySize, this.bodySize);
        }
    }

    update() {
        if (this.state === APPEARING) {
            let distance = p5.Vector.dist(this.pos, this.targetPos);
            if (distance > this.speed) {
                this.pos.add(p5.Vector.sub(this.targetPos, this.pos).normalize().mult(this.speed));
            } else {
                this.pos = this.targetPos;
                this.state = ACTIVE;
            }
        } else if (this.state === LEAVING) {
            this.targetPos = createVector(-this.bodySize * 2, this.pos.y); 
            let distance = p5.Vector.dist(this.pos, this.targetPos);
            if (distance > this.speed) {
                this.pos.add(p5.Vector.sub(this.targetPos, this.pos).normalize().mult(this.speed));
            } else {
                return true;
            }
        }
        return false;
    }

    shear() {
        if (this.woolHealth > 0 && this.state === ACTIVE) {
            this.woolHealth--;
            if (this.woolHealth <= 0) {
                this.isSheared = true;
                score += 10;
                updateScoreDisplay();
                this.state = LEAVING;
                this.targetPos = createVector(-this.bodySize * 2, this.pos.y);
            }
        }
    }
}

function preload() {
    tesouraAbertaImg = loadImage('assets/tesouraAberta.png');
    tesouraFechadaImg = loadImage('assets/tesouraFechada.png');
    ovelhaPadraoImg = loadImage('assets/ovelhaPadrao.png');
    ovelhaAlienImg = loadImage('assets/ovelhaAlien.png');
    ovelhaCafezinhoImg = loadImage('assets/ovelhaCafezinho.png');
    ovelhaCervejinhaImg = loadImage('assets/ovelhaCervejinha.png');
    ovelhaCogumelitaImg = loadImage('assets/ovelhaCogumelita.png');
    ovelhaDocinhoImg = loadImage('assets/ovelhaDocinho.png');
    ovelhaMoranguinhoImg = loadImage('assets/ovelhaMoranguinho.png');
    ovelhaSorvetinhoImg = loadImage('assets/ovelhaSorvetinho.png');
    ovelhaTrevosaImg = loadImage('assets/ovelhaTrevosa.png');

    ovelhaPeladaImg = loadImage('assets/ovelhaPelada.png');
    alienPeladaImg = loadImage('assets/alienPelada.png');
    cafezinhoPeladaImg = loadImage('assets/cafezinhoPelada.png');
    moranguinhoPeladaImg = loadImage('assets/moranguinhoPelada.png');

    peloAmareloImg = loadImage('assets/peloAmarelo.png');
    peloAzulImg = loadImage('assets/peloAzul.png');
    peloBrancoImg = loadImage('assets/peloBranco.png');
    peloCinzaImg = loadImage('assets/peloCinza.png');
    peloRosaImg = loadImage('assets/peloRosa.png');
    peloVerdeImg = loadImage('assets/peloVerde.png');

    bgImg = loadImage('assets/grass.png');
}

function setup() {
    const container = select('#p5-canvas-container');
    const canvas = createCanvas(min(windowWidth * 0.8, screenWidth), min(windowHeight * 0.8, screenHeight));
    canvas.parent(container);

    //noCursor();

    for (let i = 0; i < maxSheep; i++) {
        sheepArray.push(new Sheep());
    }

    scoreDisplay = select('#score-display');
    timerDisplay = select('#timer-display');
    startOverlay = select('#game-start-overlay');
    startButton = select('#start-button');
    gameOverOverlay = select('#game-over-overlay');
    finalScoreDisplay = select('#final-score');
    restartButton = select('#restart-button');

    startButton.mousePressed(startGame);
    restartButton.mousePressed(restartGame);
}

function draw() {
    //background(50, 200, 75);
	for (let x = 0; x < width; x += bgImg.width) {
    	for (let y = 0; y < height; y += bgImg.height) {
      		image(bgImg, x, y);
		}
	}

    if (gameStarted && !gameOver) {
        for (let i = sheepArray.length - 1; i >= 0; i--) {
            if (sheepArray[i].update()) { 
                sheepArray.splice(i, 1); 
            } else {
                sheepArray[i].display();
            }
        }

        if (sheepArray.length < maxSheep && frameCount % 60 === 0) { 
            sheepArray.push(new Sheep());
        }
    } else if (gameOver) {
        for (let i = 0; i < sheepArray.length; i++) {
            sheepArray[i].display();
        }
    }

	/*
    if (mouseIsPressed) {
        image(tesouraFechadaImg, mouseX, mouseY, 50, 50);
    } else {
        image(tesouraAbertaImg, mouseX, mouseY, 50, 50);
    }
	*/
}

function mouseClicked() {
    if (!gameStarted || gameOver) return;

    for (let i = 0; i < sheepArray.length; i++) {
        let currentSheep = sheepArray[i];
        if (dist(mouseX, mouseY, currentSheep.pos.x, currentSheep.pos.y) < 40 && !currentSheep.isSheared && currentSheep.state === ACTIVE) {
            currentSheep.shear();
        }
    }
}

function updateScoreDisplay() {
    scoreDisplay.html(`Score: ${score}`);
}

function updateTimerDisplay() {
    timerDisplay.html(`Time: ${max(0, timer)}`);
}

function startGame() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    timer = 60;

    sheepArray = [];
    for (let i = 0; i < maxSheep; i++) {
        sheepArray.push(new Sheep());
    }

    updateScoreDisplay();
    updateTimerDisplay();
    startOverlay.addClass('hidden');
    gameOverOverlay.addClass('hidden');

    // Ensure previous interval is cleared before starting a new one
    if (gameInterval) {
        clearInterval(gameInterval);
    }
    gameInterval = setInterval(() => {
        timer--;
        updateTimerDisplay();
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameOver = true;
    clearInterval(gameInterval);
    finalScoreDisplay.html(`Your Score: ${score}`);
    gameOverOverlay.removeClass('hidden');
}

function restartGame() {
    gameOverOverlay.addClass('hidden');
    startGame();
}

function windowResized() {
    resizeCanvas(min(windowWidth * 0.8, screenWidth), min(windowHeight * 0.8, screenHeight));
}

