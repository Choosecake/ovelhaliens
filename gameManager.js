class GameManager {
    constructor(assetLoader) {
        this.assetLoader = assetLoader;
        this.score = 0;
        this.timer = INITIAL_TIMER;
        this.gameStarted = false;
        this.gameOver = false;
        this.gameInterval = null;
        this.sheepArray = [];
        this.highScore = 0; // Nova propriedade para armazenar a pontuação máxima

        this.scoreDisplay = null;
        this.timerDisplay = null;
        this.startOverlay = null;
        this.startButton = null;
        this.gameOverOverlay = null;
        this.finalScoreDisplay = null;
        this.restartButton = null;
    }

    initializeUI() {
        this.scoreDisplay = select('#score-display');
        this.timerDisplay = select('#timer-display');
        this.startOverlay = select('#game-start-overlay');
        this.startButton = select('#start-button');
        this.gameOverOverlay = select('#game-over-overlay');
        this.finalScoreDisplay = select('#final-score');
        this.restartButton = select('#restart-button');

        this.startButton.mousePressed(() => this.startGame());
        this.restartButton.mousePressed(() => this.restartGame());
    }

    startGame() {
        this.gameStarted = true;
        this.gameOver = false;
        this.score = 0;
        this.timer = INITIAL_TIMER;
        startGameSnd.play();

        this.sheepArray = [];
        for (let i = 0; i < MAX_SHEEP; i++) {
            this.sheepArray.push(new Sheep(this.assetLoader));
        }

        this.updateScoreDisplay();
        this.updateTimerDisplay();
        this.startOverlay.addClass('hidden');
        this.gameOverOverlay.addClass('hidden');

        if (this.gameInterval) {
            clearInterval(this.gameInterval);
        }
        this.gameInterval = setInterval(() => {
            this.timer--;
            this.updateTimerDisplay();
            if (this.timer <= 0) {
                this.endGame();
            }
        }, 1000);
    }

    endGame() {
        this.gameOver = true;
        clearInterval(this.gameInterval);
        // Verifica se a pontuação atual é maior que a pontuação máxima registrada
        if (this.score > this.highScore) {
            this.highScore = this.score; // Atualiza a pontuação máxima
        }
        this.finalScoreDisplay.html(`Maior Pontuação: ${this.highScore}`); // Exibe a maior pontuação
        this.gameOverOverlay.removeClass('hidden');
    }

    restartGame() {
        this.gameOverOverlay.addClass('hidden');
        this.startGame();
    }

    updateScoreDisplay() {
        this.scoreDisplay.html(`Pontuação: ${this.score}`);
    }

    updateTimerDisplay() {
        this.timerDisplay.html(`Tempo: ${max(0, this.timer)}`);
    }

    updateGame() {
        if (this.gameStarted && !this.gameOver) {
            for (let i = this.sheepArray.length - 1; i >= 0; i--) {
                let currentSheep = this.sheepArray[i];
                if (currentSheep.state === ACTIVE) {
                    currentSheep.handleHover();
                }
                if (currentSheep.update()) {
                    this.sheepArray.splice(i, 1);
                } else {
                    currentSheep.display();
                }
            }

            if (this.sheepArray.length < MAX_SHEEP && frameCount % 60 === 0) {
                this.sheepArray.push(new Sheep(this.assetLoader));
            }
        } else if (this.gameOver) {
            for (let i = 0; i < this.sheepArray.length; i++) {
                this.sheepArray[i].display();
            }
        }
    }

    handleMouseClick(mouseX, mouseY) {
        if (!this.gameStarted || this.gameOver) return;

        for (let i = 0; i < this.sheepArray.length; i++) {
            let currentSheep = this.sheepArray[i];
            if (dist(mouseX, mouseY, currentSheep.pos.x, currentSheep.pos.y) < 40 && !currentSheep.isSheared && currentSheep.state === ACTIVE) {
                if (currentSheep.shear()) {
                    this.score += currentSheep.initialWoolHealth;
                    this.updateScoreDisplay();
                }
            }
        }
    }
}