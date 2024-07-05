document.addEventListener('DOMContentLoaded', () => {
    let startTime;
    let elapsedTime = 0;
    let running = false;
    let timer;

    const display = document.getElementById('display');
    const startBtn = document.getElementById('start');
    const stopBtn = document.getElementById('stop');
    const resetBtn = document.getElementById('reset');
    const deleteBtn = document.getElementById('deleteBtn');
    const selectAllBtn = document.getElementById('selectAllBtn');
    const recordList = document.getElementById('recordList');

    startBtn.addEventListener('click', () => {
        if (!running) {
            startTime = Date.now() - elapsedTime;
            running = true;
            requestAnimationFrame(updateDisplay);
        }
    });

    stopBtn.addEventListener('click', () => {
        if (running) {
            running = false;
            cancelAnimationFrame(timer);
            addRecord(elapsedTime); // 스톱 버튼을 눌렀을 때 구간 기록 추가
        }
    });

    resetBtn.addEventListener('click', () => {
        elapsedTime = 0;
        display.textContent = '00:00'; // 디스플레이만 초기화
    });

    deleteBtn.addEventListener('click', () => {
        const selectedRecords = document.querySelectorAll('.record__item.selected');
        selectedRecords.forEach(record => record.remove());
    });

    selectAllBtn.addEventListener('click', () => {
        const allRecords = document.querySelectorAll('.record__item');
        allRecords.forEach(record => record.classList.add('selected'));
        selectAllBtn.classList.toggle('selected');
    });

    function updateDisplay() {
        elapsedTime = Date.now() - startTime;
        display.textContent = formatTime(elapsedTime);
        if (running) {
            timer = requestAnimationFrame(updateDisplay);
        }
    }

    function formatTime(time) {
        const seconds = String(Math.floor(time / 1000)).padStart(2, '0');
        const hundredths = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
        return `${seconds}:${hundredths}`;
    }

    function addRecord(time) {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record__item');

        const selectBtn = document.createElement('button');
        selectBtn.classList.add('select-btn');
        selectBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        selectBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            recordItem.classList.toggle('selected');
        });

        recordItem.appendChild(selectBtn);
        recordItem.appendChild(document.createTextNode(formatTime(time)));

        recordItem.addEventListener('click', () => {
            recordItem.classList.toggle('selected');
        });

        recordList.appendChild(recordItem);
    }
});
