const curve = new BezierCurve(2);

const simulationCanvas = document.getElementById('simulationCanvas');
const simulationCtx = simulationCanvas.getContext('2d');

const overlayCanvas = document.getElementById('overlayCanvas');
const overlayCtx = overlayCanvas.getContext('2d');

var time = 0;

start();
function start(){
    update();
    resizeCanvases();
}

function update(){
    //overlay
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
	curve.draw(overlayCtx);
    //simulation
    const point = curve.pointOnCurve(time);

    simulationCtx.beginPath();
    simulationCtx.arc(point.x, point.y, 16, 0, Math.PI * 2);
    simulationCtx.fillStyle = cosmic(time);
    simulationCtx.fill();
    simulationCtx.beginPath();


    time += 0.003;
	requestAnimationFrame(update);
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