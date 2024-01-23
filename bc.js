window.onload = function() {
    var timeLeft = 5; // 5 seconds
    var initialMessage = document.getElementById('initial-message');
    var timerElem = document.getElementById('timer');
    var tryAgainMessage = document.getElementById('try-again');
    var endMessage = document.getElementById('end-message');
    var interval;

    function resetTimer() {
        if (timeLeft > 0) { // Only reset if the timer is still counting down
            clearInterval(interval);
            timeLeft = 5;
            timerElem.textContent = "0:05";
            timerElem.classList.add('red');
            tryAgainMessage.style.display = "block";
            setTimeout(function() {
                timerElem.classList.remove('red');
                tryAgainMessage.style.display = "none";
            }, 1000); // Remove red color and message after 1 second
            startTimer();
        }
    }

    function startTimer() {
        interval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        var minutes = Math.floor(timeLeft / 60);
        var seconds = timeLeft % 60;
        timerElem.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(interval);
            initialMessage.style.display = 'none';
            tryAgainMessage.style.display = 'none';
            timerElem.classList.add('hidden');
            endMessage.classList.remove('hidden');
        }
    }

    startTimer(); // Start the timer initially

    // Reset timer on mouse, keyboard, or touch interaction
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('touchstart', resetTimer);
};

document.getElementById('refreshButton').addEventListener('click', function() {
    window.location.reload();
});
