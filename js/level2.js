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
                pGameFinish(sec);
            }
        }, 1000);
    }

    function pGameFinish() {
        result.textContent = 'Finish!';
        counter.textContent = '';
        target.textContent = '';
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