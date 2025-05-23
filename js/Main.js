const curve = new BezierCurve(2);

const simulationCanvas = document.getElementById('simulationCanvas');
const simulationCtx = simulationCanvas.getContext('2d');

const overlayCanvas = document.getElementById('overlayCanvas');
const overlayCtx = overlayCanvas.getContext('2d');

let overlayEnabled = true;
let frame = null;
let time = 0;

let particles = [];

let timeStep = 20;

let particleNum = 3;
let attractionForce = 5;
let dampeningForce = 98;

document.addEventListener('DOMContentLoaded', start);
function start(){
    time = 0;
    particles = [];

    for (let i = 0; i < particleNum; i++) {
        particles[i] = new Particle(window.innerWidth * Math.random() * 3 - window.innerWidth, window.innerHeight * Math.random() * 3 - window.innerHeight);
    }

    resizeCanvases();
    
    if(frame !== null){
        requestAnimationFrame(frame);
    }
    frame = null;

    simulationCtx.clearRect(0, 0, simulationCanvas.width, simulationCanvas.height);
    requestAnimationFrame(update);
}

function update(){
    //overlay
    if(overlayEnabled){
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
        curve.draw(overlayCtx);
    }

    /*simulationCtx.fillStyle = "rgba(0, 0, 0, 0.01)";
    simulationCtx.fillRect(0, 0, simulationCanvas.width, simulationCanvas.height);*/
    
    //simulation
    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const point = curve.pointOnCurve(time + (i / particles.length));
        particle.update(point.x, point.y);
        particle.draw(point.x, point.y, simulationCtx);
    }

    time += timeStep / 10000;
	frame = requestAnimationFrame(update);
}

window.addEventListener('resize', resizeCanvases);
function resizeCanvases() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    overlayCanvas.width = simulationCanvas.width = width;
    overlayCanvas.height = simulationCanvas.height = height;
}

function toggleOverlay(){
    if(overlayEnabled){
        overlayEnabled = false;
        overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    }else{
        overlayEnabled = true;
    }
}

function randomInput(){

}

function toggleOption(){
    console.log("asdasd");

    const box = document.getElementById('option-menu');
    box.classList.toggle('hide-option');
}

///////////////////////Variable Fields/////////////////////////
const timeStepInput = document.getElementById('curve-speed');
timeStepInput.addEventListener('change', function () {
    timeStep = timeStepInput.value;
});

const particleNumInput = document.getElementById('particle-num');
particleNumInput.addEventListener('change', function () {
    particleNum = particleNumInput.value;
});

const attractionForceInput = document.getElementById('att-force');
attractionForceInput.addEventListener('change', function () {
    attractionForce = attractionForceInput.value;
});

const dampeningForceInput = document.getElementById('damp-force');
dampeningForceInput.addEventListener('change', function () {
    dampeningForce = dampeningForceInput.value;
});


///////////////////////////Inputs//////////////////////////////
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