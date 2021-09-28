function getShuffledKeys(d) {
    return Object.keys(d).sort(function (a, b) {return Math.random() - 0.5;});
}

class Flock {

    constructor() {
        this.agents = []
        this.numEntities = {}
        this.food = []
    }

    getNumEntities(entityClass) {
        return this.numEntities[entityClass];
    }

    spawn(group, agentClass, x, y) {
        if (!x) {
            x = Math.random() * canvas.width;
        }    
        if (!y) {
            y = Math.random() * canvas.height;
        }
        this.numEntities[agentClass] += 1;
        group.push(eval(`new ${agentClass}(${x}, ${y})`));
    }

    initializeAgentPopulations(initAgentPopSizes) {
        for (let agentClass in initAgentPopSizes) {
            this.numEntities[agentClass] = 0;
            for (let i = 0; i < initAgentPopSizes[agentClass]; i++) {
                this.spawn(this.agents, agentClass);
            }
        }
    }

    initializeFoodPopulations(initFoodPopSizes) {
        for (let foodClass in initFoodPopSizes) {
            this.numEntities[foodClass] = 0;
            for (let i = 0; i < initFoodPopSizes[foodClass]; i++) {
                this.spawn(this.food, foodClass);
            }
        }
    }

    registerFoodSpawns(foodSpawnRates) {
        this.foodSpawnRates = foodSpawnRates;
    }

    breedAgents() {
        for (let i = 0; i < this.agents.length; i++) {
            if (this.agents.length >= MAX_AGENT_POPULATION) {
                break;
            }
            let r = this.agents[i].breed();
            if (r) {
                let agentClass = this.agents[i].constructor.name;
                this.spawn(this.agents, agentClass, this.agents[i].pos.x, this.agents[i].pos.y);
            }
        }
    }

    spawnFood() {
        if (!this.foodSpawnRates) {
            return;
        }
        for (let foodClass of getShuffledKeys(this.foodSpawnRates)) {
            let rate = this.foodSpawnRates[foodClass];
            while (rate > 1) {
                if (this.food.length >= MAX_FOOD_POPULATION) {
                    break;
                }
                this.spawn(this.food, foodClass);
                rate--;
            }
            if (rate > Math.random() && this.food.length < MAX_FOOD_POPULATION) {
                this.spawn(this.food, foodClass);
            }
        }
    }

    deleteDead(group) {
        let i = 0;
        while (i < group.length) {
            if (group[i].isDead()) {
                let entityClass = group[i].constructor.name;
                this.numEntities[entityClass] -= 1;
                group.splice(i, 1);
                continue;
            }
            i++;
        }
    }

    update(canvas) {
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].move(canvas);
        }
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].resetDetections();
            this.agents[i].detectAgents(this.agents);
            this.agents[i].detectAgents(this.food);
        }
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].interact();
        }
        this.deleteDead(this.agents);
        this.deleteDead(this.food);
        this.breedAgents();
        this.spawnFood();
    }

    draw(ctx) {
        for (let i = 0; i < this.food.length; i++) {
            this.food[i].draw(ctx);
        }
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].draw(ctx);
        }
    }
}