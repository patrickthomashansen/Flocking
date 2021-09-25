var canvas;
var ctx;
var allAgents = [];

var NUM_AGENTS = 1000;

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    updateCanvasSize();
    
    for (let i = 0; i < NUM_AGENTS; i++) {
        let x = Math.random() * canvas.width; 
        let y = Math.random() * canvas.height;
        allAgents.push(new Agent(x, y));
    }
    
}

function draw() {
    updateCanvasSize();

    for (let i = 0; i < allAgents.length; i++) {
        allAgents[i].detect(allAgents);
        allAgents[i].applySeparation();
        allAgents[i].applyAlignment();
        allAgents[i].applyCohesion();
        allAgents[i].applyBoundaries(canvas.width, canvas.height);
        allAgents[i].update();
        // allAgents[i].renderDetectionBounds(ctx);
        allAgents[i].render(ctx);
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
