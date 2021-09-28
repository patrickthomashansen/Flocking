class Prey extends Agent {

    MATE_DELAY = 500;

    constructor(x, y) {
        super(x, y);
        this.color = [0, 0, 255];
        this.maxSpeed = 5;
        this.desiredSeparation = 50;
        this.detectionRadius = 100;
        this.detectedPredators = [];
    }

    interact() {
        this.attemptEat(FOOD);
        this.attemptMate(PREY);
        this.age(0.001);
    }

    move(canvas) {
        this.applyThrust();
        this.applySeparation(PREY, 200);
        this.applyAlignment(PREY, 0.025);
        this.applyCohesion(PREY, 0.005);
        this.applyFlee(PREDATOR, 0.005);
        this.applyAttack(FOOD, 0.25);
        this.applyBoundaries(canvas.width, canvas.height);
        this.updatePos();
    }

    draw(ctx) {
        // this.renderTail(ctx);
        // this.renderDetectionBounds(ctx);
        this.render(ctx);
    }
}
