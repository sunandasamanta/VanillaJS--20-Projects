// HTML Elements
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Musics

const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];

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
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < songs.length) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    currentTimeEl.textContent = '0:00';
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex >= songs.length) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    currentTimeEl.textContent = '0:00';
    playSong();
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `./Assets/${song.name}.mp3`;
    image.src = `./Assets/${song.name}.jpg`;
    currentTimeEl.textContent = '0:00';
}
// Current Song
let songIndex = 0;

// On Load - Select First Song
loadSong(songs[songIndex]);

// Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update ProgressBar width
        // currentTimeEl.textContent = parseInt(currentTime);
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // update in minutes
        const durationInMinutes = parseInt(duration / 60);
        const durationInSeconds = parseInt(duration % 60);
        // Delay showing duration until it's calculated
        if (durationInSeconds) {
        durationEl.textContent = durationInSeconds > 10 ? `${durationInMinutes}: ${durationInSeconds}` : `${durationInMinutes}: 0${durationInSeconds}`;
        }
        // Current time
        // update in minutes and seconds
        const currentTimeInMinutes = parseInt(currentTime / 60);
        const currentTimeInSeconds = parseInt(currentTime % 60);
        // Delay showing currentTime until it's calculated
        if (currentTimeInSeconds) {
            currentTimeEl.textContent = currentTimeInSeconds < 10 ? `${currentTimeInMinutes}:0${currentTimeInSeconds}` : `${currentTimeInMinutes}:${currentTimeInSeconds}`;
        }
    }
}

// Play and Pause on space 
function spaceControl(event) {
    if (event.code == "Space") {
        isPlaying ? pauseSong() : playSong ();
    }
    
}

// Set Progree Bar
function setProgressBar(event) {
    const width = this.clientWidth;
    const clickX = event.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration;
} 

// Next and Previous Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
window.addEventListener('keydown', spaceControl);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);