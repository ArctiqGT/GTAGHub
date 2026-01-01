document.addEventListener('DOMContentLoaded', () => {

  const sections = document.querySelectorAll('.page-section');
  const navLinks = document.querySelectorAll('.sidebar a');

  function showSection(id) {
    sections.forEach(section => {
      section.classList.toggle('active', section.id === id);
    });

    navLinks.forEach(link => {
      link.toggleAttribute('aria-current', link.dataset.section === id);
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.dataset.section;
      showSection(target);
      history.replaceState(null, '', `#${target}`);
    });
  });

  const initialSection = location.hash.replace('#', '') || 'about';
  showSection(initialSection);

  const sfxData = [
    { name: "Ankles Snap", src: "/GTAGHub/sfx/AnklesSnap.mp3" },
    { name: "Baby Laugh", src: "/GTAGHub/sfx/BabyLaughing.mp3" },
    { name: "Beep", src: "/GTAGHub/sfx/beep.mp3" },
    { name: "Bloop Button", src: "/GTAGHub/sfx/BloopButton.mp3" },
    { name: "Border", src: "/GTAGHub/sfx/Border.mp3" },
    { name: "Bruh", src: "/GTAGHub/sfx/Bruh.mp3" },
    { name: "Camera Flash", src: "/GTAGHub/sfx/CameraFlash.mp3" },
    { name: "Cash", src: "/GTAGHub/sfx/Cash.mp3" },
    { name: "Chica Jumpscare", src: "/GTAGHub/sfx/ChicaJumpscare.mp3" },
    { name: "Coin Ding", src: "/GTAGHub/sfx/CoinDing.wav" },
    { name: "Creamy Click", src: "/GTAGHub/sfx/CreamyClick.mp3" },
    { name: "Dial", src: "/GTAGHub/sfx/DialUp.mp3" },
    { name: "Discord Notify", src: "/GTAGHub/sfx/discord-message.mp3" },
    { name: "Epic Twinkle", src: "/GTAGHub/sfx/EpicTwinkle.mp3" },
    { name: "Half Life SFX", src: "/GTAGHub/sfx/HalfLifeSFX.wav" },
    { name: "Jet Set Radio", src: "/GTAGHub/sfx/JetSetRadio.mp3" },
    { name: "MC Hit", src: "/GTAGHub/sfx/MCHit.mp3" },
    { name: "Pan", src: "/GTAGHub/sfx/Pan.mp3" },
    { name: "Particle SFX", src: "/GTAGHub/sfx/ParticleSFX.mp3" },
    { name: "Sliding Stone", src: "/GTAGHub/sfx/SlidingStone.mp3" },
    { name: "Tap TV SFX", src: "/GTAGHub/sfx/taptv.mp3" },
    { name: "Vine Boom", src: "/GTAGHub/sfx/vineboom.mp3" },
    { name: "Wii Bowling Strike", src: "/GTAGHub/sfx/WiiBowlingStrike.mp3" },
    { name: "Yikes Intro Audio", src: "/GTAGHub/sfx/YikesIntroAudio.mp3" }
  ];

  const sfxGrid = document.getElementById('sfx-grid');
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');

  if (!sfxGrid || !searchInput || !searchButton) {
    return;
  }

  function getAudioType(src) {
    if (src.endsWith('.wav')) return 'audio/wav';
    if (src.endsWith('.mp3')) return 'audio/mpeg';
    if (src.endsWith('.ogg')) return 'audio/ogg';
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
      card.tabIndex = 0;

      card.innerHTML = `
        <h3>${sfx.name}</h3>
        <audio controls preload="none">
          <source src="${sfx.src}" type="${getAudioType(sfx.src)}">
          Your browser does not support the audio element.
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
    const filtered = sfxData.filter(sfx =>
      sfx.name.toLowerCase().includes(query)
    );
    renderSFX(filtered);
  }

  renderSFX(sfxData);

  searchInput.addEventListener('input', filterSFX);
  searchButton.addEventListener('click', e => {
    e.preventDefault();
    filterSFX();
  });

});

