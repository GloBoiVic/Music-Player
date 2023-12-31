const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const body = document.getElementsByTagName('body');
const progressContainer = document.getElementById('progressContainer');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');
const repeatBtn = document.getElementById('repeat');
const shuffleBtn = document.getElementById('shuffle');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
  {
    name: 'lofi-study',
    displayName: 'Lofi Study',
    artist: 'FASSounds',
    albumArt: 'chill',
  },
  {
    name: 'aesthetics',
    displayName: 'Aesthetics',
    artist: 'Soul Prod Music',
    albumArt: 'fairy-tale',
  },
  {
    name: 'in-the-room-when-the-rain-pouring',
    displayName: 'In the room (when the rain pouring)',
    artist: 'Lofi Hour',
    albumArt: 'dual',
  },
  {
    name: 'lofi-in-the-bank',
    displayName: 'Lofi In The Bank',
    artist: 'Brentin Davis',
    albumArt: 'fantasy',
  },
  {
    name: 'lofi-beat',
    displayName: 'Lofi Beat',
    artist: 'FASSounds',
    albumArt: 'chill',
  },
  {
    name: 'empty-mind',
    displayName: 'Empty Mind',
    artist: 'Lofi Hour',
    albumArt: 'dual',
  },
  {
    name: 'lofi-relax-song-for-summer-vibes',
    displayName: 'Lofi Relax Song for Summer Vibes',
    artist: 'Raulespa',
    albumArt: 'pixel',
  },
  {
    name: 'tvari-tokyo-cafe',
    displayName: 'Tokyo Cafe',
    artist: 'TVARI',
    albumArt: 'sunset',
  },
  {
    name: 'sleepy-cat',
    displayName: 'Sleepy Cat',
    artist: 'Lofi Hour',
    albumArt: 'dual',
  },
  {
    name: 'street-food',
    displayName: 'Street Food',
    artist: 'FASSounds',
    albumArt: 'chill',
  },
  {
    name: 'city-streets-lofi',
    displayName: 'City Streets',
    artist: 'LofCosmos',
    albumArt: 'pixel',
  },
  {
    name: 'sweet-love',
    displayName: 'Sweet Love',
    artist: 'Day Fox',
    albumArt: 'boy',
  },
  {
    name: 'close-study-relax-chillhop-calm-study-lofi',
    displayName: 'Close Study Relax Chillhop',
    artist: 'Soul Prod Music',
    albumArt: 'fairy-tale',
  },
];

// Music state variables
let isPlaying = false;
let repeat = false;
let shuffle = false;
let songIndex = 0;

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.albumArt}.jpg`;
  document.body.style.backgroundImage = `url(img/${song.albumArt}.jpg)`;
}

function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Pause');
  music.pause();
}

function toggleRepeat() {
  repeat = !repeat;
  repeatBtn.classList.toggle('active');
}

function toggleShuffle() {
  shuffle = !shuffle;
  shuffleBtn.classList.toggle('active');
}

function repeatSong() {
  loadSong(songs[songIndex]);
  if (isPlaying) playSong();
}
function shuffleSongs() {
  let randomSong = Math.floor(Math.random() * songs.length + 1);
  console.log(randomSong);
  if (randomSong > songs.length - 1) randomSong = 0;
  songIndex = randomSong;
  loadSong(songs[songIndex]);
}

// Prev Song
function prevSong() {
  if (shuffle) shuffleSongs();
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);

  if (isPlaying) playSong();
}

// Next Song
function nextSong() {
  if (shuffle) shuffleSongs();
  songIndex++;
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);

  if (isPlaying) playSong();
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;
    durationElement.textContent = `${durationMinutes}:${durationSeconds}`;

    // Check for NaN
    if (durationSeconds)
      durationElement.textContent = `${durationMinutes}:${durationSeconds}`;

    // Calculate display for  currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth; // this refers to the element that triggered event
  const clickX = e.offsetX;
  const { duration } = music;
  const currentTime = (clickX / width) * duration;
  music.currentTime = currentTime;
  progress.style.width = `${currentTime}%`;
  // TODO: Update currentTimeElement to show currentTime when song is paused and skipped ahead
}

// Event Listeners
repeatBtn.addEventListener('click', toggleRepeat);
shuffleBtn.addEventListener('click', toggleShuffle);
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', () => {
  if (repeat) {
    repeatSong();
  } else {
    nextSong();
  }
});
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
document.addEventListener('DOMContentLoaded', loadSong(songs[songIndex]));
