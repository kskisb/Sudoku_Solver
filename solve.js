// 盤面に対して仮置きした数字が暫定的に正しいかをチェックする関数
function check(field, si, sj) {
    // 行ごとに同じ文字がないかチェック
    let num1 = new Array(10).fill(0);
    for (let j = 0; j < 9; j++) {
        if (field[si][j] === -1) {
            continue;
        }
        if (num1[field[si][j]] === 1) {
            return false;
        } else {
            num1[field[si][j]]++;
        }
    }

    // 列ごとに同じ文字がないかチェック
    let num2 = new Array(10).fill(0);
    for (let i = 0; i < 9; i++) {
        if (field[i][sj] === -1) {
            continue;
        }
        if (num2[field[i][sj]] === 1) {
            return false;
        } else {
            num2[field[i][sj]]++;
        }
    }

    // ブロックごとに同じ文字がないかチェック
    if (si <= 2) si = 0;
    else if (si <= 5) si = 3;
    else si = 6;

    if (sj <= 2) sj = 0;
    else if (sj <= 5) sj = 3;
    else sj = 6;

    let num3 = new Array(10).fill(0);
    for (let k = 0; k < 3; k++) {
        for (let l = 0; l < 3; l++) {
            if (field[si + k][sj + l] === -1) {
                continue;
            }
            if (num3[field[si + k][sj + l]] === 1) {
                return false;
            } else {
                num3[field[si + k][sj + l]]++;
            }
        }
    }
    return true;
}

// 再帰的に盤面を求めていく関数
function rec(field) {
    let flag = true;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (field[i][j] === -1) {
                flag = false;
            }
        }
    }
    if (flag) {
        for(let i=1; i<=9; i++) {
            for(let j=1; j<=9; j++) {
                var out_id = "output" + i + j;
                document.getElementById(out_id).value = field[i-1][j-1];
            }
        }
        return;
    }

    let si = -1, sj = -1;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (field[i][j] === -1) {
                si = i;
                sj = j;
            }
        }
    }

    for (let k = 1; k < 10; k++) {
        field[si][sj] = k;
        if (!check(field, si, sj)) continue;
        rec(field);
    }
    field[si][sj] = -1;
}

var field = new Array(9)
for(let i=0; i<9; i++) {
    field[i] = new Array(9);
}

function checkInput() {
    for(let i=1; i<=9; i++) {
        for(let j=1; j<=9; j++) {
            var in_id = "input" + i + j;
            field[i-1][j-1] = document.getElementById(in_id).value;
            if(!field[i-1][j-1]) field[i-1][j-1] = -1;
        }
    }
}

// ボタンの要素を取得
var button = document.getElementById("button");
 
// 計算開始ボタンが押されたら計算を開始する
button.addEventListener("click", function(e) {
    e.preventDefault();
    rec(field);
});