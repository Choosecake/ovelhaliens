class GameManager {
    constructor(assetLoader) {
        this.assetLoader = assetLoader;
        this.score = 0;
        this.timer = INITIAL_TIMER;
        this.gameStarted = false;
        this.gameOver = false;
        this.gameInterval = null;
        this.sheepArray = [];
        this.highScore = 0;
        this.collectedItems = new Set();
        this.newlyConqueredItemsThisRound = new Set(); // NOVO: Para itens conquistados APENAS nesta rodada

        this.scoreDisplay = null;
        this.timerDisplay = null;
        this.startOverlay = null;
        this.startButton = null;
        this.gameOverOverlay = null;
        this.finalScoreDisplay = null;
        this.restartButton = null;
        this.collectionButton = null;
        this.collectionModal = null;
        this.collectionContent = null;
        this.closeCollectionButton = null;
        this.conqueredItemsGrid = null;

        this.collectedItems.add('básica');
    }

    initializeUI() {
        this.scoreDisplay = select('#score-display');
        this.timerDisplay = select('#timer-display');
        this.startOverlay = select('#game-start-overlay');
        this.startButton = select('#start-button');
        this.gameOverOverlay = select('#game-over-overlay');
        this.finalScoreDisplay = select('#final-score');
        this.restartButton = select('#restart-button');
        this.collectionButton = select('#collection-button');
        this.collectionModal = select('#collection-modal');
        this.collectionContent = select('#collection-content');
        this.closeCollectionButton = select('#close-collection-modal');
        this.conqueredItemsGrid = select('#conquered-items-grid');

        this.startButton.mousePressed(() => this.startGame());
        this.restartButton.mousePressed(() => this.restartGame());
        this.collectionButton.mousePressed(() => this.openCollectionModal());
        this.closeCollectionButton.mousePressed(() => this.closeCollectionModal());
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
        this.collectionButton.addClass('hidden');
        this.conqueredItemsGrid.html('');
        this.newlyConqueredItemsThisRound.clear(); // NOVO: Limpa os novos itens desta rodada

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

        const oldHighScore = this.highScore; // Guarda a high score anterior

        if (this.score > this.highScore) {
            this.highScore = this.score;
        }

        // NOVO: Verifica e adiciona *apenas* novos itens conquistados nesta rodada
        COLLECTION_ITEMS.forEach(item => {
            if (this.highScore >= item.scoreRequired) {
                // Se o item não estava na coleção ANTES e agora está, é um item novo para esta rodada
                if (!this.collectedItems.has(item.name)) {
                    this.newlyConqueredItemsThisRound.add(item.name);
                }
                this.collectedItems.add(item.name); // Adiciona à coleção geral
            }
        });

        this.finalScoreDisplay.html(`Maior Pontuação: ${this.highScore}`);
        this.gameOverOverlay.removeClass('hidden');
        this.collectionButton.removeClass('hidden');
        this.displayConqueredItemsOnGameOver();
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

    openCollectionModal() {
        this.renderCollectionItems();
        this.collectionModal.removeClass('hidden');
    }

    closeCollectionModal() {
        this.collectionModal.addClass('hidden');
    }

    renderCollectionItems() {
        this.collectionContent.html(''); 

        COLLECTION_ITEMS.forEach(item => {
            const isCollected = this.collectedItems.has(item.name);
            const itemDiv = createDiv('');
            itemDiv.addClass('collection-item flex flex-col items-center p-2 rounded-lg');
            itemDiv.style('opacity', isCollected ? '1' : '0.3'); 

            const imagePath = `assets/${item.image}`; 
            
            const imgElement = createImg(imagePath, item.name); 
            imgElement.addClass('w-24 h-24 mb-2 object-contain');
            itemDiv.child(imgElement);
            
            imgElement.elt.onerror = () => {
                console.error(`Falha ao carregar a imagem da coleção: ${imagePath}. Verifique o nome do arquivo e o caminho.`);
                imgElement.remove();
                const errorPlaceholder = createP(`Falha: ${item.name}`);
                errorPlaceholder.addClass('w-24 h-24 mb-2 text-red-500 flex items-center justify-center text-center text-sm');
                itemDiv.child(errorPlaceholder);
            };

            const itemName = createP(item.name);
            itemName.addClass('text-lg font-bold text-gray-800 capitalize');
            itemDiv.child(itemName);

            const scoreText = createP(`Pontos: ${item.scoreRequired}`);
            scoreText.addClass('text-sm text-gray-600');
            itemDiv.child(scoreText);

            this.collectionContent.child(itemDiv);
        });
    }

    displayConqueredItemsOnGameOver() {
        this.conqueredItemsGrid.html('');

        // NOVO: Usa a lista de itens *novos* conquistados nesta rodada
        const newConqueredThisRound = COLLECTION_ITEMS.filter(item => this.newlyConqueredItemsThisRound.has(item.name));

        if (newConqueredThisRound.length > 0) {
            const heading = createP('Novos Itens Conquistados:'); // NOVO: Título para os novos itens
            heading.addClass('text-lg font-bold text-white mb-2'); // Tailwind classes
            this.conqueredItemsGrid.child(heading);

            newConqueredThisRound.forEach(item => {
                const imagePath = `assets/${item.image}`;
                const imgElement = createImg(imagePath, item.name);
                imgElement.addClass('conquered-item-thumbnail');
                this.conqueredItemsGrid.child(imgElement);

                imgElement.elt.onerror = () => {
                    console.error(`Falha ao carregar miniatura: ${imagePath}`);
                    imgElement.remove();
                    const placeholder = createP('❓');
                    placeholder.addClass('w-10 h-10 flex items-center justify-center bg-gray-600 text-white rounded text-xs');
                    this.conqueredItemsGrid.child(placeholder);
                };
            });
        } else {
            const noItemsText = createP('Nenhum item novo conquistado nesta rodada.');
            noItemsText.addClass('text-base text-gray-300 mt-2');
            this.conqueredItemsGrid.child(noItemsText);
        }
    }
}