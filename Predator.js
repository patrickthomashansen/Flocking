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

    detectPrey(agents) {
        this.detectedPrey = [];
        this.detect(agents, this.detectedPrey);
    }

    applyAttack(agents) {
        let closestDiff = new Vector();
        let closestDiffMagSq = 1000000;
        for (let i = 0; i < this.detectedPrey.length; i++) {
            let diff = Vector.copy(this.detectedPrey[i].pos).sub(this.pos);
            let diffMagSq = diff.magSq();
            if (diffMagSq < closestDiffMagSq) {
                closestDiff = diff;
                closestDiffMagSq = diffMagSq;
            }
        }
        if (closestDiff.magSq() > 0) {
            closestDiff.normalize();
            closestDiff.scalarMult(this.ATTACK_FORCE);
            this.acc.add(closestDiff);
        }
    }
}
