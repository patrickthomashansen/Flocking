class Agent extends VectorSprite {

    SEPARATION_FORCE = 200;
    ALIGNMNET_FORCE = 0.025;
    COHESION_FORCE = 0.005;
    BOUNDARY_FORCE = 0.5;
    SUPER_BOUNDARY_FORCE = 1;
    THRUST_FORCE = 0.1;

    constructor(x, y) {
        super(x, y);
        this.vel = Vector.randomUnit().scalarMult(5);
        this.acc = new Vector();
        this.maxSpeed = 5;
        this.desiredSeparation = 75;
        this.desiredBoundaryDist = 250;
        this.detectionRadius = 100;
        this.detectedAgents = [];
    }

    detect(agents, group) {
        for (let i = 0; i < agents.length; i++) {
            let d = Vector.copy(this.pos).distSq(agents[i].pos);
            if ((agents[i] != this) && (d < this.detectionRadius * this.detectionRadius)) {
                let diff = Vector.copy(agents[i].pos).sub(this.pos);
                let angle = this.vel.angle(diff);
                if (Math.abs(angle) < this.detectionAngle) {
                    group.push(agents[i]);
                }
            }
        }
        return group;
    }
    
    detectAgents(agents) {
        this.detectedAgents = [];
        this.detect(agents, this.detectedAgents);
    }

    applySeparation() {
        let sum = new Vector();
        let count = 0;
        // console.log(this.detectedAgents.length)
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
            // console.log(sum)
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
        if (sum.magSq() > 0) {
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
        if (sum.magSq() > 0) {
            sum.scalarDiv(this.detectedAgents.length);
            sum.sub(this.pos);
            sum.scalarMult(this.COHESION_FORCE);
            this.acc.add(sum);
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
        if (force.magSq() > 0) {
            force.setMag(this.maxSpeed);
            force.sub(this.vel);
            if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
                force.limitMag(this.SUPER_BOUNDARY_FORCE);
            }
            else {
                force.limitMag(this.BOUNDARY_FORCE);
            }
            this.acc.add(force);
        }
    }

    applyThrust() {
        if (this.vel.magSq() > 0) {
            this.acc.add(Vector.copy(this.vel).setMag(this.THRUST_FORCE));
        }
    }

    update() {
        this.prevPosCount++;
        if (this.prevPosCount >= this.PREV_POS_EVERY_N){
            this.prevPosCount = 0;
            if (this.prevPos.length >= this.MAX_PREV_POS){
                this.prevPos.pop();
            }
            this.prevPos.unshift(Vector.copy(this.pos));
        }

        // console.log(this.vel)
        this.vel.add(this.acc);
        if (this.vel.magSq() > 0) {
            this.vel.limitMag(this.maxSpeed);
        }
        this.pos.add(this.vel);
        this.angle = this.vel.toAngle();
        this.acc.scalarMult(0);
    }
}