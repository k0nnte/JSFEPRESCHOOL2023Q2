const impyt = document.querySelector(".impyt");
const search = document.querySelector(".search");
const mainWraper = document.querySelector(".main_wraper");
const close = document.querySelector(".close");
const contenerInp = document.querySelector(".contener_inp");

function deleteimpyt() {
  impyt.value = ``;
  close.style.display = `none`;
}

async function randomImg() {
  const urli = `https://api.unsplash.com/photos/random?client_id=jASPiZWrT1RlsqmOjQb5GrC9ex8OcL5YjPRa7_jfOkM&count=9`;
  try {
    const promice = await fetch(urli);

    const data = await promice.json();
    data.forEach((element) => {
      const img = document.createElement("img");
      img.src = element.urls.regular;
      img.classList.add("imagess");
      mainWraper.appendChild(img);
      mainWraper.classList.remove("heigth");
    });
  } catch (err) {
    console.log(err);
  }
}

function delite() {
  mainWraper.classList.add("heigth");
  mainWraper.innerHTML = "";
}

async function getImg() {
  delite();
  const sting = impyt.value;
  const urli = `https://api.unsplash.com/search/photos?client_id=jASPiZWrT1RlsqmOjQb5GrC9ex8OcL5YjPRa7_jfOkM&query=${sting}&per_page=9`;
  try {
    const promice = await fetch(urli);
    const data = await promice.json();
    data.results.forEach((element) => {
      const img = document.createElement("img");
      img.src = element.urls.regular;
      img.classList.add("imagess");
      mainWraper.appendChild(img);
      mainWraper.classList.remove("heigth");
    });
  } catch (err) {
    console.log(err);
  }
}

randomImg();
impyt.focus();

search.addEventListener("click", getImg);

impyt.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    getImg();
  }
});

close.addEventListener("click", deleteimpyt);

impyt.addEventListener("input", () => {
  if (impyt.value !== ``) {
    close.style.display = `block`;
  } else {
    close.style.display = `none`;
  }
});

document.addEventListener("click", function (event) {
  if (event.target !== contenerInp || event.target !== impyt) {
    close.style.display = `none`;
  }
  if (
    (event.target == contenerInp || event.target == impyt) &&
    impyt.value !== ``
  ) {
    close.style.display = `block`;
  }
});

console.log(`
Вёрстка +10
на странице есть несколько фото и строка поиска +5
в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
При загрузке приложения на странице отображаются полученные от API изображения +10
Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
Поиск +30
при открытии приложения курсор находится в поле ввода +5
есть placeholder +5
автозаполнение поля ввода отключено (нет выпадающего списка с предыдущими запросами) +5
поисковый запрос можно отправить нажатием клавиши Enter +5
после отправки поискового запроса и отображения результатов поиска, поисковый запрос продолжает отображаться в поле ввода +5
в поле ввода есть крестик при клике по которому поисковый запрос из поля ввода удаляется и отображается placeholder +5
Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
`);