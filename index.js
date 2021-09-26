var canvas;
var ctx;
var preyAgents = [];
var predAgents = [];

var NUM_PREY = 200;
var NUM_PRED = 2;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    updateCanvasSize();
    
    for (let i = 0; i < NUM_PREY; i++) {
        let x = Math.random() * canvas.width; 
        let y = Math.random() * canvas.height;
        preyAgents.push(new Prey(x, y));
    }

    for (let i = 0; i < NUM_PRED; i++) {
        let x = Math.random() * canvas.width; 
        let y = Math.random() * canvas.height;
        predAgents.push(new Predator(x, y));
    }
    
}

function draw() {
    updateCanvasSize();

    for (let i = 0; i < preyAgents.length; i++) {
        preyAgents[i].detectAgents(preyAgents);
        preyAgents[i].detectPredators(predAgents);
        preyAgents[i].applyThrust();
        preyAgents[i].applySeparation();
        preyAgents[i].applyAlignment();
        preyAgents[i].applyCohesion();
        preyAgents[i].applyFlee();
        preyAgents[i].applyBoundaries(canvas.width, canvas.height);
        preyAgents[i].update();
        preyAgents[i].renderTail(ctx);
        // preyAgents[i].renderDetectionBounds(ctx);
        preyAgents[i].render(ctx);
    }

    for (let i = 0; i < predAgents.length; i++) {
        predAgents[i].detectAgents(predAgents);
        predAgents[i].detectPrey(preyAgents);
        predAgents[i].applyThrust();
        predAgents[i].applySeparation();
        // predAgents[i].applyAlignment();
        // predAgents[i].applyCohesion();
        predAgents[i].applyAttack();
        predAgents[i].applyBoundaries(canvas.width, canvas.height);
        predAgents[i].update();
        predAgents[i].renderTail(ctx);
        // predAgents[i].renderDetectionBounds(ctx);
        predAgents[i].render(ctx);
    }
    
}

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore();
}

init();
setInterval(draw, 20);