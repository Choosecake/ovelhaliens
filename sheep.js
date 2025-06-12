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

        this.flipped = random() < 0.5;

        this.sheepType = SHEEP_TYPES[floor(random(0, SHEEP_TYPES.length))];
        this.woolColor = this.assetLoader.getAsset('peloBrancoImg');

        switch (this.sheepType) {
            case 'padrao':
                this.woolColor = this.assetLoader.getAsset('peloBrancoImg');
                this.image = this.assetLoader.getAsset('ovelhaPadraoImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
                break;
            case 'alien':
                this.woolColor = this.assetLoader.getAsset('peloVerdeImg');
                this.image = this.assetLoader.getAsset('ovelhaAlienImg');
                this.peladaImage = this.assetLoader.getAsset('alienPeladaImg');
                break;
            case 'cafezinho':
                this.woolColor = this.assetLoader.getAsset('peloCinzaImg');
                this.image = this.assetLoader.getAsset('ovelhaCafezinhoImg');
                this.peladaImage = this.assetLoader.getAsset('cafezinhoPeladaImg');
                break;
            case 'cervejinha':
                this.woolColor = this.assetLoader.getAsset('peloAmareloImg');
                this.image = this.assetLoader.getAsset('ovelhaCervejinhaImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
                break;
            case 'cogumelita':
                this.woolColor = this.assetLoader.getAsset('peloBrancoImg');
                this.image = this.assetLoader.getAsset('ovelhaCogumelitaImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
                break;
            case 'docinho':
                this.woolColor = this.assetLoader.getAsset('peloRosaImg');
                this.image = this.assetLoader.getAsset('ovelhaDocinhoImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
                break;
            case 'moranguinho':
                this.woolColor = this.assetLoader.getAsset('peloRosaImg');
                this.image = this.assetLoader.getAsset('ovelhaMoranguinhoImg');
                this.peladaImage = this.assetLoader.getAsset('moranguinhoPeladaImg');
                break;
            case 'sorvetinho':
                this.woolColor = this.assetLoader.getAsset('peloBrancoImg');
                this.image = this.assetLoader.getAsset('ovelhaSorvetinhoImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
                break;
            case 'trevosa':
                this.woolColor = this.assetLoader.getAsset('peloCinzaImg');
                this.image = this.assetLoader.getAsset('ovelhaTrevosaImg');
                this.peladaImage = this.assetLoader.getAsset('ovelhaPeladaImg');
                break;
        }
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);

        if (this.flipped) {
            scale(-1, 1);
        }

        if (this.isSheared) {
            image(this.peladaImage, -this.bodySize / 2, -this.bodySize / 2, this.bodySize, this.bodySize);
        } else {
            image(this.image, -this.bodySize / 2, -this.bodySize / 2, this.bodySize, this.bodySize);
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

    shear() {
        if (this.woolHealth > 0 && this.state === ACTIVE) {
            this.woolHealth--;
            if (this.woolHealth <= 0) {
                this.isSheared = true;
                this.state = LEAVING;
				return true;
            }
        }
		return false;
    }
}
