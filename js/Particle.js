class Particle{
    constructor(x, y){
        this.posX = x;
        this.posY = y;
        this.velX = 0;
        this.velY = 10;
        this.accX = 0;
        this.accY = 0;
    }

    update(followX, followY){
        const vect = GeometryF.vectorDifference(this.posX, this.posY, followX, followY);
        const forceNormal = GeometryF.vectorNormalize(vect.x, vect.y);
        const dist = GeometryF.vectorLength(vect.x, vect.y);

        const finalAcc = Math.min(dist / 10000, 0.0005);

        this.accX = forceNormal.x * dist * finalAcc;
        this.accY = forceNormal.y * dist * finalAcc;

        this.velX += this.accX;
        this.velY += this.accY;

        this.velX *= 0.98;
        this.velY *= 0.98;

        this.posX += this.velX;
        this.posY += this.velY;
    }

    draw(followX, followY, ctx){
        let width = 0;
        let color = GeometryF.cosmic(time * 2);

        const offset = GeometryF.vectorDifference(this.posX, this.posY, followX, followY);
        const dist = GeometryF.vectorLength(offset.x, offset.y);
        width = dist * dist  / 3000 + 32;

        ctx.strokeStyle = 'rgb(255, 255, 255, 0.5)';
        ctx.lineWidth = 0.1;
        ctx.stroke();

        /*ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(this.pos.x, this.pos.y);   
        ctx.strokeStyle = color; 
        ctx.lineWidth = width * 2;
        ctx.stroke();*/


        ctx.beginPath();
        ctx.arc(this.posX, this.posY, width, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        /*ctx.beginPath();
        
        ctx.fillStyle = GeometryF.cosmic(time);
        ctx.strokeStyle = 'white'; 
        ctx.
        ctx.stroke();
        ctx.fillStyle = GeometryF.cosmic(time);
        ctx.arc(this.posX, this.posY, 16, 0, Math.PI * 2);
        ctx.lineWidth = width * 2;
        ctx.fill();*/
    }
}