// Now Starting a Band - Band Name Generator
// A Spotify Marketing Experience

document.addEventListener('DOMContentLoaded', () => {
    // Screen elements
    const screens = {
        home: document.getElementById('screen-home'),
        intro: document.getElementById('screen-intro'),
        song: document.getElementById('screen-song'),
        podcast: document.getElementById('screen-podcast'),
        result: document.getElementById('screen-result')
    };

    // Buttons
    const banner = document.getElementById('start-banner');
    const btnIntro = document.getElementById('btn-intro');
    const btnSong = document.getElementById('btn-song');
    const btnPodcast = document.getElementById('btn-podcast');
    const btnShare = document.getElementById('btn-share');
    const btnRestart = document.getElementById('btn-restart');

    // Audio context for interaction sounds
    let audioContext;

    function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    function playTone(frequency, duration, type = 'sine') {
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    }

    function playClickSound() {
        playTone(800, 0.1, 'sine');
    }

    function playRevealSound() {
        // Ascending arpeggio for reveal
        playTone(523, 0.15, 'sine'); // C5
        setTimeout(() => playTone(659, 0.15, 'sine'), 100); // E5
        setTimeout(() => playTone(784, 0.15, 'sine'), 200); // G5
        setTimeout(() => playTone(1047, 0.3, 'sine'), 300); // C6
    }

    // Screen transition
    function goToScreen(from, to) {
        playClickSound();

        screens[from].classList.remove('active');
        screens[from].classList.add('exit');

        setTimeout(() => {
            screens[from].classList.remove('exit');
            screens[to].classList.add('active');

            // Special handling for result screen
            if (to === 'result') {
                playRevealSound();
                createConfetti();
            }
        }, 300);
    }

    // Confetti effect
    function createConfetti() {
        const container = document.getElementById('confetti');
        container.innerHTML = '';

        const colors = ['#FF6B6B', '#FF8E53', '#FFC75F', '#1DB954', '#fff'];
        const shapes = ['circle', 'square', 'triangle'];

        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 0.5;
            const duration = 2 + Math.random() * 2;
            const rotation = Math.random() * 360;
            const size = 8 + Math.random() * 8;

            confetti.style.cssText = `
                left: ${left}%;
                top: -20px;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                animation: confettiFall ${duration}s ease-out ${delay}s forwards;
                transform: rotate(${rotation}deg);
                ${shape === 'circle' ? 'border-radius: 50%;' : ''}
                ${shape === 'triangle' ? `
                    width: 0;
                    height: 0;
                    background: transparent;
                    border-left: ${size/2}px solid transparent;
                    border-right: ${size/2}px solid transparent;
                    border-bottom: ${size}px solid ${color};
                ` : ''}
            `;

            container.appendChild(confetti);
        }

        // Add confetti animation to stylesheet
        if (!document.getElementById('confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    0% {
                        opacity: 1;
                        transform: translateY(0) rotate(0deg);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(800px) rotate(720deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Simulate share functionality
    function shareResult() {
        playClickSound();

        // Create a visual feedback
        btnShare.textContent = 'Copied to clipboard!';
        btnShare.style.background = '#000';

        setTimeout(() => {
            btnShare.innerHTML = '<span class="share-icon">↗</span> Share your band name';
            btnShare.style.background = '#1DB954';
        }, 2000);

        // In a real app, this would trigger native share or copy
        console.log('Sharing: Your band name is Good Daddy!');
    }

    // Restart experience
    function restart() {
        playClickSound();

        // Hide all screens
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active', 'exit');
        });

        // Show home screen
        setTimeout(() => {
            screens.home.classList.add('active');
        }, 300);
    }

    // Event listeners
    banner.addEventListener('click', () => {
        initAudio();
        goToScreen('home', 'intro');
    });

    btnIntro.addEventListener('click', () => goToScreen('intro', 'song'));
    btnSong.addEventListener('click', () => goToScreen('song', 'podcast'));
    btnPodcast.addEventListener('click', () => goToScreen('podcast', 'result'));
    btnShare.addEventListener('click', shareResult);
    btnRestart.addEventListener('click', restart);

    // Add hover sound effects
    const allButtons = document.querySelectorAll('button, .promo-banner');
    allButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            if (audioContext) {
                playTone(600, 0.05, 'sine');
            }
        });
    });

    // Initialize - home screen is active by default
    screens.home.classList.add('active');
});
