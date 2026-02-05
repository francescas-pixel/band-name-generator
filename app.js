// Now Starting a Band - Band Name Generator
// A Spotify Marketing Experience

document.addEventListener('DOMContentLoaded', () => {
    // Mock data - Top Songs with real album artwork
    const topSongs = [
        {
            title: "Good Luck, Babe!",
            artist: "Chappell Roan",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/29/a7/c4/29a7c478-351d-25eb-a116-3e68118cdab8/24UMGIM31246.rgb.jpg/500x500bb.jpg"
        },
        {
            title: "Espresso",
            artist: "Sabrina Carpenter",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/a1/1c/ca/a11ccab6-7d4c-e041-d028-998bcebeb709/24UMGIM61704.rgb.jpg/500x500bb.jpg"
        },
        {
            title: "Not Like Us",
            artist: "Kendrick Lamar",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/31/3a/3f/313a3fbc-bb8f-80c7-b5a2-e226869a38cd/24UMGIM51924.rgb.jpg/500x500bb.jpg"
        },
        {
            title: "Birds of a Feather",
            artist: "Billie Eilish",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/92/9f/69/929f69f1-9977-3a44-d674-11f70c852d1b/24UMGIM36186.rgb.jpg/500x500bb.jpg"
        },
        {
            title: "Beautiful Things",
            artist: "Benson Boone",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/b4/71/42/b4714219-fa20-e534-5297-08c2580bc3c1/24UMGIM08270.rgb.jpg/500x500bb.jpg"
        },
        {
            title: "Lose Control",
            artist: "Teddy Swims",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/4e/40/93/4e409396-a558-c0ee-07f3-511193f9a104/093624852711.jpg/500x500bb.jpg"
        },
        {
            title: "Pink Friday Girls",
            artist: "Nicki Minaj",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/4f/df/cc/4fdfcc6c-fd68-85d0-a8cf-8c6e9f0b34a0/24UMGIM07541.rgb.jpg/500x500bb.jpg"
        },
        {
            title: "Stick Season",
            artist: "Noah Kahan",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music122/v4/59/3d/0c/593d0c73-8c3c-c890-efb7-347420e05f90/810090090924.jpg/500x500bb.jpg"
        },
        {
            title: "Cruel Summer",
            artist: "Taylor Swift",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e0/d5/7b/e0d57b28-4d2f-5c14-d346-f5e1a06dc561/19UMGIM57098.rgb.jpg/500x500bb.jpg"
        },
        {
            title: "Water",
            artist: "Tyla",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/c3/d5/08/c3d5088d-3b24-0e03-3fd6-6e4cf3efcf76/196871349413.jpg/500x500bb.jpg"
        },
        {
            title: "Vampire",
            artist: "Olivia Rodrigo",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8c/32/a1/8c32a197-60cb-a36d-1a1c-24b61d93ae7f/23UM1IM07174.rgb.jpg/500x500bb.jpg"
        },
        {
            title: "Snooze",
            artist: "SZA",
            artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/0d/4f/9b/0d4f9b76-1e3b-d56e-cc73-ade6f12d83c4/196589418838.jpg/500x500bb.jpg"
        }
    ];

    // Mock data - Top Podcasts
    const topPodcasts = [
        { title: "Call Her Daddy", host: "Alex Cooper" },
        { title: "The Joe Rogan Experience", host: "Joe Rogan" },
        { title: "Crime Junkie", host: "Ashley Flowers" },
        { title: "New Heights", host: "Travis & Jason Kelce" },
        { title: "SmartLess", host: "Bateman, Arnett & Hayes" },
        { title: "The Daily", host: "The New York Times" },
        { title: "Huberman Lab", host: "Andrew Huberman" },
        { title: "Armchair Expert", host: "Dax Shepard" },
        { title: "Conan Needs a Friend", host: "Conan O'Brien" },
        { title: "Anything Goes", host: "Emma Chamberlain" },
        { title: "On Purpose", host: "Jay Shetty" },
        { title: "The Diary of a CEO", host: "Steven Bartlett" },
        { title: "Wiser Than Me", host: "Julia Louis-Dreyfus" },
        { title: "Hot Ones", host: "Sean Evans" },
        { title: "Table Manners", host: "Jessie Ware" }
    ];

    // Current selection
    let selectedSong = null;
    let selectedPodcast = null;
    let bandName = '';

    // Helper functions
    function getFirstWord(str) {
        return str.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    }

    function getLastWord(str) {
        const words = str.split(' ');
        return words[words.length - 1].replace(/[^a-zA-Z]/g, '');
    }

    function generateBandName() {
        selectedSong = topSongs[Math.floor(Math.random() * topSongs.length)];
        selectedPodcast = topPodcasts[Math.floor(Math.random() * topPodcasts.length)];

        const firstWord = getFirstWord(selectedSong.title);
        const lastWord = getLastWord(selectedPodcast.title);
        bandName = `${firstWord} ${lastWord}`;

        // Update the UI with selected data
        updateUI();
    }

    function formatSongTitleWithHighlight(title) {
        const firstWord = getFirstWord(title);
        const rest = title.substring(firstWord.length).trim();
        if (rest) {
            return `<span class="highlight-word">${firstWord}</span> ${rest}`;
        }
        return `<span class="highlight-word">${firstWord}</span>`;
    }

    function formatPodcastTitleWithHighlight(title) {
        const words = title.split(' ');
        const lastWord = words[words.length - 1];
        const rest = words.slice(0, -1).join(' ');
        if (rest) {
            return `${rest} <span class="highlight-word">${lastWord}</span>`;
        }
        return `<span class="highlight-word">${lastWord}</span>`;
    }

    function updateUI() {
        // Update song screen
        document.getElementById('song-artwork').src = selectedSong.artwork;
        document.getElementById('song-title').innerHTML = formatSongTitleWithHighlight(selectedSong.title);
        document.getElementById('song-artist').textContent = selectedSong.artist;

        // Update podcast screen
        document.getElementById('podcast-title').innerHTML = formatPodcastTitleWithHighlight(selectedPodcast.title);
        document.getElementById('podcast-host').textContent = selectedPodcast.host;

        // Update result screen
        document.getElementById('band-name-text').textContent = bandName;
        document.getElementById('formula-song').textContent = `"${getFirstWord(selectedSong.title)}" from ${selectedSong.title}`;
        document.getElementById('formula-podcast').textContent = `"${getLastWord(selectedPodcast.title)}" from ${selectedPodcast.title}`;
    }

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

        // Copy to clipboard
        navigator.clipboard.writeText(`My band name is ${bandName}! 🤘 Find yours at ${window.location.href}`).then(() => {
            btnShare.textContent = 'Copied to clipboard!';
            btnShare.style.background = '#000';

            setTimeout(() => {
                btnShare.innerHTML = '<span class="share-icon">↗</span> Share your band name';
                btnShare.style.background = '#1DB954';
            }, 2000);
        });
    }

    // Restart experience
    function restart() {
        playClickSound();

        // Generate new random data
        generateBandName();

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
        generateBandName();
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
