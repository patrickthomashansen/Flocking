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

    detectPredators(agents) {
        this.detectedPredators = [];
        this.detect(agents, this.detectedPredators);
    }

    applyFlee(agents) {
        let sum = new Vector();
        for (let i = 0; i < this.detectedPredators.length; i++) {
            sum.add(this.detectedPredators[i].pos);
        }
        if (sum.magSq() > 0) {
            sum.scalarDiv(this.detectedPredators.length);
            sum.sub(this.pos);
            sum.scalarMult(this.FLEE_FORCE);
            this.acc.sub(sum);
        }
    }
}
