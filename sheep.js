class Sheep {
    constructor(assetLoader) {
        this.assetLoader = assetLoader;
        this.reset();
    }

    reset() {
        this.state = APPEARING;
        this.pos = createVector(width / 2, height + 50);
        this.targetPos = createVector(random(50, width - 50), random(50, height - 150));
        this.speed = 4.5;
        this.woolHealth = floor(random(5, 10));
        this.initialWoolHealth = this.woolHealth;
        this.isSheared = false;
        this.bodySize = SHEEP_BODY_SIZE;
        this.displaySize = this.bodySize;
        this.hoverScale = 1.1;

        this.flipped = random() < 0.5;

        this.sheepType = SHEEP_TYPES[floor(random(0, SHEEP_TYPES.length))];
		this.baseFallingWoolImage = this.assetLoader.getAsset('peloBrancoImg');

		this.woolColorForFallingPieces = color(255);

        this.jumpHeight = 0;
        this.initialJumpY = 0;
        this.jumpVelocity = 0;
        this.gravity = 0.3;
        this.jumpForce = -7;
        this.canJump = true;
        this.timeSinceLastJump = 0;
        this.jumpInterval = random(180, 300);

        switch (this.sheepType) {
            case 'padrao':
                this.image = this.assetLoader.getAsset('ovelhaPadraoImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
				this.woolColorForFallingPieces = color(255);
                break;
            case 'alien':
                this.image = this.assetLoader.getAsset('ovelhaAlienImg');
                this.peladaImage = this.assetLoader.getAsset('alienPeladaImg');
				this.woolColorForFallingPieces = color(51, 204, 51);
                break;
            case 'cafezinho':
                this.image = this.assetLoader.getAsset('ovelhaCafezinhoImg');
                this.peladaImage = this.assetLoader.getAsset('cafezinhoPeladaImg');
				this.woolColorForFallingPieces = color(255);
                break;
            case 'cervejinha':
                this.image = this.assetLoader.getAsset('ovelhaCervejinhaImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
				this.woolColorForFallingPieces = color(255, 255, 0);
                break;
            case 'cogumelita':
                this.image = this.assetLoader.getAsset('ovelhaCogumelitaImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
				this.woolColorForFallingPieces = color(255);
                break;
            case 'docinho':
                this.image = this.assetLoader.getAsset('ovelhaDocinhoImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
				this.woolColorForFallingPieces = color(255, 0, 191);
                break;
            case 'moranguinho':
                this.image = this.assetLoader.getAsset('ovelhaMoranguinhoImg');
                this.peladaImage = this.assetLoader.getAsset('moranguinhoPeladaImg');
				this.woolColorForFallingPieces = color(255, 0, 60);
                break;
            case 'sorvetinho':
                this.image = this.assetLoader.getAsset('ovelhaSorvetinhoImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
				this.woolColorForFallingPieces = color(255, 190, 0);
                break;
            case 'trevosa':
                this.image = this.assetLoader.getAsset('ovelhaTrevosaImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
				this.woolColorForFallingPieces = color(0);
                break;
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y + this.jumpHeight);

        if (this.flipped) {
            scale(-1, 1);
        }

        if (this.isSheared) {
            image(this.peladaImage, -this.displaySize / 2, -this.displaySize / 2, this.displaySize, this.displaySize);
        } else {
            image(this.image, -this.displaySize / 2, -this.displaySize / 2, this.displaySize, this.displaySize);
        }

        pop();
    }

    update() {
        if (this.state === APPEARING) {
            let distance = p5.Vector.dist(this.pos, this.targetPos);
            if (distance > this.speed) {
                this.pos.add(p5.Vector.sub(this.targetPos, this.pos).normalize().mult(this.speed));
            } else {
                this.pos = this.targetPos;
                this.state = ACTIVE;
                this.initialJumpY = this.pos.y;
            }
        } else if (this.state === ACTIVE || this.state === JUMPING_UP || this.state === JUMPING_DOWN) {
            this.timeSinceLastJump++;
            if (this.canJump && this.timeSinceLastJump >= this.jumpInterval) {
                this.startJump();
                this.timeSinceLastJump = 0;
                this.jumpInterval = random(100, 250);
            }

            if (this.state === JUMPING_UP || this.state === JUMPING_DOWN) {
                this.jumpVelocity += this.gravity;
                this.jumpHeight += this.jumpVelocity;

                if (this.jumpHeight >= 0) {
                    this.jumpHeight = 0;
                    this.jumpVelocity = 0;
                    this.state = ACTIVE;
                    this.canJump = true;
                }
            }
        } else if (this.state === LEAVING) {
            if (this.flipped) {
                this.targetPos = createVector(width + this.bodySize * 2, this.pos.y);
            } else {
                this.targetPos = createVector(-this.bodySize * 2, this.pos.y);
            }

            let distance = p5.Vector.dist(this.pos, this.targetPos);
            if (distance > this.speed) {
                this.pos.add(p5.Vector.sub(this.targetPos, this.pos).normalize().mult(this.speed));
            } else {
                return true;
            }
        }
        return false;
    }

    startJump() {
        if (this.state === ACTIVE) {
            this.jumpVelocity = this.jumpForce;
            this.canJump = false;
            this.state = JUMPING_UP;
        }
    }

    shear() {
        if (this.woolHealth > 0 && this.state === ACTIVE) {
            this.woolHealth--;
            spawnFallingWool(this.pos.x, this.pos.y + this.jumpHeight, this.baseFallingWoolImage, this.woolColorForFallingPieces, this.bodySize * 1.25); 
            if (this.woolHealth <= 0) {
                this.isSheared = true;
                this.state = LEAVING;
                this.displaySize = this.bodySize;
                return true;
            }
        }
        return false;
    }

    isMouseOver() {
        let halfSize = this.displaySize / 2;
        let left = this.pos.x - halfSize;
        let right = this.pos.x + halfSize;
        let top = this.pos.y - halfSize + this.jumpHeight;
        let bottom = this.pos.y + halfSize + this.jumpHeight;

        return mouseX > left && mouseX < right && mouseY > top && mouseY < bottom;
    }

    handleHover() {
        let targetSize = this.bodySize;
        if (this.isMouseOver()) {
            targetSize = this.bodySize * this.hoverScale;
        }
        this.displaySize = lerp(this.displaySize, targetSize, 0.1);
    }
}
