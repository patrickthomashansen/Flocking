class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    static copy(v) {
        return new Vector(v.x, v.y);
    }

    static fromAngle(angle) {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    static randomUnit() {
        return Vector.fromAngle(Math.random() * 2 * Math.PI);
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    magSq() {
        return (this.x * this.x) + (this.y * this.y);
    }

    setMag(mag) {
        return this.normalize().scalarMult(mag);
    }

    limitMag(mag) {
        if (this.mag() > mag) {
            return this.normalize().scalarMult(mag);
        }
        else {
            return this;
        }
    }

    dist(v) {
        let tmp = Vector.copy(this);
        tmp.sub(v);
        return tmp.mag();
    }

    distSq(v) {
        let tmp = Vector.copy(this);
        tmp.sub(v);
        return tmp.magSq();
    }

    scalarMult(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    scalarDiv(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }

    normalize() {
        return this.scalarDiv(this.mag());
    }

    project(v) {
        var coeff = ((this.x * v.x) + (this.y * v.y)) / ((v.x * v.x) + (v.y * v.y));
        this.x = coeff * v.x;
        this.y = coeff * v.y;
        return this;
    }
    
    toAngle() {
        return -Math.atan2(-this.y, this.x);
    }

    angle(v) {
        return Math.acos(((this.x * v.x) + (this.y * v.y)) / this.mag() / v.mag());
    }
}
