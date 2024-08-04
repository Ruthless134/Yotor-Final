const box = document.querySelector(".box"),
        musicImg = box.querySelector(".img-area img"),
        musicName = box.querySelector(".name"),
        musicArtist = box.querySelector(".artist"),
        playPauseBtn = box.querySelector("#playPause"),
        prevBtn = box.querySelector("#prev"),
        nextBtn = box.querySelector("#next"),
        mainAudio = box.querySelector("#main-audio"),
        progressArea = box.querySelector(".progress-area"),
        progressBar = box.querySelector(".progress-bar");

      const allMusic = [
        {
          name: "Redemption",
          artist: "Besmorph & Coopex",
          src: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/Besomorph-Coopex-Redemption.mp3?raw=true",
          img: "https://i.ytimg.com/vi/Z8mWqjfvg-A/maxresdefault.jpg",
        },
        {
          name: "What's the Problem?",
          artist: "OSKI",
          src: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/OSKI-Whats-The-Problem.mp3?raw=true",
          img: "https://linkstorage.linkfire.com/medialinks/images/fd2634bd-07c6-4656-b970-843038c78b51/artwork-440x440.jpg",
        },
        {
          name: "Control",
          artist: "Unknown Brain x Rival",
          src: "https://github.com/ecemgo/mini-samples-great-tricks/blob/main/song-list/Unknown-BrainxRival-Control.mp3?raw=true",
          img: "https://i.ytimg.com/vi/d455TYstD_w/maxresdefault.jpg",
        },
      ];
      let musicIndex = Math.floor(Math.random() * allMusic.length);
      let isMusicPaused = true;

      window.addEventListener("load", () => {
        loadMusic(musicIndex);
      });

      function loadMusic(indexNumb) {
        musicName.innerText = allMusic[indexNumb].name;
        musicArtist.innerText = allMusic[indexNumb].artist;
        musicImg.src = allMusic[indexNumb].img;
        mainAudio.src = allMusic[indexNumb].src;
      }

      function playMusic() {
        box.classList.add("paused");
        musicImg.classList.add("rotate");
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        mainAudio.play();
        isMusicPaused = false;
      }

      function pauseMusic() {
        box.classList.remove("paused");
        musicImg.classList.remove("rotate");
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        mainAudio.pause();
        isMusicPaused = true;
      }

      playPauseBtn.addEventListener("click", () => {
        if (isMusicPaused) {
          playMusic();
        } else {
          pauseMusic();
        }
      });

      function prevMusic() {
        musicIndex--;
        if (musicIndex < 0) musicIndex = allMusic.length - 1;
        loadMusic(musicIndex);
        playMusic();
      }

      function nextMusic() {
        musicIndex++;
        if (musicIndex >= allMusic.length) musicIndex = 0;
        loadMusic(musicIndex);
        playMusic();
      }

      prevBtn.addEventListener("click", () => {
        prevMusic();
      });

      nextBtn.addEventListener("click", () => {
        nextMusic();
      });

      mainAudio.addEventListener("timeupdate", (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        let progressWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${progressWidth}%`;

        let musicCurrentTime = box.querySelector(".current-time");
        let musicDuration = box.querySelector(".max-duration");

        mainAudio.addEventListener("loadeddata", () => {
          let mainAdDuration = mainAudio.duration;
          let totalMin = Math.floor(mainAdDuration / 60);
          let totalSec = Math.floor(mainAdDuration % 60);
          if (totalSec < 10) totalSec = "0" + totalSec;
          musicDuration.innerText = `${totalMin}:${totalSec}`;
        });

        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);
        if (currentSec < 10) currentSec = "0" + currentSec;
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
      });

      progressArea.addEventListener("click", (e) => {
        let progressWidth = progressArea.clientWidth;
        let clickedOffsetX = e.offsetX;
        let songDuration = mainAudio.duration;

        mainAudio.currentTime = (clickedOffsetX / progressWidth) * songDuration;
        playMusic();
      });

      mainAudio.addEventListener("ended", () => {
        nextMusic();
      });
            var swiper = new Swiper(".swiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        speed: 600,
        slidesPerView: "auto",
        coverflowEffect: {
          rotate: 0,
          stretch: -30,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        on: {
          click(event) {
            swiper.slideTo(this.clickedIndex);
          },
        },
      });
