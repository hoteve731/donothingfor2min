window.onload = function() {
    var timeLeft = 60;
    var initialMessage = document.getElementById('initial-message');
    var tenSecondMessage = document.getElementById('ten-second-message');
    var selfExamImage = document.getElementById('self-exam-image');
    var timerElem = document.getElementById('timer');
    var retryMessage = document.getElementById('retry-message');
    var endMessage = document.getElementById('end-message');
    var interval;

    function startTimer() {
        interval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        timerElem.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        timeLeft--;

        if (timeLeft === 50) {
            tenSecondMessage.classList.remove('hidden');
            selfExamImage.classList.remove('hidden');
        }

        if (timeLeft < 0) {
            clearInterval(interval);
            initialMessage.style.display = 'none';
            tenSecondMessage.style.display = 'none';
            selfExamImage.style.display = 'none';
            timerElem.classList.add('hidden');
            retryMessage.style.display = 'none';
            endMessage.classList.remove('hidden');
        }
    }

    startTimer();

    function resetTimer() {
        if (timeLeft > 0) {
            clearInterval(interval);
            timeLeft = 60;
            timerElem.textContent = "1:00";
            timerElem.classList.add('timer-red');
            retryMessage.style.display = 'block';
            setTimeout(function() {
                timerElem.classList.remove('timer-red');
                retryMessage.style.display = 'none';
            }, 1000);
            tenSecondMessage.classList.add('hidden');
            selfExamImage.classList.add('hidden');
            startTimer();
        }
    }

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('touchstart', resetTimer);
};
