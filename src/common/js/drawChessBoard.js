function drawChessSquare(ctx) {
    for(let i = 0; i < 15; i++){
        ctx.moveTo(30 + i * 30 , 30);
        ctx.lineTo(30 + i * 30 , 450);
        ctx.stroke();
        ctx.moveTo(30 , 30 + i * 30);
        ctx.lineTo(450 , 30 + i * 30);
        ctx.stroke();
    }
    ctx.moveTo(120, 120);
    ctx.arc(120, 120, 5, 0, 2 * Math.PI);
    ctx.moveTo(120, 360);
    ctx.arc(120, 360, 5, 0, 2 * Math.PI);
    ctx.moveTo(360, 120);
    ctx.arc(360, 120, 5, 0, 2 * Math.PI);
    ctx.moveTo(360, 360);
    ctx.arc(360, 360, 5, 0, 2 * Math.PI);
    ctx.moveTo(240, 240);
    ctx.arc(240, 240, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

export function drawChessBoard() {
    let canvas = document.createElement('canvas');
    let wrap = document.querySelector('.wrap');
    canvas.width = 480;
    canvas.height = 480;
    wrap.innerHTML = '';
    wrap.appendChild(canvas);
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#444';//格子线颜色
    let chessBgImg = new Image();
    chessBgImg.src = './static/img/goBang.jpg';
    chessBgImg.onload = function () {
        ctx.drawImage(chessBgImg, 0, 0, 480, 480)
        drawChessSquare(ctx);
    }
}


export function drawChess(i, j, isBlack) {
    let ctx = document.querySelector('canvas').getContext('2d');
    ctx.beginPath();
    ctx.arc(30 + 30 * i, 30 + 30 * j, 13, 0, 2 * Math.PI);
    ctx.closePath();
    let gradient = ctx.createRadialGradient(30 + i * 30 + 2, 30 + j * 30 - 2, 12, 30 + i * 30 + 2, 30 + j * 30 - 2, 0);
    if (isBlack) {
       gradient.addColorStop(0,'#0a0a0a');
       gradient.addColorStop(1,'#636766');
    } else {
       gradient.addColorStop(0,'#d1d1d1');
       gradient.addColorStop(1,'#f9f9f9');
    }
    ctx.fillStyle = gradient;
    ctx.fill();
}