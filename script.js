document.addEventListener('DOMContentLoaded', () => {

  const sfxData = [
    { name: "Ankles Snap", src: "/Arctiqs-Portfolio/sfx/AnklesSnap.mp3" },
    { name: "Baby Laugh", src: "/Arctiqs-Portfolio/sfx/BabyLaughing.mp3" },
    { name: "Beep", src: "/Arctiqs-Portfolio/sfx/beep.mp3" },
    { name: "Bloop Button", src: "/Arctiqs-Portfolio/sfx/BloopButton.mp3" },
    { name: "Border", src: "/Arctiqs-Portfolio/sfx/Border.mp3" },
    { name: "Bruh", src: "/Arctiqs-Portfolio/sfx/Bruh.mp3" },
    { name: "Camera Flash", src: "/Arctiqs-Portfolio/sfx/CameraFlash.mp3" },
    { name: "Cash", src: "/Arctiqs-Portfolio/sfx/Cash.mp3" },
    { name: "Chica Jumpscare", src: "/Arctiqs-Portfolio/sfx/ChicaJumpscare.mp3" },
    { name: "Coin Ding", src: "/Arctiqs-Portfolio/sfx/CoinDing.wav" },
    { name: "Creamy Click", src: "/Arctiqs-Portfolio/sfx/CreamyClick.mp3" },
    { name: "Dial", src: "/Arctiqs-Portfolio/sfx/DialUp.mp3" },
    { name: "Discord Notify", src: "/Arctiqs-Portfolio/sfx/discord-message.mp3" },
    { name: "Epic Twinkle", src: "/Arctiqs-Portfolio/sfx/EpicTwinkle.mp3" },
    { name: "Half Life SFX", src: "/Arctiqs-Portfolio/sfx/HalfLifeSFX.wav" },
    { name: "Jet Set Radio", src: "/Arctiqs-Portfolio/sfx/JetSetRadio.mp3" },
    { name: "MC Hit", src: "/Arctiqs-Portfolio/sfx/MCHit.mp3" },
    { name: "Pan", src: "/Arctiqs-Portfolio/sfx/Pan.mp3" },
    { name: "Particle SFX", src: "/Arctiqs-Portfolio/sfx/ParticleSFX.mp3" },
    { name: "Sliding Stone", src: "/Arctiqs-Portfolio/sfx/SlidingStone.mp3" },
    { name: "Tap TV SFX", src: "/Arctiqs-Portfolio/sfx/taptv.mp3" },
    { name: "Vine Boom", src: "/Arctiqs-Portfolio/sfx/vineboom.mp3" },
    { name: "Wii Bowling Strike", src: "/Arctiqs-Portfolio/sfx/WiiBowlingStrike.mp3" },
    { name: "Yikes Intro Audio", src: "/Arctiqs-Portfolio/sfx/YikesIntroAudio.mp3" }
  ];

  const sfxGrid = document.getElementById('sfx-grid');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  function getAudioType(src) {
    if (src.endsWith('.wav')) return 'audio/wav';
    if (src.endsWith('.mp3')) return 'audio/mpeg';
    return '';
  }

  function sanitizeFilename(name) {
    return name.replace(/\W+/g, '_').toLowerCase();
  }

  function getExtension(src) {
    return src.split('.').pop();
  }

  function renderSFX(list) {
    sfxGrid.innerHTML = '';

    if (!list.length) {
      sfxGrid.innerHTML = '<p>No sound effects found.</p>';
      return;
    }

    list.forEach(sfx => {
      const card = document.createElement('article');
      card.className = 'sfx-card';
      card.innerHTML = `
        <h3>${sfx.name}</h3>
        <audio controls preload="none">
          <source src="${sfx.src}" type="${getAudioType(sfx.src)}">
        </audio>
        <a href="${sfx.src}"
           download="${sanitizeFilename(sfx.name)}.${getExtension(sfx.src)}"
           class="download-btn">
          Download
        </a>
      `;
      sfxGrid.appendChild(card);
    });
  }

  function filterSFX() {
    const query = searchInput.value.toLowerCase();
    renderSFX(
      sfxData.filter(sfx => sfx.name.toLowerCase().includes(query))
    );
  }

  renderSFX(sfxData);

  searchInput.addEventListener('input', filterSFX);
  searchButton.addEventListener('click', e => {
    e.preventDefault();
    filterSFX();
  });

  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.sidebar a');

  function showSection(id) {
    sections.forEach(section =>
      section.classList.toggle('active', section.id === id)
    );

    navLinks.forEach(link =>
      link.toggleAttribute('aria-current', link.dataset.section === id)
    );
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      showSection(link.dataset.section);
    });
  });

  showSection(location.hash.replace('#', '') || 'about');
});
