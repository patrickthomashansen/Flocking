class Quadtree {
    constructor(x, y, width, height, level, maxObjects, maxLevels) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.level = level || 0;
        this.maxObjects = maxObjects || 10;
        this.maxLevels = maxLevels || 5;

        this.objects = [];
        this.nodes = [];
    }

    split() {
        let x = this.x;
        let y = this.y;
        let subWidth = this.width / 2;
        let subHeight = this.height / 2;
        let nextLevel = this.level + 1;
        let maxObjects = this.maxObjects;
        let maxLevels = this.maxLevels;

        this.nodes.push(new Quadtree(x, y, subWidth, subHeight, nextLevel, maxObjects, maxLevels));
        this.nodes.push(new Quadtree(x+subWidth, y, subWidth, subHeight, nextLevel, maxObjects, maxLevels));
        this.nodes.push(new Quadtree(x, y+subHeight, subWidth, subHeight, nextLevel, maxObjects, maxLevels));
        this.nodes.push(new Quadtree(x+subWidth, y+subHeight, subWidth, subHeight, nextLevel, maxObjects, maxLevels));
    }

    getIndex(x, y) {
        if (y < this.y + this.height/2) {
            if (x < this.x + this.width/2) {
                return 0;
            }
            return 1;
        }
        if (x < this.x + this.width/2) {
            return 2;
        }
        return 3;
    }

    insert(entity) {
        if (this.nodes.length) {
            this.nodes[this.getIndex(entity.pos.x, entity.pos.y)].insert(entity);
            return;
        }
        this.objects.push(entity);
        if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
            this.split();
            for (let i = 0; i < this.objects.length; i++) {
                this.nodes[this.getIndex(this.objects[i])].insert(this.objects[i]);
            }
            this.objects = [];
        }
    }

    retrieveCollision(x, y, width, height) {
        let r = this.objects;
        if (this.nodes.length) {
            let indices = [];
            indices.push(this.getIndex(x, y));
            indices.push(this.getIndex(x+width, y));
            indices.push(this.getIndex(x, y+height));
            indices.push(this.getIndex(x+width, y+height));
            indices = [...new Set(indices)];
            for (var i = 0; i < indices.length; i++) {
                r = r.concat(this.nodes[indices[i]].retrieveCollision(x, y, width, height));
            }
        }
        return r;
    }

    clear() {
        this.objects = []
        if (this.nodes.length) {
            for (let i = 0; i < this.nodes.length; i++) {
                this.nodes[i].clear();
            }
        }
    }
}