class Agent extends VectorSprite {
    constructor(x, y) {
        super(x, y);
        this.vel = new Vector();
        this.acc = new Vector();
        this.maxSpeed = 5;
        this.desiredSeparation = 75;
        this.desiredBoundaryDist = 100;
        this.detectionRadius = 100;
        this.collisionRadius = 20;
        this.detectedAgents = {};
        this.dead = false;
        this.eatTimer = 0;
        this.health = 1;
        this.mating = false;
        this.mateTimer = 0;
    }

    resetDetections() {
        this.detectedAgents = {}
        this.collidedAgents = {}
    }

    detectAgents(quadtree) {
        let agents = quadtree.retrieveCollision(
            this.pos.x-this.detectionRadius,
            this.pos.y-this.detectionRadius,
            2*this.detectionRadius,
            2*this.detectionRadius
        );
        for (let i = 0; i < agents.length; i++) {
            let d = Vector.copy(this.pos).distSq(agents[i].pos);
            if ((agents[i] != this) && (d < this.detectionRadius * this.detectionRadius)) {
                let agentType = agents[i].constructor.name;
                if (d < this.collisionRadius * this.collisionRadius) {
                    if (!this.collidedAgents[agentType]) {
                        this.collidedAgents[agentType] = []
                    }
                    this.collidedAgents[agentType].push(agents[i]);
                }
                let diff = Vector.copy(agents[i].pos).sub(this.pos);
                let angle = this.vel.angle(diff);
                if (Math.abs(angle) < this.detectionAngle) {
                    if (!this.detectedAgents[agentType]) {
                        this.detectedAgents[agentType] = []
                    }
                    this.detectedAgents[agentType].push(agents[i]);
                }
            }
        }
    }

    applySeparation(agentType, force) {
        if (!this.detectedAgents[agentType]) {
            return;
        }
        let sum = new Vector();
        let count = 0;
        for (let i = 0; i < this.detectedAgents[agentType].length; i++) {
            let d = Vector.copy(this.pos).distSq(this.detectedAgents[agentType][i].pos);
            if ((d > 0) && (d < this.desiredSeparation * this.desiredSeparation)) {
                let diff = Vector.copy(this.pos).sub(this.detectedAgents[agentType][i].pos);
                diff.normalize();
                diff.scalarDiv(d);
                sum.add(diff);
                count++;
            }
        }
        if (count > 0) {
            sum.scalarDiv(count);
            sum.scalarMult(force);
            this.acc.add(sum);
        }
    }

    applyAlignment(agentType, force) {
        if (!this.detectedAgents[agentType]) {
            return;
        }
        let sum = new Vector();
        for (let i = 0; i < this.detectedAgents[agentType].length; i++) {
            sum.add(this.detectedAgents[agentType][i].vel);
        }
        if (sum.magSq() > 0) {
            sum.scalarDiv(this.detectedAgents[agentType].length);
            sum.scalarMult(force);
            this.acc.add(sum);
        }
    }

    applyCohesion(agentType, force) {
        if (!this.detectedAgents[agentType]) {
            return;
        }
        let sum = new Vector();
        for (let i = 0; i < this.detectedAgents[agentType].length; i++) {
            sum.add(this.detectedAgents[agentType][i].pos);
        }
        if (sum.magSq() > 0) {
            sum.scalarDiv(this.detectedAgents[agentType].length);
            sum.sub(this.pos);
            sum.scalarMult(force);
            this.acc.add(sum);
        }
    }

    applyAttack(agentType, force) {
        if (!this.detectedAgents[agentType]) {
            return;
        }
        let closestDiff = new Vector();
        let closestDiffMagSq = 1000000;
        for (let i = 0; i < this.detectedAgents[agentType].length; i++) {
            let diff = Vector.copy(this.detectedAgents[agentType][i].pos).sub(this.pos);
            let diffMagSq = diff.magSq();
            if (diffMagSq < closestDiffMagSq) {
                closestDiff = diff;
                closestDiffMagSq = diffMagSq;
            }
        }
        if (closestDiff.magSq() > 0) {
            closestDiff.normalize();
            closestDiff.scalarMult(force);
            this.acc.add(closestDiff);
        }
    }

    applyFlee(agentType, force) {
        if (!this.detectedAgents[agentType]) {
            return;
        }
        let sum = new Vector();
        for (let i = 0; i < this.detectedAgents[agentType].length; i++) {
            sum.add(this.detectedAgents[agentType][i].pos);
        }
        if (sum.magSq() > 0) {
            sum.scalarDiv(this.detectedAgents[agentType].length);
            sum.sub(this.pos);
            sum.scalarMult(force);
            this.acc.sub(sum);
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
                force.limitMag(SUPER_BOUNDARY_FORCE);
            }
            else {
                force.limitMag(BOUNDARY_FORCE);
            }
            this.acc.add(force);
        }
    }

    applyThrust(force) {
        if (this.vel.magSq() > 0) {
            this.acc.add(Vector.copy(this.vel).setMag(force));
        }
    }

    updatePos() {
        this.vel.add(this.acc);
        if (this.vel.magSq() > 0) {
            this.vel.limitMag(this.maxSpeed);
        }
        this.pos.add(this.vel);
        this.angle = this.vel.toAngle();
        this.acc.scalarMult(0);
    }

    kill() {
        this.dead = true;
    }

    isDead() {
        return this.dead;
    }

    attemptEat(agentType, eatDelay) {
        if (this.eatTimer < eatDelay) {
            this.eatTimer++;
            return;
        }
        if (this.collidedAgents[agentType]) {
            this.collidedAgents[agentType][0].kill();
            this.eatTimer = 0;
            this.health = 1;
        }
    }

    age(damage) {
        this.health -= damage;
        this.alpha = this.health;
        if (this.health < 0) {
            this.kill();
        }
    }

    attemptMate(agentType, mateDelay) {
        if (this.mateTimer < mateDelay) {
            this.mateTimer++;
            return;
        }
        if (this.collidedAgents[agentType] && this.health > 0.5) {
            this.mating = true;
            this.mateTimer = 0;
        }
    }
    
    breed() {
        let r = this.mating;
        this.mating = false;
        return r;
    }
}