import { bindEvent } from './bindEvent.js';
import { goBang } from './goBang.js';
import { drawChessBoard } from './drawChessBoard.js';
import { render } from './render.js';
// import { render } from './render.js';
export function init() {
    drawChessBoard();
    bindEvent('#btn-doubleBattle', 'click', function () {
        goBang.mode = 1;
        document.querySelector('.mode').style.display = 'none';
        render(goBang);
        document.querySelector('#btn-restart').style.display = 'inline-block';
    });
    bindEvent('#btn-humanBattle', 'click', function () {
        goBang.mode = 2;
        document.querySelector('.mode').style.display = 'none';
        render(goBang);
        document.querySelector('#btn-restart').style.display = 'inline-block';
    });
    bindEvent('#btn-restart', 'click', function () {
        drawChessBoard();
        document.querySelector('.tips').style.display = 'none';
        document.querySelector('.mode').style.display = 'flex';
    });
}
