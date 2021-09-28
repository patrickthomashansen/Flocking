class Predator extends Agent {

    constructor(x, y) {
        super(x, y);
        this.type = PREDATOR;
        this.color = [255, 0, 0];
        this.size = 20;
        this.maxSpeed = 3;
        this.desiredSeparation = 100;
        this.detectionRadius = 400;
        this.detectionAngle = Math.PI / 4;
        this.detectedPrey = [];
    }

    interact() {
        this.attemptEat(PREY);
        this.attemptMate(this.type);
        this.age(0.001);
    }

    move(canvas) {
        this.applyThrust();
        this.applySeparation(this.type, 200);
        this.applyAlignment(this.type, 0.025);
        this.applyCohesion(this.type, 0.005);
        this.applyAttack(PREY, 0.5);
        this.applyBoundaries(canvas.width, canvas.height);
        this.updatePos();
    }

    draw(ctx) {
        // this.renderTail(ctx);
        // this.renderDetectionBounds(ctx);
        this.render(ctx);
    }
}
