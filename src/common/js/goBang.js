
let nums = 15;//棋盘横竖格子数
let wins = [];//总赢法数组
let map = [];//棋盘数组
let count = 0;

//棋盘
for (let i = 0; i < nums; i++) {
    map[i] = [];
    for (let j = 0; j < nums; j++) {
        map[i][j] = 0;
    }
}
//总赢法数组初始化
for (let i = 0; i < nums; i++) {
    wins[i] = [];
    for (let j = 0; j < nums; j++) {
        wins[i][j] = [];
    }
}
//横线赢法统计
for (let i = 0; i < nums; i++) {
    for (let j = 0; j < nums - 4; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i][j+k][count] = true;
        }
        count++;
    }
}
//竖线赢法统计
for (let i = 0; i < nums - 4; i++) {
    for (let j = 0; j < nums; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i+k][j][count] = true;
        }
        count++;
    }
}
//正斜线赢法统计
for (let i = 0; i < nums - 4; i++) {
    for (let j = 0; j < nums - 4; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i+k][j+k][count] = true;
        }
        count++;
    }
}
//反斜线赢法统计
for (let i = 0; i < nums - 4; i++) {
    for (let j = 4; j < nums; j++) {
        for (let k = 0; k < 5; k++) {
            wins[i+k][j-k][count] = true;
        }
        count++;
    }
}


function cloneObject(obj) {
    if (typeof obj !== 'object') {
        return;
    }
    let str = '';
    let newobj = obj.constructor === Array ? [] : {};
    if (window.JSON) {
        str = JSON.stringify(obj);
        newobj = JSON.parse(str);
    } else {
        for (let i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? cloneObject(obj[i]) : obj[i];
        }
    }
    return newobj;
}

export let goBang = {
    wins: wins,
    count:count,
    mode:0,
    init:function () {
        this.gameOver = false;
        this.blackWin = new Array(count).fill(0);
        this.whiteWin = new Array(count).fill(0);
        this.map = cloneObject(map);
    }
};