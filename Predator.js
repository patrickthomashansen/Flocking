class Predator extends Agent {

    ATTACK_FORCE = 0.1;
    THRUST_FORCE = 0;

    constructor(x, y) {
        super(x, y);
        this.color = [255, 0, 0];
        this.size = 20;
        this.maxSpeed = 3;
        this.desiredSeparation = 100;
        this.detectionRadius = 400;
        this.detectionAngle = Math.PI / 4;
        this.detectedPrey = [];
    }

    update(agents, canvas, ctx) {
        this.detectAgents(agents);
        this.applyThrust();
        this.applySeparation(PREDATOR, this.SEPARATION_FORCE);
        this.applyAttack(PREY, this.ATTACK_FORCE);
        this.applyBoundaries(canvas.width, canvas.height);
        this.updatePos();
        this.renderTail(ctx);
        // this.renderDetectionBounds(ctx);
        this.render(ctx);
    } 
}
