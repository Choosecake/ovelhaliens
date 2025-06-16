class FallingWool {
    constructor(x, y, woolColor, size) {
        this.pos = createVector(x, y);
        this.woolColor = woolColor;
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
        tint(255, this.alpha);
        imageMode(CENTER);
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        image(this.woolColor, 0, 0, this.size, this.size);
        pop();
    }

    isFaded() {
        return this.alpha <= 0;
    }
}
