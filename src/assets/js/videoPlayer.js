import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn =document.getElementById("jsFullScreen");
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");
const volumeRange = document.getElementById("jsVolume");

const registerView = () => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "post"
  });
};


function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
  }
}

function handleVolumeClick() {
    if (videoPlayer.muted) {
      videoPlayer.muted = false;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
      volumeRange.value = videoPlayer.volume;
    } else {
      volumerange.value="0"
      videoPlayer.muted = true;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  }

  function goFullScreen(){
      videoContainer.webkitRequestFullscreen();
      fullScreenBtn.innerHtml = `<i class="fas fa-compress"></i>`;
      fullScreenBtn.removeEventListener("click", goFullScreen);
      fullScreenBtn.addEventListener("click", exitFullScreen);
  }

  function exitFullScreen(){
    fullScreenBtn.addEventListener("click", goFullScreen);
    fullScreenBtn.innerHtml = `<i class="fas fa-extand"></i>`;
    document.webkitExitFullscreen();
  }

  const formatDate = seconds => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
  };
  

  function getCurrentTime() {
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
  }
  
  async function setTotalTime() {
    const blob = await fetch(videoPlayer.src).then(response => response.blob());
    const duration = await getBlobDuration(blob);
    const totalTimeString = formatDate(duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
  }

  function handledEnded(){
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`
    registerView();
  }

  function handleDrag(event) {
    const {
      target: { value }
    } = event;
    videoPlayer.volume = value;
    if (value >= 0.6) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (value >= 0.2) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
  }

function init() {
  videoPlayer.volume = "0.5";
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata",setTotalTime);
  videoPlayer.addEventListener("ended", handledEnded);
  volumeRange.addEventListener("input", handleDrag);

}

if (videoContainer) {
  init();
}