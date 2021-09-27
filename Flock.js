class Flock {
    constructor() {
        this.agents = []
    }

    initializePopulations(initPopSizes) {
        for (let agentClass in initPopSizes) {
            for (let i = 0; i < initPopSizes[agentClass]; i++) {
                let x = Math.random() * canvas.width; 
                let y = Math.random() * canvas.height;
                this.agents.push(eval(`new ${agentClass}(${x}, ${y})`));
            }
        }
    }

    update(canvas, ctx) {
        for (let i = 0; i < this.agents.length; i++) {
            this.agents[i].update(this.agents, canvas, ctx);
        }
    }
}