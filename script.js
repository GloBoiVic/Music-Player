const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Vike',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (Remix)',
    artist: 'Vike',
  },
  {
    name: 'jacinto-3',
    displayName: 'Goodnight, Disco Queen',
    artist: 'Vike',
  },
  {
    name: 'metric-1',
    displayName: 'Front Row (Remix)',
    artist: 'Vike',
  },
];

console.log(songs.length);
// Check if playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Pause');
  music.pause();
}

// Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong() {
  songIndex--;
  console.log(songIndex);
  if (songIndex < 0) songIndex = songs.length - 1;
  loadSong(songs[songIndex]);
  if (isPlaying) playSong();
}

// Next Song
function nextSong() {
  songIndex++;
  console.log(songIndex);
  if (songIndex > songs.length - 1) songIndex = 0;
  loadSong(songs[songIndex]);
  if (isPlaying) playSong();
  // playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);

// Event Listeners
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
