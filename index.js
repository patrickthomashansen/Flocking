var canvas;
var ctx;
let flock;

var PREDATOR = "Predator";
var PREY = "Prey";

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    updateCanvasSize();

    flock = new Flock();
    flock.initializePopulations({
        [PREDATOR]: 2,
        [PREY]: 1000
    })
}

function draw() {
    updateCanvasSize();
    flock.update(canvas, ctx);
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