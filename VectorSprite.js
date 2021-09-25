class VectorSprite {

    MAX_PREV_POS = 50;

    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.size = 10;
        this.angle = 0;
        this.color = [255, 0, 0];
        this.alpha = 1;
        this.detectionRadius = 100;
        this.detectionAngle = Math.PI * 2 / 3;
        this.prevPos = [];
    }

    render(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},${this.alpha})`;
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);
        ctx.moveTo(this.size, 0);
        ctx.lineTo(-this.size, -this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.lineTo(this.size, 0);
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }

    renderDetectionBounds(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.strokeStyle = `rgba(0,255,0,1)`;
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.angle);
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, this.detectionRadius, -this.detectionAngle, this.detectionAngle, false);
        ctx.lineTo(0, 0);
        ctx.stroke();
        ctx.restore();
        ctx.closePath();
    }

    // renderTail(ctx) {
    //     ctx.beginPath();
    //     ctx.save();
    //     ctx.strokeStyle = `rgba(255,255,255,1)`;
    //     ctx.translate(this.pos.x, this.pos.y);
    //     ctx.rotate(this.angle);
    //     ctx.moveTo(0, 0);
    //     ctx.arc(0, 0, this.detectionRadius, -this.detectionAngle, this.detectionAngle, false);
    //     ctx.lineTo(0, 0);
    //     ctx.stroke();
    //     ctx.restore();
    //     ctx.closePath();
    // }
}