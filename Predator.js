class Predator extends Agent {

    constructor(x, y) {
        super(x, y);
        this.color = [255, 0, 0];
        this.size = 20;
        this.maxSpeed = 4;
        this.desiredSeparation = 100;
        this.detectionRadius = 200;
        this.detectionAngle = Math.PI / 2;
        this.detectedPrey = [];
    }

    interact() {
        this.attemptEat(PREY);
        this.attemptMate(PREDATOR);
        this.age(0.001);
    }

    move(canvas) {
        this.applyThrust();
        this.applySeparation(PREDATOR, 200);
        this.applyAlignment(PREDATOR, 0.025);
        this.applyCohesion(PREDATOR, 0.005);
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
