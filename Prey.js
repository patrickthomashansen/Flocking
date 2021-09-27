class Prey extends Agent {

    FLEE_FORCE = 0.005;

    constructor(x, y) {
        super(x, y);
        this.color = [0, 0, 255];
        this.maxSpeed = 5;
        this.desiredSeparation = 50;
        this.detectionRadius = 100;
        this.detectedPredators = [];
    }

    update(agents, canvas, ctx) {
        this.detectAgents(agents);
        this.applyThrust();
        this.applySeparation(PREY, this.SEPARATION_FORCE);
        this.applyAlignment(PREY, this.ALIGNMENT_FORCE);
        this.applyCohesion(PREY, this.COHESION_FORCE);
        this.applyFlee(PREDATOR, this.FLEE_FORCE);
        this.applyBoundaries(canvas.width, canvas.height);
        this.updatePos();
        // this.renderTail(ctx);
        // this.renderDetectionBounds(ctx);
        this.render(ctx);
    } 
}
