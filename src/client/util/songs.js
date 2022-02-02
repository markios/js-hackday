let playing = false;
let wrapper = null;

function init() {
  wrapper = document.createElement("div");
  wrapper.style.setProperty("position", "fixed");
  wrapper.style.setProperty("top", "-10000px");
  document.body.appendChild(wrapper);
}

let timeout;

async function playTrack(songId, seconds = 20, onSongLoad = () => {}) {
  playing = true;

  const songUrl = [
    "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/",
    songId,
    "&auto_play=true",
    "&visual=false",
  ].join("");

  // Start song
  wrapper.innerHTML = `
        <iframe
            id="song-frame"
            width="100%"
            height="300"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="${songUrl}"></iframe>
    `;

  const songFrame = document.getElementById("song-frame");

  // Wait for it to load
  await new Promise((res, rej) => {
    songFrame.addEventListener("load", () => res());
  });

  onSongLoad();

  // Let song play for a bit
  await new Promise((res) => {
    timeout = setTimeout(res, seconds * 1000);
  });

  // Stop song
  wrapper.innerHTML = "";
  playing = false;
}

function isPlayingTrack() {
  return playing;
}

function stopTrack() {
  if (playing) {
    wrapper.innerHTML = "";
    playing = false;
    clearTimeout(timeout);
  }
}

init();

export { playTrack, isPlayingTrack, stopTrack };
