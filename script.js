let player;

// This function is called by the YouTube IFrame API when it's ready
window.onYouTubeIframeAPIReady = function() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        videoId: 'RHoz72OOsZE',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'RHoz72OOsZE' // Required for looping single video
        },
        events: {
            'onReady': () => console.log("Kathang Isip is ready to play! 🎵")
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('forgiveBtn');
    const msg = document.getElementById('thankYouMsg');
    const musicToggle = document.getElementById('musicToggle');
    const heartsContainer = document.getElementById('heartsContainer');

    // Music Toggle Logic
    let isPlaying = false;
    musicToggle.addEventListener('click', () => {
        if (!player || typeof player.playVideo !== 'function') {
            musicToggle.textContent = '⏳ Loading Music...';
            setTimeout(() => {
                musicToggle.textContent = '🎵 Music On/Off';
            }, 2000);
            return;
        }

        if (isPlaying) {
            player.pauseVideo();
            musicToggle.textContent = '🎵 Music Off';
            musicToggle.classList.remove('playing');
        } else {
            player.playVideo();
            musicToggle.textContent = '🎶 Music Playing';
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    // Create floating background hearts
    function createBgHeart() {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 5 + 5 + 's';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }
    // Generate hearts every 400ms
    setInterval(createBgHeart, 400);

    // Initial batch of hearts
    for(let i = 0; i < 5; i++) {
        setTimeout(createBgHeart, i * 200);
    }

    // Button Click Logic
    btn.addEventListener('click', () => {
        // Trigger Confetti using canvas-confetti library
        var duration = 3 * 1000;
        var animationEnd = Date.now() + duration;
        var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        var interval = setInterval(function() {
            var timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            var particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti(Object.assign({}, defaults, { 
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 250);

        // UI Changes
        btn.style.display = 'none';
        msg.style.display = 'block';
    });
});
