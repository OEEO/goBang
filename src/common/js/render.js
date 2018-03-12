import { bindEvent } from './bindEvent.js';
import { drawChess } from './drawChessBoard.js';
export function render(goBang) {
    goBang.init();
    let chessAudio = document.querySelector('#chessAudio');
    let count = goBang.count;
    let blackWin = goBang.blackWin;
    let whiteWin = goBang.whiteWin;
    let wins = goBang.wins;
    let mode = goBang.mode;
    let gameOver = false;
    let map = goBang.map;
    let isBlack = true;

    //计算机下棋
    let computerAI = function (){
        let myScore = [];
        let computerScore = [];
        let max = 0;
        let u = 0, v = 0;
        for(let i = 0; i < 15; i++){
            myScore[i] = [];
            computerScore[i] = [];
            for(let j = 0; j < 15; j++){
                myScore[i][j] = 0;
                computerScore[i][j] = 0;
            }
        }
        for(let i = 0; i < 15; i++){
            for(let j = 0; j < 15; j++){
                if(map[i][j] === 0){
                    for(let k = 0; k < count; k++){
                        if(wins[i][j][k]){
                            if(blackWin[k] === 1){
                                myScore[i][j] += 200;
                            }else if(blackWin[k] === 2){
                                myScore[i][j] += 400;
                            }else if(blackWin[k] === 3){
                                myScore[i][j] += 2000;
                            }else if(blackWin[k] === 4){
                                myScore[i][j] += 10000;
                            }

                            if(whiteWin[k] === 1){
                                computerScore[i][j] += 220;
                            }else if(whiteWin[k] === 2){
                                computerScore[i][j] += 420;
                            }else if(whiteWin[k] === 3){
                                computerScore[i][j] += 2100;
                            }else if(whiteWin[k] === 4){
                                computerScore[i][j] += 20000;
                            }
                        }
                    }

                    if(myScore[i][j] > max){
                        max  = myScore[i][j];
                        u = i;
                        v = j;
                    }else if(myScore[i][j] === max){
                        if(computerScore[i][j] > computerScore[u][v]){
                            u = i;
                            v = j;
                        }
                    }

                    if(computerScore[i][j] > max){
                        max = computerScore[i][j];
                        u = i;
                        v = j;
                    }else if(computerScore[i][j] === max){
                        if(myScore[i][j] > myScore[u][v]){
                            u = i;
                            v = j;
                        }
                    }

                }
            }
        }
        drawChess(u,v,false);
        chessAudio.play();
        map[u][v] = 2;//电脑
        for(let k = 0; k < count; k++){
            if(wins[u][v][k]){
                whiteWin[k]++;
                blackWin[k] = 6;//这个位置对方不可能赢了
                if(whiteWin[k] === 5){
                    let tips = document.querySelector('.tips');
                    tips.innerHTML = '白棋赢了!!!'
                    tips.style.display = 'block';
                    gameOver = true;
                }
            }
        }
        if(!gameOver){
            isBlack = !isBlack;
        }
    }

    bindEvent('canvas', 'click', function (e) {
        if (mode === 0 || gameOver || (mode === 2 && !isBlack)) {
            return;
        }
        let x = e.offsetX;
        let y = e.offsetY;
        let i = ~~( (x - 15) / 30);
        let j = ~~( (y - 15) /30);
        if (goBang.map[i][j]) {
            return;
        }

        goBang.map[i][j] = 1;
        drawChess(i, j, isBlack);
        chessAudio.play();
        //人人对战模式
        if (mode === 1) {
            if (isBlack) {
                for (let n = 0; n < count; n++) {
                    if (wins[i][j][n]) {
                        blackWin[n]++;
                        whiteWin[n] = 6;
                        if (blackWin[n] === 5) {
                            let tips = document.querySelector('.tips');
                            tips.innerHTML = '黑棋赢了!!!'
                            tips.style.display = 'block';
                            gameOver = true;
                        }
                    }
                }
            } else {
                for (let n = 0; n < count; n++) {
                    if (wins[i][j][n]) {
                        whiteWin[n]++;
                        blackWin[n] = 6;
                        if (whiteWin[n] === 5) {
                            let tips = document.querySelector('.tips');
                            tips.innerHTML = '白棋赢了!!!'
                            tips.style.display = 'block';
                            gameOver = true;
                        }
                    }
                }
            }
        }
        isBlack = !isBlack;
        //人机对战模式
        if (mode === 2) {
            for (let n = 0; n < count; n++) {
                if (wins[i][j][n]) {
                    blackWin[n]++;
                    whiteWin[n] = 6;
                    if (blackWin[n] === 5) {
                        let tips = document.querySelector('.tips');
                        tips.innerHTML = '黑棋赢了!!!'
                        tips.style.display = 'block';
                        gameOver = true;
                    }
                }
            }
            if (!gameOver) {
                setTimeout(function () {
                    computerAI();
                },500);
            }
        }
    });
}