const audio = document.getElementById("audios");
const play = document.querySelector(".play");
const singer = document.querySelector(".singer");
const song = document.querySelector(".song");
const prev = document.getElementById("prev");
const nexti = document.getElementById("nexti");
const timedur = document.querySelector(".timedur");
const timenow = document.querySelector(".timenow");
const imgSong = document.querySelector(".img__song");
const backImg = document.querySelector(".back__img");
const rangeTime = document.querySelector(".range__time");

const massong = [
  {
    sing: `Beyonce`,
    song: `Don't Hurt Yourself`,
    track: `./assets/audio/beyonce.mp3`,
    img: `./assets/img/lemonade.png`,
  },
  {
    sing: `Dua Lipa`,
    song: `Don't Start Now`,
    track: `./assets/audio/dontstartnow.mp3`,
    img: `./assets/img/dontstartnow.png`,
  },
];

let indSong = 0;
audio.src = massong[indSong].track;

singer.innerText = massong[indSong].sing;
song.innerText = massong[indSong].song;
audio.currentTime = 0;
imgSong.src = massong[indSong].img;
backImg.src = massong[indSong].img;

function start() {
  play.classList.add("stop");
  audio.play();
}

function pause() {
  play.classList.remove("stop");
  audio.pause();
}


function load(){
  timedur.innerText = `${Math.floor(audio.duration / 60)}:${Math.floor(
    audio.duration % 60
    )}`;
    audio.addEventListener("timeupdate", progres);
    imgSong.classList.add("scale");
  }


function prevs() {
  audio.removeEventListener("timeupdate", progres);
  indSong--;
  if (indSong < 0) {
    indSong = massong.length - 1;
  }
  singer.innerText = massong[indSong].sing;
  song.innerText = massong[indSong].song;
  audio.src = massong[indSong].track;
  imgSong.src = massong[indSong].img;
  backImg.src = massong[indSong].img;

  audio.addEventListener(`loadedmetadata`,load);

  start();
}

function next() {
  audio.removeEventListener("timeupdate", progres);
  indSong++;
  if (indSong > massong.length - 1) {
    indSong = 0;
  }
  singer.innerText = massong[indSong].sing;
  song.innerText = massong[indSong].song;
  audio.src = massong[indSong].track;
  imgSong.src = massong[indSong].img;
  backImg.src = massong[indSong].img;

  audio.addEventListener(`loadedmetadata`,load);

  start();
}

function inputi() {
  audio.currentTime = (this.value * audio.duration) / 100;
}

function progres() {
  rangeTime.value = (this.currentTime * 100) / this.duration;
  // timenow.innerText = `${Math.floor(this.currentTime/60)}:${Math.floor(this.currentTime%60)}`;
  if (Math.floor(this.currentTime % 60 < 10)) {
    timenow.innerText = `${Math.floor(this.currentTime / 60)}:0${Math.floor(
      this.currentTime % 60
    )}`;
  } else {
    timenow.innerText = `${Math.floor(this.currentTime / 60)}:${Math.floor(
      this.currentTime % 60
    )}`;
  }

  if (this.currentTime == this.duration && play.classList.contains("stop")) {
    next();
  }
}

play.addEventListener("click", () => {
  audio.addEventListener("timeupdate", progres);
  if (play.classList.contains("stop")) {
    imgSong.classList.remove("scale");
    pause();
  } else {
    imgSong.classList.add("scale");
    start();
  }
});

prev.addEventListener("click", prevs);

nexti.addEventListener("click", next);

rangeTime.addEventListener("change", inputi);

rangeTime.addEventListener("mousedown", () => {
  audio.removeEventListener("timeupdate", progres);
});
rangeTime.addEventListener("mouseup", () => {
  audio.addEventListener("timeupdate", progres);
});


console.log(`
Вёрстка +10
вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
Кнопка Play/Pause +10
есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
При смене аудиотрека меняется изображение - обложка аудиотрека +10
Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
Отображается продолжительность аудиотрека и его текущее время проигрывания +10
totoal score: 60
`);