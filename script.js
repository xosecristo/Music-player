const musicContainer = document.querySelector('.music-container');

const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');

const audio = document.querySelector('#audio');

const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');

const title = document.querySelector('#title');
const cover = document.querySelector('#cover');


//Songs
const songs = ['all_i_need', 'jumping_chance', 'shyness_boy'];
const songsNames = ['All I Need', 'Jumping Chance', 'Shyness Boy']

//Keep track
let songIndex = 1;

//Initially load song info DOM
loadSong(songs[songIndex]);

//Update songs details
function loadSong(song) {
    title.innerText = songsNames[songIndex];
    audio.src = `Music/${song}.mp3`;
    cover.src = `Cover/${song}.jpg`;
}

function playSong() {
    musicContainer.classList.add('play');

    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

function pauseSong() {
    musicContainer.classList.remove('play');

    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
}

function prevSong() {
    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1
    }

    loadSong(songs[songIndex]);

    playSong();
}

function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
        songIndex = 0
    }

    loadSong(songs[songIndex]);

    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

//Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
        pauseSong();
    }
    else {
        playSong();
    }
})

//Change songs
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//Progress bar
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);

//When songs ends...
audio.addEventListener('ended', nextSong);