import { bindEvent } from './bindEvent.js';
import { drawChess } from './drawChessBoard.js';
import { computerAI } from './computerAI.js';

export function render(goBang) {
    goBang.init();
    let chessAudio = document.querySelector('#chessAudio');
    let tips = document.querySelector('.tips');
    let count = goBang.count;
    let blackWin = goBang.blackWin;
    let whiteWin = goBang.whiteWin;
    let wins = goBang.wins;
    let mode = goBang.mode;
    let map = goBang.map;

    bindEvent('canvas', 'click', function (e) {
        if (mode === 0 || goBang.gameOver || (mode === 2 && !goBang.isBlack)) {
            return;
        }
        let x = e.offsetX;
        let y = e.offsetY;
        let i = ~~( (x - 15) / 30);
        let j = ~~( (y - 15) /30);
        if (map[i][j]) {
            return;
        }

        map[i][j] = 1;
        drawChess(i, j, goBang.isBlack);
        chessAudio.play();
        //黑棋，先手
        if (goBang.isBlack) {
            for (let n = 0; n < count; n++) {
                if (wins[i][j][n]) {
                    blackWin[n]++;
                    whiteWin[n] = 6;
                    if (blackWin[n] === 5) {
                        tips.innerHTML = '黑棋赢了!!!'
                        tips.style.display = 'block';
                        goBang.gameOver = true;
                    }
                }
            }
        }
        //人人对战模式
        if (mode === 1 && !goBang.isBlack) {
            for (let n = 0; n < count; n++) {
                if (wins[i][j][n]) {
                    whiteWin[n]++;
                    blackWin[n] = 6;
                    if (whiteWin[n] === 5) {
                        tips.innerHTML = '白棋赢了!!!'
                        tips.style.display = 'block';
                        goBang.gameOver = true;
                    }
                }
            }
        }
        goBang.isBlack = !goBang.isBlack;
        //人机对战模式，AI
        if (mode === 2) {
            if (!goBang.gameOver) {
                setTimeout(function () {
                    computerAI(goBang);
                },500);
            }
        }
    });
}