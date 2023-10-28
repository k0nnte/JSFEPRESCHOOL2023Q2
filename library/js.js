const spisbok_labe = document.querySelectorAll(".spisbok_labe");
const span_text = document.querySelectorAll(".span_text");
const burger = document.querySelector(".burger");
const menu = document.querySelector(".burgr_menu");
const burSpis = document.querySelectorAll(".burg_spis");
const wraperCard = document.querySelectorAll(".wraper_card");
const carusel = document.querySelector(".carusel");
const carusButt = document.querySelectorAll(".but");
const tabletCarisel = document.querySelector(".tablet_carisel");
const sliderBut = document.querySelectorAll(".slider_but");
const butLog = document.querySelector(".but_log");
const profile = document.querySelector(".profile");
const wraperRegister = document.querySelector(".wraper_register");
const modalRegister = document.querySelector(".modal_register");
const btnRegistOne = document.getElementById("register1");
const btnSingup = document.querySelector(".singup");
const closeRegister = document.querySelector(".close_register");
const formBtn = document.querySelector(".form_btn");
const inpytBtn = document.querySelector(".inpyt_butt");
const logBut = document.getElementById("login1");
const wraperLogin = document.querySelector(".wraper_login");
const modalLogin = document.querySelector(".modal_login");
const closeBut = document.querySelector(".close_login");
const ByeBtn = document.querySelectorAll(".buy");
const loginc = document.getElementById("loginc");
const RegistorBtn = document.getElementById("register");
const loginBtn2 = document.querySelector(".login");
const profileact = document.querySelector(".profileact");
const profile_zag = document.querySelectorAll(".profile_zag");
const wraperProfile = document.querySelector(".wraper_profile");
const modalProfile = document.querySelector(".modal_profile");
const myprof = document.getElementById("myprof");
const tablName = document.querySelector(".tabl_name");
const polnName = document.querySelector(".poln_name");
const profilesNumber = document.querySelectorAll(".profiles_number");
const cardNumber = document.querySelector(".card_number");
const closeProfile = document.querySelector(".close_profile");
const coppyBtn = document.querySelector(".coppy_btn");
const cardBooks = document.querySelectorAll(".card");
const buksBue = document.querySelector(".buks_bue");
const butonCloseLibrary = document.querySelector(".buton_close__library");
const buttonLib = document.querySelector(".buy_library");
const getText1 = document.querySelector(".get_text1");
const getText2 = document.querySelector(".get_text2");
const butWraper = document.querySelector(".but_wraper");

let activeAcc = "";
let btnModal = false;
let btnText;
let voshel = false;
let buttonclickI;

let skolko = 0;
let indcheck = 0;
let butCount = 0;

if (localStorage.key("activeAcc")) {
  activeAcc = localStorage.getItem("activeAcc");
  if (activeAcc !== "") {
    let obj = {};
    for (let i = 0; i < localStorage.length; i++) {
      if (activeAcc == localStorage.key(i)) {
        obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
      }
    }

    butLog.classList.add("act");

    // btnText = butLog.innerHTML;
    btnText = butLog.firstElementChild;

    butLog.innerHTML = `<span class="butLog_span" title=${obj.first_name}${obj.last_name}>${obj.first_name[0]}${obj.last_name[0]}</span>`;
    localStorage.setItem("btntext", btnText);
    profile_zag[1].innerText = `${obj.card_namber}`;
    if (obj.Books !== 0) {
      for (const iterator of obj.BooksMas) {
        let Bytt = cardBooks[iterator].querySelector(".buy");
        Bytt.classList.add("buy2");
        Bytt.classList.remove("buy");
        Bytt.disabled = true;
        Bytt.innerText = `Own`;
      }
    }

    getText1.innerText = `Visit your profile`;
    getText2.innerHTML = `With a digital library card you get free access <br> to the Library’s wide array of digital resources <br> including e-books, databases, educational <br> resources, and more.`;
    butWraper.removeChild(btnSingup);
    loginBtn2.innerText = `Profile`;

    const parent = inpytBtn.parentNode;
    parent.removeChild(inpytBtn);
    const div = document.createElement("div");
    div.classList.add("card_profile");
    div.innerHTML = `
  <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/Union.png" alt="union" class="card_profile__img">
                        <p class="visit_number">${obj.visits}</p>
                      </div>
                      <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/Star1.png" alt="Star" class="card_profile__img">
                        <p class="visit_number">${obj.bonuses}</p>
                      </div>
                      <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/book44.png" alt="book" class="card_profile__img">
                        <p class="visit_number">${obj.Books}</p>
                      </div>
  
  `;
    parent.append(div);
    document.forms["forma"]["readerer"].value = `${obj.first_name}`;
    document.forms["forma"]["card_namber"].value = `${obj.card_namber}`;
  }
}

spisbok_labe.forEach((element) => {
  element.addEventListener("click", (event) => {
    if (skolko === 1) {
      event.stopPropagation();
      skolko = 0;
    } else {
      skolko = 1;
      span_text.forEach((el) => {
        el.classList.remove("span_fat");
      });
      wraperCard.forEach((item) => {
        item.classList.add("disappears");
        item.addEventListener("transitionend", () => {
          if (item.classList.contains("disappears")) {
            item.classList.add("disappearance");
          }
          spisbok_labe.forEach((ell, index) => {
            if (ell.firstElementChild.checked) {
              indcheck = index;
            }
          });
          wraperCard[indcheck].classList.remove("disappearance");
          setTimeout(() => {
            wraperCard[indcheck].classList.remove("disappears");
          }, 1);
        });
      });

      element.lastElementChild.classList.add("span_fat");
    }
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) {
    if (butCount > 2) {
      butCount = 2;
      carusButt[butCount].firstElementChild.checked = true;
    }
  }
  scroll();
});

carusButt.forEach((elem, indexx) => {
  elem.addEventListener("click", () => {
    butCount = indexx;
    sliderBut[0].disabled = false;
    sliderBut[1].disabled = false;
    scroll();
  });
});

sliderBut[0].addEventListener("click", () => {
  if (butCount - 1 < 0) {
    sliderBut[0].disabled = true;
  } else {
    sliderBut[1].disabled = false;
    butCount -= 1;
    scroll();
    carusButt[butCount].firstElementChild.checked = true;
  }
});

sliderBut[1].addEventListener("click", () => {
  if (butCount + 1 > carusButt.length - 1) {
    sliderBut[1].disabled = true;
  } else {
    sliderBut[0].disabled = false;
    butCount += 1;
    scroll();
    carusButt[butCount].firstElementChild.checked = true;
  }
});

function scroll() {
  carusel.style.transform = `translateX(-${
    butCount * (document.querySelector(".slider_img").offsetWidth + 15)
  }px)`;
  tabletCarisel.style.transform = `translateX(-${
    butCount * document.querySelector(".slide_img").offsetWidth
  }px)`;
}

document.body.addEventListener("click", (element) => {
  let targ = element.target;
  if (!burger.contains(targ) && !menu.contains(targ)) {
    menu.classList.remove("burgr_menu_open");
    burger.classList.remove("burger_open");
    burger.children[0].classList.remove("rotate1");
    burger.children[1].classList.remove("burg_inviz");
    burger.children[2].classList.remove("rotate2");
  }
  if (!profile.contains(targ) && !butLog.contains(targ)) {
    profile.classList.remove("actived");
  }
  if (!profileact.contains(targ) && !butLog.contains(targ)) {
    profileact.classList.remove("actived");
  }
});

burger.addEventListener("click", () => {
  menu.classList.toggle("burgr_menu_open");
  burger.classList.toggle("burger_open");
  burger.children[0].classList.toggle("rotate1");
  burger.children[1].classList.toggle("burg_inviz");
  burger.children[2].classList.toggle("rotate2");
});

burSpis.forEach((el) => {
  el.addEventListener("click", () => {
    menu.classList.remove("burgr_menu_open");
    burger.classList.remove("burger_open");
    burger.children[0].classList.remove("rotate1");
    burger.children[1].classList.remove("burg_inviz");
    burger.children[2].classList.remove("rotate2");
  });
});

function progile_log() {
  profile.classList.remove("nevidim");
  profile.classList.toggle("actived");
  profile.addEventListener("animationend", function () {
    if (!profile.classList.contains("actived")) {
      profile.classList.add("nevidim");
    }
  });
}

function profile_act() {
  profileact.classList.remove("nevidim");
  profileact.classList.toggle("actived");
  profileact.addEventListener("animationend", function () {
    if (!profileact.classList.contains("actived")) {
      profileact.classList.add("nevidim");
    }
  });
}

butLog.addEventListener("click", function () {
  if (activeAcc !== "") {
    profile_act();
  } else {
    progile_log();
  }
});

function modalOpen() {
  wraperRegister.classList.add("open_register");
  document.body.classList.add("opened_bod");
  setTimeout(() => {
    modalRegister.classList.add("register_opened");
  }, 1);
}

function mdalClose() {
  modalRegister.classList.remove("register_opened");
  wraperRegister.addEventListener("transitionend", function () {
    if (
      !modalRegister.classList.contains("register_opened") &&
      btnModal == false
    ) {
      wraperRegister.classList.remove("open_register");
      document.body.classList.remove("opened_bod");
    }
    if (
      !modalRegister.classList.contains("register_opened") &&
      btnModal == true
    ) {
      wraperRegister.classList.remove("open_register");
      document.body.classList.remove("opened_bod");
      btnModal = false;
      openLog();
    }
  });
}

btnRegistOne.addEventListener("click", modalOpen);
btnSingup.addEventListener("click", modalOpen);

closeRegister.addEventListener("click", mdalClose);

window.addEventListener("click", function (event) {
  if (
    event.target.classList.contains("open_register") ||
    event.target.classList.contains("open_login") ||
    event.target.classList.contains("open_profile") ||
    event.target.classList.contains("open_library")
  ) {
    mdalClose();
    closeLog();
    closed_profiles();
    closeByeCard();
  }
});

function selectInfo() {
  for (const iterator of document.forms["form_regis"]) {
    if (iterator.type === "text") {
      if (iterator.value.length === 0) {
        let textSib = iterator.previousElementSibling.innerText;
        iterator.previousElementSibling.innerText = "заполните поле";
        setTimeout(function () {
          iterator.previousElementSibling.innerText = textSib;
        }, 400);
        return false;
      }
    }
  }
  if (document.forms["form_regis"]["pasword"].value.length < 8) {
    let textSib =
      document.forms["form_regis"]["pasword"].previousElementSibling.innerText;
    document.forms["form_regis"]["pasword"].previousElementSibling.innerText =
      "пароль больше 8 символов";
    setTimeout(function () {
      document.forms["form_regis"]["pasword"].previousElementSibling.innerText =
        textSib;
    }, 400);
    return false;
  }

  if (!document.forms["form_regis"]["e-mail"].value.includes("@")) {
    let textSib =
      document.forms["form_regis"]["e-mail"].previousElementSibling.innerText;
    document.forms["form_regis"]["e-mail"].previousElementSibling.innerText =
      "в емейл есть @";
    setTimeout(function () {
      document.forms["form_regis"]["e-mail"].previousElementSibling.innerText =
        textSib;
    }, 400);
    return false;
  }

  function generate() {
    return Math.floor(
      Math.random() * (9999999999 - 1000000000) + 1000000000
    ).toString(16);
  }

  const obj = {
    first_name: document.forms["form_regis"]["first_name"].value,
    last_name: document.forms["form_regis"]["last_name"].value,
    "e-mail": document.forms["form_regis"]["e-mail"].value,
    pasword: document.forms["form_regis"]["pasword"].value,
    visits: 1,
    bonuses: 1240,
    Books: 0,
    BooksMas: [],
    byeCards: false,
  };

  obj["card_namber"] = generate();

  localStorage.setItem(obj.first_name, JSON.stringify(obj));

  for (const iterator of document.forms["form_regis"]) {
    iterator.value = ``;
  }
  mdalClose();

  butLog.classList.add("act");

  //  btnText = butLog.innerHTML;
  btnText = butLog.firstChild;
  butLog.innerHTML = `<span class="butLog_span" title=${obj.first_name}${obj.last_name}>${obj.first_name[0]}${obj.last_name[0]}</span>`;
  localStorage.setItem("btntext", btnText);
  activeAcc = `${obj.first_name}`;
  localStorage.setItem("activeAcc", activeAcc);
  profile_zag[1].innerText = `${obj.card_namber}`;

  getText1.innerText = `Visit your profile`;
  getText2.innerHTML = `With a digital library card you get free access <br> to the Library’s wide array of digital resources <br> including e-books, databases, educational <br> resources, and more.`;
  butWraper.removeChild(btnSingup);
  loginBtn2.innerText = `Profile`;

  const parent = inpytBtn.parentNode;
  parent.removeChild(inpytBtn);
  const div = document.createElement("div");
  div.classList.add("card_profile");
  div.innerHTML = `
  <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/Union.png" alt="union" class="card_profile__img">
                        <p class="visit_number">${obj.visits}</p>
                      </div>
                      <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/Star1.png" alt="Star" class="card_profile__img">
                        <p class="visit_number">${obj.bonuses}</p>
                      </div>
                      <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/book44.png" alt="book" class="card_profile__img">
                        <p class="visit_number">${obj.Books}</p>
                      </div>
  
  `;
  parent.append(div);
  document.forms["forma"]["readerer"].value = `${obj.first_name}`;
  document.forms["forma"]["card_namber"].value = `${obj.card_namber}`;
}

inpytBtn.addEventListener("click", function () {
  const textForm = document.forms["forma"]["readerer"].value;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === textForm) {
      const obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (obj.card_namber === document.forms["forma"]["card_namber"].value) {
        const parent = inpytBtn.parentNode;
        parent.removeChild(inpytBtn);
        const div = document.createElement("div");
        div.classList.add("card_profile");
        div.innerHTML = `
  <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/Union.png" alt="union" class="card_profile__img">
                        <p class="visit_number">${obj.visits}</p>
                      </div>
                      <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/Star1.png" alt="Star" class="card_profile__img">
                        <p class="visit_number">${obj.bonuses}</p>
                      </div>
                      <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/book44.png" alt="book" class="card_profile__img">
                        <p class="visit_number">${obj.Books}</p>
                      </div>
  
  `;
        parent.append(div);
        setTimeout(function () {
          parent.removeChild(div);
          parent.append(inpytBtn);
          document.forms["forma"]["readerer"].value = ``;
          document.forms["forma"]["card_namber"].value = ``;
        }, 10000);
      }
    }
  }

  // if(false){
  //   const parent = inpytBtn.parentNode;
  //   parent.removeChild(inpytBtn);
  //   const div = document.createElement("div");
  //   div.classList.add('card_profile');
  //   div.innerHTML = `
  //   <div class="visit_info">
  //                         <p class="visit_text">visits</p>
  //                         <img src="./files/images/Union.png" alt="union" class="card_profile__img">
  //                         <p class="visit_number">23</p>
  //                       </div>
  //                       <div class="visit_info">
  //                         <p class="visit_text">visits</p>
  //                         <img src="./files/images/Star1.png" alt="Star" class="card_profile__img">
  //                         <p class="visit_number">1240</p>
  //                       </div>
  //                       <div class="visit_info">
  //                         <p class="visit_text">visits</p>
  //                         <img src="./files/images/book44.png" alt="book" class="card_profile__img">
  //                         <p class="visit_number">2</p>
  //                       </div>

  //   `;
  //   parent.append(div);
  //   setTimeout(function(){
  //     parent.removeChild(div);
  //     parent.append(inpytBtn);
  //   },10000);
  // }
});

function openLog() {
  wraperLogin.classList.add("open_login");
  document.body.classList.add("opened_bod");
  setTimeout(() => {
    modalLogin.classList.add("login_opened");
  }, 1);
}

function closeLog() {
  modalLogin.classList.remove("login_opened");
  wraperLogin.addEventListener("transitionend", function () {
    if (!modalLogin.classList.contains("login_opened") && btnModal == false) {
      wraperLogin.classList.remove("open_login");
      document.body.classList.remove("opened_bod");
    }
    if (!modalLogin.classList.contains("login_opened") && btnModal == true) {
      wraperLogin.classList.remove("open_login");
      document.body.classList.remove("opened_bod");
      btnModal = false;
      modalOpen();
    }
  });
}

function login() {
  for (const iterator of document.forms["form_login"]) {
    if (iterator.type === "text") {
      if (iterator.value.length === 0) {
        let textSib = iterator.previousElementSibling.innerText;
        iterator.previousElementSibling.innerText = "заполните поле";
        setTimeout(function () {
          iterator.previousElementSibling.innerText = textSib;
        }, 400);
        return false;
      }
    }
  }

  if (document.forms["form_login"]["pasword"].value.length < 8) {
    let textSib =
      document.forms["form_login"]["pasword"].previousElementSibling.innerText;
    document.forms["form_login"]["pasword"].previousElementSibling.innerText =
      "пароль больше 8 символов";
    setTimeout(function () {
      document.forms["form_login"]["pasword"].previousElementSibling.innerText =
        textSib;
    }, 400);
    return false;
  }

  for (let i = 0; i < localStorage.length; i++) {
    try {
      let obj = JSON.parse(localStorage.getItem(localStorage.key(i)));
      if (
        document.forms["form_login"]["E-mail"].value == obj.first_name ||
        document.forms["form_login"]["E-mail"].value == obj.e - mail
      ) {
        if (document.forms["form_login"]["pasword"].value == obj.pasword) {
          butLog.classList.add("act");

          // btnText = butLog.innerHTML;
          btnText = butLog.firstChild;
          butLog.innerHTML = `<span class="butLog_span" title=${obj.first_name}${obj.last_name}>${obj.first_name[0]}${obj.last_name[0]}</span>`;
          localStorage.setItem("btntext", btnText);
          activeAcc = `${obj.first_name}`;
          localStorage.setItem("activeAcc", activeAcc);
          profile_zag[1].innerText = `${obj.card_namber}`;
          obj.visits += 1;
          localStorage.setItem(obj.first_name, JSON.stringify(obj));
          closeLog();
          document.forms["form_login"]["E-mail"].value = ``;
          document.forms["form_login"]["pasword"].value = ``;

          getText1.innerText = `Visit your profile`;
          getText2.innerHTML = `With a digital library card you get free access <br> to the Library’s wide array of digital resources <br> including e-books, databases, educational <br> resources, and more.`;
          butWraper.removeChild(btnSingup);
          loginBtn2.innerText = `Profile`;

          const parent = inpytBtn.parentNode;
          parent.removeChild(inpytBtn);
          const div = document.createElement("div");
          div.classList.add("card_profile");
          div.innerHTML = `
  <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/Union.png" alt="union" class="card_profile__img">
                        <p class="visit_number">${obj.visits}</p>
                      </div>
                      <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/Star1.png" alt="Star" class="card_profile__img">
                        <p class="visit_number">${obj.bonuses}</p>
                      </div>
                      <div class="visit_info">
                        <p class="visit_text">visits</p>
                        <img src="./files/images/book44.png" alt="book" class="card_profile__img">
                        <p class="visit_number">${obj.Books}</p>
                      </div>
  
  `;
          parent.append(div);
          document.forms["forma"]["readerer"].value = `${obj.first_name}`;
          document.forms["forma"]["card_namber"].value = `${obj.card_namber}`;

          if (obj.Books !== 0) {
            for (const iterator of obj.BooksMas) {
              let Bytt = cardBooks[iterator].querySelector(".buy");
              Bytt.classList.add("buy2");
              Bytt.classList.remove("buy");
              Bytt.disabled = true;
              Bytt.innerText = `Own`;
            }
          }
        }
      }
    } catch (e) {
      continue;
    }
  }
}

logBut.addEventListener("click", openLog);
loginBtn2.addEventListener("click", function () {
  if (activeAcc == ``) {
    openLog();
  } else {
    openProf();
  }
});
closeBut.addEventListener("click", closeLog);

for (let i = 0; i < ByeBtn.length; i++) {
  ByeBtn[i].addEventListener("click", function () {
    if (!activeAcc) {
      openLog();
    } else {
      const obj = JSON.parse(localStorage.getItem(activeAcc));
      if (obj.byeCards == false) {
        wraperLibrary.classList.add("open_library");
        document.body.classList.add("opened_bod");
        setTimeout(function () {
          modalLibrary.classList.add("library_opened");
          buttonclickI = i;
          for (const i of document.forms["formas_lib"]) {
            i.addEventListener("input", inpytAllLib);
          }
        }, 1);
      } else {
        this.classList.add("buy2");
        this.classList.remove("buy");
        this.innerText = `Own`;
        this.disabled = true;
        obj.BooksMas.push(i);
        obj.Books += 1;
        localStorage.setItem(activeAcc, JSON.stringify(obj));
      }
    }
  });
}

loginc.addEventListener("click", function () {
  btnModal = true;

  mdalClose();
});

RegistorBtn.addEventListener("click", function () {
  btnModal = true;
  closeLog();
  // closeLog();
  // modalOpen();
});

const logout = document.getElementById("logout");

logout.addEventListener("click", function () {
  butLog.innerHTML = ``;
  const obj = JSON.parse(
    localStorage.getItem(localStorage.getItem("activeAcc"))
  );
  activeAcc = ``;

  localStorage.setItem("activeAcc", activeAcc);
  profileact.classList.remove("actived");
  butLog.innerHTML = ``;
  butLog.append(btnText);

  for (let i of obj.BooksMas) {
    if (cardBooks[i].querySelector(".buy2")) {
      let buttoni = cardBooks[i].querySelector(".buy2");
      buttoni.classList.add("buy");
      buttoni.classList.remove("buy2");
      buttoni.disabled = false;
      buttoni.innerText = `Buy`;
    }

    // if(cardBooks[i].querySelectora("buy2")){
    //   let button =  cardBooks[i];
    //   console.log(button);
    // }

    //  button.classList.add("buy");
    //  button.classList.remove("buy2");
    //  button.disabled = false;
  }

  getText1.innerText = `Get a reader card`;
  getText2.innerHTML = `You will be able to see a reader card after <br> logging into account or you can register a new <br> account`;
  butWraper.removeChild(loginBtn2);
  butWraper.append(btnSingup);
  butWraper.append(loginBtn2);
  const cardisProfile = document.querySelector(".card_profile");
  loginBtn2.innerText = `Log in`;
  document.forms["forma"].removeChild(cardisProfile);
  document.forms["forma"].append(inpytBtn);
  document.forms["forma"]["readerer"].value = ``;
  document.forms["forma"]["card_namber"].value = ``;
});

function openProf() {
  const obj = JSON.parse(
    localStorage.getItem(localStorage.getItem("activeAcc"))
  );

  tablName.innerText = `${obj.first_name[0]}${obj.last_name[0]}`;
  polnName.innerText = `${obj.first_name} ${obj.last_name}`;
  profilesNumber[0].innerText = `${obj.visits}`;
  profilesNumber[1].innerText = `${obj.bonuses}`;
  profilesNumber[2].innerText = `${obj.Books}`;
  cardNumber.innerText = `${obj.card_namber}`;

  for (let i = 0; i < obj.BooksMas.length; i++) {
    let booksLi = document.createElement("li");
    booksLi.innerText = `${
      cardBooks[obj.BooksMas[i]].querySelector(".boks_name").innerText
    }, ${cardBooks[obj.BooksMas[i]].querySelector(".autor_name").innerText}`;
    buksBue.append(booksLi);
  }

  if (buksBue.childElementCount > 2) {
    buksBue.style.overflowY = `scroll`;
  }

  wraperProfile.classList.add("open_profile");
  document.body.classList.add("opened_bod");
  setTimeout(function () {
    modalProfile.classList.add("profile_opened");
  }, 1);
}

myprof.addEventListener("click", openProf);

function closed_profiles() {
  modalProfile.classList.remove("profile_opened");
  wraperProfile.addEventListener("transitionend", function () {
    if (!modalProfile.classList.contains("profile_opened")) {
      wraperProfile.classList.remove("open_profile");
      document.body.classList.remove("opened_bod");
      if (buksBue.querySelector("li")) {
        const lengthh = buksBue.querySelectorAll("li").length;
        for (let i = 0; i < lengthh; i++) {
          buksBue.removeChild(buksBue.querySelector("li"));
        }
      }
    }
  });
}

closeProfile.addEventListener("click", closed_profiles);

coppyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(cardNumber.innerText);
});

function inpytAllLib() {
  let all = true;
  for (const j of document.forms["formas_lib"]) {
    if (j.type == `text`) {
      if (j.value == ``) {
        all = false;
        break;
      }
    }
  }
  if (document.forms["formas_lib"]["bank"].value.length < 16) {
    all = false;
  }
  if (document.forms["formas_lib"]["cvc"].value.length !== 3) {
    all = false;
  }

  if (all == true) {
    buttonLib.classList.remove("color");
    buttonLib.disabled = false;
  } else {
    buttonLib.classList.add("color");
    buttonLib.disabled = true;
  }
}

function formLib() {
  const obj = JSON.parse(
    localStorage.getItem(localStorage.getItem("activeAcc"))
  );
  obj.byeCards = true;

  ByeBtn[buttonclickI].classList.add("buy2");
  ByeBtn[buttonclickI].classList.remove("buy");
  ByeBtn[buttonclickI].innerText = `Own`;
  ByeBtn[buttonclickI].disabled = true;
  obj.BooksMas.push(buttonclickI);
  obj.Books += 1;
  localStorage.setItem(activeAcc, JSON.stringify(obj));

  closeByeCard();
}

const wraperLibrary = document.querySelector(".wraper_library");
const modalLibrary = document.querySelector(".modal_library");

function closeByeCard() {
  modalLibrary.classList.remove("library_opened");
  wraperLibrary.addEventListener("transitionend", function () {
    if (!modalLibrary.classList.contains("library_opened")) {
      wraperLibrary.classList.remove("open_library");
      document.body.classList.remove("opened_bod");
    }
  });
}

butonCloseLibrary.addEventListener("click", closeByeCard);

buttonLib.addEventListener("click", formLib);

console.log(`

Ограниченная карусель в блоке About : 25
Слайдер в блоке Favorites 23

Меню авторизации при нажатии на иконку пользователя 8 
Модальное окно REGISTER 29
Окончание регистрации 8 
При наличии регистрации, но будучи не авторизованным 4 

Модальное окно LOGIN 29

Меню профиля при нажатии на иконку с инициалами пользователя 16
Модальное окно MY PROFILE  25

Блок Favorites 6

Модальное окно BUY A LIBRARY CARD 27

Блок Digital Library Cards 2

total 202

`);
