class FallingWool {
    constructor(x, y, baseWoolImage, tintColor, size) {
        this.pos = createVector(x, y);
		this.baseWoolImage = baseWoolImage;
        this.tintColor = tintColor;
        this.size = size;
        this.alpha = 255;
        this.velocity = createVector(random(-1, 1), random(1, 3));
        this.gravity = 0.1;
        this.rotation = random(TWO_PI);
        this.rotationSpeed = random(-0.05, 0.05);
    }

    update() {
        this.velocity.y += this.gravity;
        this.pos.add(this.velocity);

        this.alpha -= 5;
        this.size *= 0.98;
        this.rotation += this.rotationSpeed;
    }

	display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        
        tint(this.tintColor.levels[0], this.tintColor.levels[1], this.tintColor.levels[2], this.alpha);
        
        image(this.baseWoolImage, 0, 0, this.size, this.size);
        pop(); 
    }

    isFaded() {
        return this.alpha <= 0;
    }
}
