const songs = [
  { title: "KING", src: "music/KING.wav" },
  { title: "THIS A MUST", src: "music/THIS A MUST.wav" },
  { title: "FATHER (feat. Travis Scott)", src: "music/FATHER.wav" },
  { title: "ALL THE LOVE (feat. Andre Troutman)", src: "music/ALL THE LOVE.wav" },
  { title: "PUNCH DRUNK", src: "music/PUNCH DRUNK.wav" },
  { title: "WHATEVER WORKS", src: "music/WHATEVER WORKS.wav" },
  { title: "MAMA'S FAVORITE", src: "music/MAMA'S FAVORITE.wav" },
  { title: "SISTERS AND BROTHERS", src: "music/SISTERS AND BROTHERS.wav" },
  { title: "BULLY (feat. CeeLo Green)", src: "music/BULLY.wav" },

  { title: "HIGHS AND LOWS", src: "music/HIGHS AND LOWS.wav" },
  { title: "I CAN'T WAIT (feat. Ms. Lauryn Hill)", src: "music/I CAN'T WAIT.wav" },
  { title: "WHITE LINES (feat. Andre Troutman)", src: "music/WHITE LINES.wav" },
  { title: "CIRCLES", src: "music/CIRCLES.wav" },
  { title: "PREACHER MAN", src: "music/PREACHER MAN.wav" },
  { title: "BEAUTY AND THE BEAST", src: "music/BEAUTY AND THE BEAST.wav" },
  { title: "DAMN", src: "music/DAMN.wav" },
  { title: "LAST BREATH (feat. Peso Pluma)", src: "music/LAST BREATH.wav" },
  { title: "THIS ONE HERE", src: "music/THIS ONE HERE.wav" },
  { title: "OK (feat. Don Toliver)", src: "music/OK.wav" },
  { title: "MISSION CONTROL (feat. The WRLDFMS Tony Williams)", src: "music/MISSION CONTROL.wav" }
];

let currentSong = 0;
let isUpdating = false;

const audio = document.getElementById("audio");
const playlist = document.getElementById("playlist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playBtn = document.getElementById("playBtn");
const titleDisplay = document.getElementById("title");

function loadSongs() {
  songs.forEach((song, index) => {
    const div = document.createElement("div");
    div.classList.add("song");

    div.innerText = (index + 1) + ". " + song.title;

    div.onclick = () => {
      currentSong = index;
      playSong();
    };

    playlist.appendChild(div);
  });
}

function updateActiveSong() {
  const allSongs = document.querySelectorAll(".song");
  allSongs.forEach(s => s.classList.remove("active"));
  allSongs[currentSong].classList.add("active");
}

function playSong() {
  const song = songs[currentSong];

  audio.src = song.src;
  audio.currentTime = 0;
  progress.value = 0;

  audio.play();

  titleDisplay.innerText = song.title;
  playBtn.innerText = "⏸";

  updateActiveSong();

  isUpdating = false;
  startProgressLoop();
}

function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerText = "⏸";
    startProgressLoop();
  } else {
    audio.pause();
    playBtn.innerText = "▶";
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  playSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  playSong();
}

audio.addEventListener("ended", nextSong);

function startProgressLoop() {
  if (isUpdating) return;
  isUpdating = true;

  function update() {
    if (!audio.paused && audio.duration) {
      progress.value = (audio.currentTime / audio.duration) * 100;

      document.getElementById("current").innerText = formatTime(audio.currentTime);
      document.getElementById("duration").innerText = formatTime(audio.duration);
    }
    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  let min = Math.floor(time / 60);
  let sec = Math.floor(time % 60);
  if (sec < 10) sec = "0" + sec;
  return min + ":" + sec;
}

loadSongs();
