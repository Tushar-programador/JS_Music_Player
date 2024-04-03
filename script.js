const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const song = [
  {
    musicName: "45",
    displayName: ".45",
    artist: "Wazir Patar",
  },
  {
    musicName: "Gal-Meri",
    displayName: "Gal Meri",
    artist: "Harrdy Sandhu",
  },
  {
    musicName: "Hot-Shit",
    displayName: "Hot Shit ",
    artist: "Arjan Dhillon",
  },
  {
    musicName: "Inception",
    displayName: "Inception",
    artist: "Robyn Sandhu",
  },
  {
    musicName: "Jigree",
    displayName: "Jigree",
    artist: "Sharry Maan",
  },
  {
    musicName: "Old-Me",
    displayName: "Old Me",
    artist: "Arjan Dhillon",
  },
  {
    musicName: "Pheli-Varr",
    displayName: "Pheli Varr",
    artist: "Manavgeet Gill",
  },
  {
    musicName: "SEE-MY-HYPE",
    displayName: "SEE MY HYPE ",
    artist: "Roop Bhullar",
  },
  {
    musicName: "Still-Rollin",
    displayName: "Still Rollin",
    artist: "Shubh",
  },
  {
    musicName: "Still",
    displayName: "Still",
    artist: "Nirvair Pannu",
  },
  {
    musicName: "Take-It-Easy",
    displayName: "Take It Easy",
    artist: "Karan Aujla",
  },
  {
    musicName: "Youth-Flow",
    displayName: "Youth Flow ",
    artist: "Arjan Dhillon",
  },
];

let isPlaying = false;
// play function

function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

// Pause
function pauseSong() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Pause");

  isPlaying = false;
  music.pause();
}

// Play or Pause Event listener

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update the DOM

function loadSong(songs) {
  title.textContent = songs.displayName;
  artist.textContent = songs.artist;
  music.src = `music/${songs.musicName}.mp3`;
  image.src = `img/${songs.musicName}.jpeg`;
  console.log(songs.musicName);
}

let songIndex = 0;

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = song.length - 1;
  }
  loadSong(song[songIndex]);
  playSong();
}

function nextSong() {
  songIndex++;
  if (songIndex > song.length - 1) {
    songIndex = 0;
  }
  loadSong(song[songIndex]);
  playSong();
}
// On Load - Select first Song

function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    const progressPercent = (currentTime / duration) * 100;

    progress.style.width = `${progressPercent}%`;
    // Calculate display for duration
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }

    //*Delay switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //* Calculate display for current
    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const offsetXPosition = e.offsetX;
  const { duration } = music;
  music.currentTime = (offsetXPosition / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);

loadSong(song[songIndex]);
