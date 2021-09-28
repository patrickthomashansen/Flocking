class Food {

    constructor(x, y) {
        this.pos = new Vector(x, y);
        this.color = [255, 255, 255];
        this.size = 2;
        this.dead = false
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = `rgba(${this.color[0]},${this.color[1]},${this.color[2]},1)`;
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rect(0, 0, this.size, this.size);
        ctx.fill();
        ctx.restore();
        ctx.closePath();
    }

    kill() {
        this.dead = true;
    }

    isDead() {
        return this.dead;
    }
}