const sfxData = [
    {
        name: "Ankles Snap",
        src: "../sfx/AnklesSnap.mp3"
    },
    {
        name: "Baby Laugh",
        src: "../sfx/BabyLaughing.mp3"
    },
    {
        name: "Beep",
        src: "../sfx/beep.mp3"
    },
    {
        name: "Bloop Button",
        src: "../sfx/BloopButton.mp3"
    },
    {
        name: "Border",
        src: "../sfx/Border.mp3"
    },
    {
        name: "Bruh",
        src: "../sfx/Bruh.mp3"
    },
    {
        name: "Camera Flash",
        src: "../sfx/CameraFlash.mp3"
    },
    {
        name: "Cash",
        src: "../sfx/Cash.mp3"
    },
    {
        name: "Chica Jumpscare",
        src: "../sfx/ChicaJumpscare.mp3"
    },
    {
        name: "Coin Ding",
        src: "../sfx/CoinDing.mp3"
    },
    {
        name: "Creamy Click",
        src: "../sfx/CreamyClick.mp3"
    },
    {
        name: "Dial",
        src: "../sfx/DialUp.mp3"
    },
    {
        name: "Discord Notify",
        src: "../sfx/Discord-message.mp3"
    },
    {
        name: "Epic Twinkle",
        src: "../sfx/EpicTwinkle.mp3"
    },
    {
        name: "Half Life SFX",
        src: "../sfx/HalfLifeSFX.mp3"
    },
    {
        name: "Jet Set Radio",
        src: "../sfx/JetSetRadio.mp3"
    },
    {
        name: "MC Hit",
        src: "../sfx/MCHit.mp3"
    },
    {
        name: "Pan",
        src: "../sfx/Pan.mp3"
    },
    {
        name: "Particle SFX",
        src: "../sfx/ParticleSFX.mp3"
    },
    {
        name: "Sliding Stone",
        src: "../sfx/SlidingStone.mp3"
    },
    {
        name: "Tap TV SFX",
        src: "../sfx/taptv.mp3"
    },
    {
        name: "Vine Boom",
        src: "../sfx/vineboom.mp3"
    },
    {
        name: "Wii Bowling Strike",
        src: "../sfx/WiiBowlingStrike.mp3"
    },
    {
        name: "Yikes Intro Audio",
        src: "../sfx/YikesIntroAudio.mp3"
    }
];

const sfxGrid = document.getElementById('sfx-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

if (!sfxGrid || !searchInput || !searchButton) {
    console.error('Missing required elements: sfx-grid, search-input, or search-button.');
}

function sanitizeFilename(name) {
    return name.replace(/\W+/g, '_').toLowerCase();
}

function renderSFX(filteredData) {
    sfxGrid.innerHTML = '';
    if (filteredData.length === 0) {
        sfxGrid.innerHTML = '<p>No sound effects found.</p>';
        return;
    }

    filteredData.forEach(sfx => {
        const card = document.createElement('article');
        card.className = 'sfx-card';
        card.tabIndex = 0;

        card.innerHTML = `
            <h3>${sfx.name}</h3>
            <audio controls preload="none" aria-label="${sfx.name} preview">
              <source src="${sfx.src}" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
            <a href="${sfx.src}" download="${sanitizeFilename(sfx.name)}.mp3" class="download-btn" aria-label="Download ${sfx.name} sound effect">Download</a>
        `;

        sfxGrid.appendChild(card);
    });
}

function filterSFX() {
    const query = searchInput.value.toLowerCase();
    const filtered = sfxData.filter(sfx =>
        sfx.name.toLowerCase().includes(query)
    );
    renderSFX(filtered);
}

renderSFX(sfxData);

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    filterSFX();
});
searchInput.addEventListener('input', filterSFX);
