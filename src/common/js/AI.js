//计算机下棋

export function AI(goBang){
    let myScore = [];
    let computerScore = [];
    let max = 0;
    let map = goBang.map;
    let count = goBang.count;
    let blackWin = goBang.blackWin;
    let whiteWin = goBang.whiteWin;
    let wins = goBang.wins;
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
                let tips = document.getElementById('tips');
                tips.innerHTML = '计算机赢了!!!'
                tips.style.display = 'block';
                goBang.gameOver = true;
            }
        }
    }
    if(!goBang.gameOver){
        me = !me;
    }
}