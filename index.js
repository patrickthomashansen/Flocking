MAX_TAIL_LENGTH = 25;
TAIL_DELAY = 5;
MAX_AGENT_POPULATION = 500;
MAX_FOOD_POPULATION = 500;
BOUNDARY_FORCE = 0.25;
SUPER_BOUNDARY_FORCE = 1;
THRUST_FORCE = 0.1;
SEPARATION_FORCE = 200;
ALIGNMENT_FORCE = 0.025;
COHESION_FORCE = 0.005;
PREDATOR_ATTACK_FORCE = 0.5;
PREY_ATTACK_FORCE = 0.25;
FLEE_FORCE = 0.005;
EAT_DELAY = 500;
PREDATOR_MATE_DELAY = 1000;
PREY_MATE_DELAY = 500;
AGE_DAMAGE = 0.001;

PREDATOR = "Predator";
PREY = "Prey";
FOOD = "Food";

var stats;
var canvas;
var ctx;
var flock;
var fps;
var lastFrame;

function init() {
    stats = document.getElementById('stats');
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    lastFrame = Date.now();
    updateCanvasSize();

    flock = new Flock();
    flock.initializeAgentPopulations({[PREDATOR]: 100, [PREY]: 400});
    flock.initializeFoodPopulations({[FOOD]: 100});
    flock.registerFoodSpawns({[FOOD]: 0.5});
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
setInterval(draw, 20);