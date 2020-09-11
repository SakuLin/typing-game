'use strict';

{
    const words = [
        'red',
        'blue',
        'pink',
        'alcohol',
        'apple juice',
        'beer',
        'cocoa',
        'coffee',
        'cola',
        'drink',
        'fruit juice',
        'green tea',
        'iced coffee',
        'iced tea',
        'juice',
        'lemonade',
        'milk',
        'natural water',
        'oolong tea',
        'orange juice',
        'sake',
        'soda',
        'soft drink',
        'soup',
        'soy milk',
        'tea',
        'tomato juice',
        'vegetable juice',
        'water',
        'whiskey',
        'wine',
    ]

    function setWord() {
        // word = words[Math.floor(Math.random() * words.length)];
        word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
        target.textContent = word;
        loc = 0;
    }

    function timecount() {
        // console.log('Start: ', dt);
        let endDt = new Date(dt.getTime() + sec * 1000);
        // console.log('End: ', endDt);

        let count = sec;
        let id = setInterval(function(){
            count--;
            // console.log(count);
            counter.textContent = `Timer: ${count} sec`;
            dt = new Date();
            if (dt.getTime() >= endDt.getTime()){
                clearInterval(id);
                // console.log('Finish!');
                isFinish = true;
                pGameFinish();
            }
        }, 1000);
    }

    function pGameFinish() {
        // result.textContent = 'Finish!';
        counter.textContent = '';
        target.textContent = '';

        const thisScore = typeCount * 50;
        const thisDate = `${dt.getFullYear()}.${dt.getMonth()+1}.${dt.getDate()} ${('0'+dt.getHours()).slice(-2)}:${('0'+dt.getMinutes()).slice(-2)}:${('0'+dt.getSeconds()).slice(-2)}`;
        console.log(thisDate);

        let isLower = false;

        let score1 = localStorage.getItem('score1');
        let score2 = localStorage.getItem('score2');
        let score3 = localStorage.getItem('score3');
        let date1 = localStorage.getItem('date1');
        let date2 = localStorage.getItem('date2');
        let date3 = localStorage.getItem('date3');

        if (score1 === null) { // はじめてゲームプレイした時
            score1 = thisScore;
            date1 = thisDate;
        } else if (score2 === null) { // 2回目にゲームプレイした時
            if (score1 <= thisScore) {
                score2 = score1;
                date2 = date1;
                score1 = thisScore;
                date1 = thisDate;
            } else {
                score2 = thisScore;
                date2 = thisDate;
            }
        // } else if (score3 === null) { // 3回目にゲームプレイした時
        //     if (score1 <= thisScore) {
        //         score3 = score2;
        //         date3 = date2;
        //         score2 = score1;
        //         date2 = date1;
        //         score1 = thisScore;
        //         date1 = thisDate;
        //     } else if (score2 <= thisScore) {
        //         score3 = score2;
        //         date3 = date2;
        //         score2 = thisScore;
        //         date2 = thisDate;
        //     } else {
        //         score3 = thisScore;
        //         date3 = thisDate;
        //     }
        } else { // 4回目以降のゲームプレイ時
            if (score1 <= thisScore) {
                score3 = score2;
                date3 = date2;
                score2 = score1;
                date2 = date1;
                score1 = thisScore;
                date1 = thisDate;
            } else if (score2 <= thisScore) {
                score3 = score2;
                date3 = date2;
                score2 = thisScore;
                date2 = thisDate;
            } else if (score3 <= thisScore || score3 === null) {
                score3 = thisScore;
                date3 = thisDate;
            } else {
                isLower = true;
            }
        }
        // ローカルストレージの上書き。変更無くても上書きすることになっているけど、今回はこれでおーけー
        localStorage.setItem('score1', score1);
        localStorage.setItem('score2', score2);
        localStorage.setItem('score3', score3);
        localStorage.setItem('date1', date1);
        localStorage.setItem('date2', date2);
        localStorage.setItem('date3', date3);
        
        if (isLower === true) {
            result.innerHTML = `<table id="resultTable">
                                    <tr>
                                        <th></th>
                                        <th>Score</th>
                                        <th>Date</th>
                                    </tr>
                                    <tr>
                                        <td>1.</td>
                                        <td>${score1}</td>
                                        <td>${date1}</td>
                                    </tr>
                                    <tr>
                                        <td>2.</td>
                                        <td>${score2}</td>
                                        <td>${date2}</td>
                                    </tr>
                                    <tr>
                                        <td>3.</td>
                                        <td>${score3}</td>
                                        <td>${date3}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>${thisScore}</td>
                                        <td>${thisDate}</td>
                                    </tr>
                                </table>`;
            // result.innerHTML = 'hello';
        } else {
            result.innerHTML = `<table>
                                    <tr>
                                        <th></th>
                                        <th>Score</th>
                                        <th>Date</th>
                                    </tr>
                                    <tr>
                                        <td>1.</td>
                                        <td>${score1}</td>
                                        <td>${date1}</td>
                                    </tr>
                                    <tr>
                                        <td>2.</td>
                                        <td>${score2}</td>
                                        <td>${date2}</td>
                                    </tr>
                                    <tr>
                                        <td>3.</td>
                                        <td>${score3}</td>
                                        <td>${date3}</td>
                                    </tr>
                                </table>`;
        }

    }

    let word;
    let loc = 0;
    let sec = 30; // 制限時間
    let typeCount = 0; // カウンター
    let startTime;
    let dt;
    let isPlaying = false; // クリックの管理
    let isFinish = false;  // ゲーム終了の判定

    const target = document.getElementById('target');
    const counter = document.getElementById('counter');
    const result = document.getElementById('result');
    const myscore = document.getElementById('myscore');

    document.addEventListener('click', () => {
        if (isPlaying === true) {
            return;
        }
        isPlaying = true;
        startTime = Date.now();
        dt = new Date();
        console.log(startTime);
        console.log(dt);
        setWord();
        myscore.textContent = 'Type 0  Score : 0';
        counter.textContent = `Timer: ${sec} sec`;
        timecount();
    });

    document.addEventListener('keydown', e => {
        if (e.key !== word[loc]) {
            return;
        }
        if (isFinish === true) {
            target.textContent = '';
            return;
        }
        typeCount++;
        loc++;
        // 1: _ed
        // 2: __d
        // 3: ___
        target.textContent = '_'.repeat(loc) + word.substring(loc);
        myscore.textContent = `Type ${typeCount}  Score : ${typeCount * 50}`;
        if (loc === word.length) {
            setWord();
        }
    });
}