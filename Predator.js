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
        this.attemptEat(PREY, EAT_DELAY);
        this.attemptMate(PREDATOR, PREDATOR_MATE_DELAY);
        this.age(AGE_DAMAGE);
    }

    move(canvas) {
        this.applyThrust(THRUST_FORCE);
        this.applySeparation(PREDATOR, SEPARATION_FORCE);
        this.applyAlignment(PREDATOR, ALIGNMENT_FORCE);
        this.applyCohesion(PREDATOR, COHESION_FORCE);
        this.applyAttack(PREY, PREDATOR_ATTACK_FORCE);
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
