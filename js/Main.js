const curve = new BezierCurve(2);

const simulationCanvas = document.getElementById('simulationCanvas');
const simulationCtx = simulationCanvas.getContext('2d');

const overlayCanvas = document.getElementById('overlayCanvas');
const overlayCtx = overlayCanvas.getContext('2d');

let time = 0;
const particleNum = 3;
let particles = [];
let frame = null;

document.addEventListener('DOMContentLoaded', start);
function start(){
    time = 0;
    particles = [];

    for (let i = 0; i < particleNum; i++) {
        particles[i] = new Particle(window.innerWidth * Math.random() * 3 - window.innerWidth, window.innerHeight * Math.random() * 3 - window.innerHeight);
    }
    
    if(frame !== null){
        requestAnimationFrame(frame);
    }
    frame = null;
    update();
    resizeCanvases();
}

function update(){
    //overlay
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
	curve.draw(overlayCtx);

    simulationCtx.fillStyle = "rgba(0, 0, 0, 0.002)";
    simulationCtx.fillRect(0, 0, simulationCanvas.width, simulationCanvas.height);
    
    //simulation
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const point = curve.pointOnCurve(time + (i / particles.length));
        particle.update(point.x, point.y);
        particle.draw(point.x, point.y, simulationCtx);
    }

    time += 0.002;
	frame = requestAnimationFrame(update);
}

window.addEventListener('resize', resizeCanvases);
function resizeCanvases() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    overlayCanvas.width = simulationCanvas.width = width;
    overlayCanvas.height = simulationCanvas.height = height;
}

overlayCanvas.addEventListener("mousedown", (e) => {
	const x = e.clientX;
	const y = e.clientY;

	curve.select(x, y);
});

overlayCanvas.addEventListener("mousemove", (e) => {
	const x = e.clientX;
	const y = e.clientY;

	curve.input(x, y);
});

overlayCanvas.addEventListener("mouseup", () => {
	curve.deselect();
});

overlayCanvas.addEventListener("mouseleave", () => {
	curve.deselect();
});