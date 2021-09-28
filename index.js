MAX_AGENT_POPULATION = 500;
MAX_FOOD_POPULATION = 200;

var stats;
var canvas;
var ctx;
var flock;
var fps;
var lastFrame;

var PREDATOR = "Predator";
var PREY = "Prey";
var FOOD = "Food";

function init() {
    stats = document.getElementById('stats');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    lastFrame = Date.now();
    updateCanvasSize();

    flock = new Flock();
    flock.initializeAgentPopulations({[PREDATOR]: 50, [PREY]: 200});
    flock.initializeFoodPopulations({[FOOD]: 100});
    flock.registerFoodSpawns({[FOOD]: 1});

}

function draw() {
    updateCanvasSize();
    flock.update(canvas);
    flock.draw(ctx);
    computeFPS();
    writeStats({
        "Predator": flock.getNumEntities(PREDATOR),
        "Prey": flock.getNumEntities(PREY),
        "Food": flock.getNumEntities(FOOD),
        "FPS": fps
    });
}

function computeFPS() {
    let delta = (Date.now() - lastFrame) / 1000;
    lastFrame = Date.now();
    fps = (1 / delta).toFixed(2);
}

function updateCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore();
}

function writeStats(data) {
    text = '';
    for (let i in data) {
      text += ' | ' + i + ' : ' + data[i]
    }
    stats.textContent = text;
  }

init();
setInterval(draw, 1);