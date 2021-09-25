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

// ctx.imageSmoothingEnabled = false;
// ctx.translate(0.5, 0.5);


// ctx.fillStyle = `rgba(255, 0, 0, 1)`;
// let angle = 3.14;
// let radius = 50

// ctx.beginPath();
// ctx.save();
// ctx.translate(100, 100);
// ctx.rotate(angle);
// ctx.moveTo(radius, 0);
// ctx.lineTo(-radius, -radius);
// ctx.lineTo(-radius, radius);
// ctx.lineTo(radius, 0);
// ctx.fill();
// ctx.restore();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
// // ctx.moveTo(110, 75);
// ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
// ctx.moveTo(65, 65);
// ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
// ctx.moveTo(95, 65);
// ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
// ctx.stroke();

// ctx.beginPath();
// ctx.moveTo(75, 25);
// ctx.quadraticCurveTo(25, 25, 25, 62.5);
// ctx.quadraticCurveTo(25, 100, 50, 100);
// ctx.quadraticCurveTo(50, 120, 30, 125);
// ctx.quadraticCurveTo(60, 120, 65, 100);
// ctx.quadraticCurveTo(125, 100, 125, 62.5);
// ctx.quadraticCurveTo(125, 25, 75, 25);
// ctx.stroke();
// ctx.fill();

// var p = new Path2D('M30,1h40l29,29v40l-29,29h-40l-29-29v-40z');
// ctx.fill(p);

// function draw() {
//     // var ctx = document.getElementById('canvas').getContext('2d');
//     for (var i = 0; i < 10; i++) {
//         ctx.lineWidth = 1 + i;
//         ctx.beginPath();
//         ctx.moveTo(5 + i * 14, 5);
//         ctx.lineTo(5 + i * 14, 140);
//         ctx.stroke();
//     }
// }
// draw();
