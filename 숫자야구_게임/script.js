//전역 변수 선언
let answer_numbers = [];
let attempts_remaining;

//초기화
function init(){
    attempts_remaining = 10;
    answer_numbers = random_3num(); 
    document.querySelectorAll('.input-field').forEach(input=>input.value='')
    document.querySelector('.result-display').innerHTML = '';
    document.getElementById('game-result-img').style.display = 'none';
    document.querySelector('.submit-button').disabled = false;
   //디버깅용
   //console.log(answer_numbers);
}

//랜덤 숫자 생성
function random_3num(){
    const numbers = [];
    /*
    for(let i = 0;i < 3; i++) {
        const num = Math.floor(Math.random() * 10);
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    */
    //for문으로 작성 시 숫자 중복 시 해결하기 어려움 -> while문으로 수정
    while (numbers.length < 3) {
    //숫자 비교 시 더 용이하도록 문자열로 변환
        const num = Math.floor(Math.random() * 10).toString();
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}
//숫자 확인
function check_numbers() {
    const input1 = document.getElementById('number1').value;
    const input2 = document.getElementById('number2').value;
    const input3 = document.getElementById('number3').value;
    const user_numbers = [input1, input2, input3];

    if (user_numbers.includes("") || new Set(user_numbers).size !== user_numbers.length) {
        alert("3개의 각각 다른 숫자를 입력하세요.");
        document.querySelectorAll('.input-field').forEach(input => input.value = ''); //다시 초기화
        return;
    }

    const result = compare_Numbers(user_numbers, answer_numbers);
    display_Result(user_numbers, result);
    attempts_remaining--;

    if (result.strikes === 3) {
        document.getElementById('game-result-img').src = "success.png";
        document.getElementById('game-result-img').style.display = 'block';
        alert("성공!!!");
        document.querySelector('.submit-button').disabled = true;
        setTimeout(init, 2000);
    } else if (attempts_remaining === 0) {
        document.getElementById('game-result-img').src = "fail.png";
        document.getElementById('game-result-img').style.display = 'block';
        //백틱 사용으로 정답 출력
        alert(`실패... 정답은 ${answer_numbers.join(' ')}입니다`);
        document.querySelector('.submit-button').disabled = true;
        setTimeout(init, 2000);

        //setTimeout 사용하여 게임 종료시 2초 후 다시 시작

    }
}
//숫자 비교
function compare_Numbers(guess, answer_numbers) {
    let strikes = 0;
    let balls = 0;

    guess.forEach((num, i) => {
        if (num === answer_numbers[i]) {
            strikes++;
        } else if (answer_numbers.includes(num)) {
            balls++;
        }
    });

    return { strikes, balls };
}
//결과 표시
function display_Result(guess, result) {
    const resultDisplay = document.querySelector('.result-display');
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('check-result');

    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left');
    leftDiv.textContent = guess.join(' ');

    const rightDiv = document.createElement('div');
    rightDiv.classList.add('right');

    if (result.strikes === 0 && result.balls === 0) {
        const outDiv = document.createElement('div');
        outDiv.classList.add('out', 'num-result');
        outDiv.textContent = 'O';
        rightDiv.appendChild(outDiv);
    } else {
        if (result.strikes > 0) {
            const strikeDiv = document.createElement('div');
            strikeDiv.classList.add('strike', 'num-result');
            strikeDiv.textContent = `${result.strikes} S`;
            rightDiv.appendChild(strikeDiv);
        }
        if (result.balls > 0) {
            const ballDiv = document.createElement('div');
            ballDiv.classList.add('ball', 'num-result');
            ballDiv.textContent = `${result.balls} B`;
            rightDiv.appendChild(ballDiv);
        }
    }

    resultDiv.appendChild(leftDiv);
    resultDiv.appendChild(rightDiv);
    resultDisplay.appendChild(resultDiv);
}

//초기 설정
document.addEventListener('DOMContentLoaded', () => {
    init();
});