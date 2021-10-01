class Prey extends Agent {

    constructor(x, y) {
        super(x, y);
        this.color = [0, 0, 255];
        this.maxSpeed = 5;
        this.desiredSeparation = 50;
        this.detectionRadius = 100;
        this.detectedPredators = [];
    }

    interact() {
        this.attemptEat(FOOD, EAT_DELAY);
        this.attemptMate(PREY, PREY_MATE_DELAY);
        this.age(AGE_DAMAGE);
    }

    move(canvas) {
        this.applyThrust(THRUST_FORCE);
        this.applySeparation(PREY, SEPARATION_FORCE);
        this.applyAlignment(PREY, ALIGNMENT_FORCE);
        this.applyCohesion(PREY, COHESION_FORCE);
        this.applyFlee(PREDATOR, FLEE_FORCE);
        this.applyAttack(FOOD, PREY_ATTACK_FORCE);
        this.applyBoundaries(canvas.width, canvas.height);
        // this.updateTail();
        this.updatePos();
    }

    draw(ctx) {
        // this.renderTail(ctx);
        // this.renderDetectionBounds(ctx);
        this.render(ctx);
    }
}
