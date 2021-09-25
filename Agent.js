class Agent extends VectorSprite {

    SEPARATION_FORCE = 10;
    ALIGNMNET_FORCE = 0.01;
    COHESION_FORCE = 0.0001;
    BOUNDARY_FORCE = 0.1;
    THURST_FORCE = 0.1;

    constructor(x, y) {
        super(x, y);
        // this.vel = new Vector();
        this.vel = Vector.randomUnit().scalarMult(5);
        this.acc = new Vector();
        this.maxSpeed = 3;
        this.desiredSeparation = 50;
        this.desiredBoundaryDist = 100;
        this.detectedAgents = [];
    }

    detect(agents) {
        this.detectedAgents = []
        for (let i = 0; i < agents.length; i++) {
            let d = Vector.copy(this.pos).distSq(agents[i].pos);
            if ((agents[i] != this) && (d < this.detectionRadius * this.detectionRadius)) {
                let diff = Vector.copy(agents[i].pos).sub(this.pos);
                let angle = this.vel.angle(diff);
                if (Math.abs(angle) < this.detectionAngle) {
                    this.detectedAgents.push(agents[i]);
                }
            }
        }
        
    }

    applySeparation() {
        let sum = new Vector();
        let count = 0;
        for (let i = 0; i < this.detectedAgents.length; i++) {
            let d = Vector.copy(this.pos).distSq(this.detectedAgents[i].pos);
            if ((d > 0) && (d < this.desiredSeparation * this.desiredSeparation)) {
                let diff = Vector.copy(this.pos).sub(this.detectedAgents[i].pos);
                diff.normalize();
                diff.scalarDiv(d);
                sum.add(diff);
                count++;
            }
        }
        if (count > 0) {
            sum.scalarDiv(count);
            sum.scalarMult(this.SEPARATION_FORCE);
            this.acc.add(sum);
        }
    }

    applyAlignment() {
        let sum = new Vector();
        for (let i = 0; i < this.detectedAgents.length; i++) {
            sum.add(this.detectedAgents[i].vel);
        }
        if (sum.mag() > 0) {
            sum.scalarDiv(this.detectedAgents.length);
            sum.scalarMult(this.ALIGNMNET_FORCE);
            this.acc.add(sum);
        }
    }

    applyCohesion() {
        let sum = new Vector();
        for (let i = 0; i < this.detectedAgents.length; i++) {
            sum.add(this.detectedAgents[i].pos);
        }
        if (sum.mag() > 0) {
            sum.scalarDiv(this.detectedAgents.length);
            let diff = Vector.copy(this.pos).sub(sum);
            diff.scalarMult(this.COHESION_FORCE);
            this.acc.sub(diff);
        }
    }

    applyBoundaries(width, height) {
        let force = new Vector();
        if (this.pos.x < this.desiredBoundaryDist) {
            force.add(new Vector(this.maxSpeed, this.vel.y));
        }
        else if (this.pos.x > width - this.desiredBoundaryDist) {
            force.add(new Vector(-this.maxSpeed, this.vel.y));
        }
        if (this.pos.y < this.desiredBoundaryDist) {
            force.add(new Vector(this.vel.x, this.maxSpeed));
        }
        else if (this.pos.y > height - this.desiredBoundaryDist) {
            force.add(new Vector(this.vel.x, -this.maxSpeed));
        }
        if (force.mag() > 0) {
            force.setMag(this.maxSpeed);
            force.sub(this.vel);
            force.limitMag(this.BOUNDARY_FORCE);
            this.acc.add(force);
        }
    }

    applyThrust() {
        let dir = Vector.copy(this.vel).normalize();
        this.acc.add(dir.scalarMult(this.THRUST_FORCE));
    }

    update() {
        this.vel.add(this.acc);
        this.vel.limitMag(this.maxSpeed);
        this.pos.add(this.vel);
        this.angle = this.vel.toAngle();
        this.acc.scalarMult(0);
    }
}