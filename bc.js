window.onload = function() {
    var timeLeft = 60;
    var initialMessage = document.getElementById('initial-message');
    var tenSecondMessage = document.getElementById('ten-second-message');
    var selfExamImage = document.getElementById('self-exam-image');
    var timerElem = document.getElementById('timer');
    var retryMessage = document.getElementById('retry-message');
    var endMessage = document.getElementById('end-message');
    var interval;
    var touchStartY;

    var retryButton = document.getElementById('retry-button');
    var shareButton = document.getElementById('share-button');

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

    startTimer(); // 페이지 로드 시 타이머 시작

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

    window.addEventListener('touchstart', function(event) {
        touchStartY = event.touches[0].clientY;
    });

    window.addEventListener('touchend', function(event) {
        var touchEndY = event.changedTouches[0].clientY;
        if (Math.abs(touchStartY - touchEndY) < 10) {
            resetTimer();
        }
    });

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);

    // 다시하기 버튼 이벤트 리스너
    retryButton.addEventListener('click', function() {
        window.location.reload();
    });

    // 공유하기 버튼 이벤트 리스너
    shareButton.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: '도전! 1분 참기 챌린지',
                url: window.location.href
            }).then(() => {
                alert('공유되었습니다!');
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('URL이 클립보드에 복사되었습니다.');
            }).catch(console.error);
        }
    });
};
