class BezierCurve{
	constructor(count) {
		this.count = count;
		this.selection = -1;
		this.x = []; // handle, point, handle
		this.y = [];

		for (var i = 0; i < this.count * 3; i += 3) {
			//point
			this.x[i+1] = 100 + (i + 1) * 100;
			this.y[i+1] = 500;

			//handle 0
			this.x[i] = this.x[i+1];
			this.y[i] = this.y[i+1] - 100;

			//handle 1
			this.x[i+2] = this.x[i+1];
			this.y[i+2] = this.y[i+1] + 100;
		}
	}

	draw(){
		for (var i = 0; i < this.count; i++) {
			//first point
			const pi1 = i * 3 + 1;
			const px1 = this.x[pi1];
			const py1 = this.y[pi1];
			//first handle between p1 and p2
			const hi1 = i * 3 + 2;
			const hx1 = this.x[hi1];
			const hy1 = this.y[hi1];
			//second point
			const pi2 = (i * 3 + 4) % (this.count * 3);
			const px2 = this.x[pi2];
			const py2 = this.y[pi2];
			//second handle between p1 and p2
			const hi2 = (i * 3 + 3) % (this.count * 3);
			const hx2 = this.x[hi2];
			const hy2 = this.y[hi2];

			//draw curve
			ctx.beginPath();
			ctx.setLineDash([0, 0]);
			ctx.moveTo(px1, py1);
			ctx.bezierCurveTo(hx1, hy1, hx2, hy2, px2, py2);
			ctx.strokeStyle = 'white';
			ctx.lineWidth = 4;
			ctx.stroke();

			//first point to handle line
			ctx.beginPath();
			ctx.moveTo(px1, py1);
			ctx.lineTo(hx1, hy1);
			ctx.setLineDash([8, 8]);
			ctx.strokeStyle = 'OldLace';
			ctx.lineWidth = 2;
			ctx.stroke();

			//first point
			ctx.beginPath();
			ctx.arc(px1, py1, 6, 0, Math.PI * 2);
			ctx.fillStyle = 'deepSkyBlue';
			ctx.fill();
			ctx.beginPath();

			//first handle
			ctx.beginPath();
			ctx.arc(hx1, hy1, 6, 0, Math.PI * 2);
			ctx.fillStyle = 'gold';
			ctx.fill();

			//second point to handle line
			ctx.beginPath();
			ctx.moveTo(px2, py2);
			ctx.lineTo(hx2, hy2);
			ctx.setLineDash([8, 8]);
			ctx.strokeStyle = 'OldLace';
			ctx.lineWidth = 2;
			ctx.stroke();

			//second point
			ctx.beginPath();
			ctx.arc(px2, py2, 6, 0, Math.PI * 2);
			ctx.fillStyle = 'deepSkyBlue';
			ctx.fill();
			ctx.beginPath();

			//second handle
			ctx.beginPath();
			ctx.arc(hx2, hy2, 6, 0, Math.PI * 2);
			ctx.fillStyle = 'gold';
			ctx.fill();
		}
	}

	select(x, y){
		//select obj if close
		for(var i = 0; i < this.x.length; i++){
			const diff = vectorDifference(this.x[i], this.y[i], x, y);
			const dist = vectorLength(diff.x, diff.y);

			console.log(dist);

			if(dist < 12){
				this.selection = i;
				break;
			}
		}

		//Todo: create point if click is on curve
	}

	deselect(){
		this.selection = -1;
	}

	input(x, y){
		this.x[this.selection] = x;
		this.y[this.selection] = y;

		/*if(this.selection % 3 == 1){ Todo: make handles follow anchor
			this.x[this.selection-1] = x;
			this.y[this.selection-1] = y;
			this.x[this.selection+1] = x;
			this.y[this.selection+1] = y;
		}*/
	}
}

const curve = new BezierCurve(2);
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

testStart();

function testStart(){
	testUpdate();
}

function testUpdate(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	curve.draw();
	requestAnimationFrame(testUpdate);
}

var isDragging = false;
let offset = { x: 0, y: 0 };

canvas.addEventListener("mousedown", (e) => {
	const x = e.clientX;
	const y = e.clientY;

	curve.select(x, y);
});

canvas.addEventListener("mousemove", (e) => {
	const x = e.clientX;
	const y = e.clientY;

	curve.input(x, y);
});

canvas.addEventListener("mouseup", () => {
	curve.deselect();
});

canvas.addEventListener("mouseleave", () => {
	curve.deselect();
});