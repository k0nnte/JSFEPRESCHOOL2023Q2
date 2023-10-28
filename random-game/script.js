const text = document.querySelector(".text");
const butStart = document.getElementById("start");
const scores = document.getElementById("scores");
const wraperGame = document.querySelector(".wraper__game");
const audios = new Audio(`./music/music.mp3`)






//функция добавления в localStorage

function addLocal(point, index) {
    if (!localStorage.getItem("score")) {
        const mas = [[], [], []];
        mas[index].push(point);
        localStorage.setItem("score", JSON.stringify(mas));
    } else {
        const mas = JSON.parse(localStorage.getItem("score"));
        const set = new Set(mas[index])
        set.add(point);
        mas[index] = [...set];
        mas[index].sort((a, b) => {
            return b - a;
        })
        if (mas[index].length > 10) {
            mas[index].pop();
        }
        localStorage.setItem("score", JSON.stringify(mas));
    }
}


// вывод очков игры

scores.addEventListener("click", function () {
    if (!localStorage.getItem("score")) {
        alert("сыграй хотя бы 1 игру");
    } else {
        wraperGame.removeChild(butStart)
        wraperGame.removeChild(scores);
        const wraperScore = document.createElement("div");
        wraperScore.classList.add("wraper__score");
        wraperGame.append(wraperScore);
        for (let i = 0; i < 3; i++) {
            const scoress = document.createElement("div");
            scoress.classList.add("scoress");
            if (i == 0) {
                const pscor = document.createElement("p");
                pscor.classList.add("scorr");
                pscor.innerText = `EASY`;
                scoress.append(pscor);
            }
            if (i == 1) {
                const pscor = document.createElement("p");
                pscor.classList.add("scorr");
                pscor.innerText = `MEDIUM`;
                scoress.append(pscor);
            }
            if (i == 2) {
                const pscor = document.createElement("p");
                pscor.classList.add("scorr");
                pscor.innerText = `HARD`;
                scoress.append(pscor);
            }
            wraperScore.append(scoress);
        }
        const close = document.createElement("button");
        close.innerText = `CLOSE`;
        close.classList.add("butsnake");
        wraperGame.append(close);
        const masdiv = document.querySelectorAll(".scoress");
        const mas = JSON.parse(localStorage.getItem("score"));





        mas.forEach((item, indexx) => {
            item.forEach((it, indd) => {
                const p = document.createElement("p")
                p.classList.add("scor");
                p.textContent = `${indd + 1} place : ${it} points`;
                masdiv[indexx].append(p);
            })
        })
        close.addEventListener("click", function () {
            text.innerText = `SNAKE`
            wraperGame.removeChild(wraperScore);
            wraperGame.removeChild(close);
            wraperGame.append(butStart);
            wraperGame.append(scores);
        })
    }
})

// функция иры змека

function game(sped, maxel, ind) {
    let amountOfFood = 0;
    wraperGame.innerHTML = `
    <p class="fod scor">Score : 0</p>
    <canvas class="can" width="768" height="512"></canvas>
    <div class="wraper__but"> 
    <button class="butsnake" id="close__game">close</button>
    <button class="butsnake" id="restart">restart</button>
 </div>
    `;

    const closeGame = document.getElementById("close__game");
    const canvas = document.querySelector(".can");
    const fod = document.querySelector(".fod");
    const ctx = canvas.getContext("2d");
    const restart = document.getElementById("restart");
    const med = window.matchMedia("(min-width: 1800px)");







    const setting = {
        sizeAll: 16,
        speed: 0.5,
        gameover: false,
        gamewin: false,
    }


    // медиа запрос js 

    if (med.matches) {
        setting.sizeAll *= 1.4;
        canvas.width *= 1.4;
        canvas.height *= 1.4;
    }




    // змея

    let snake = {
        x: (canvas.width / 2),
        y: (canvas.height / 2),
        width: setting.sizeAll,
        height: setting.sizeAll,
        dx: 0,
        dy: (setting.sizeAll * -1),
        body: [],
        maxEl: 3,
    }



    // еда

    let food = {
        x: Random(setting.sizeAll / 2, canvas.width - setting.sizeAll / 2),
        y: Random(setting.sizeAll / 2, canvas.height - setting.sizeAll / 2),
        radius: setting.sizeAll / 2,

    }




    // рандом для появления еды

    function Random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }



    // функция проверки столкновени змеи и еды

    function checkCollisionSnakeFood(circle, rect) {
        const x = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
        const y = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));

        // Измеряем расстояние от найденной точки до центра круга
        const distance = Math.sqrt(
            (x - circle.x) ** 2 +
            (y - circle.y) ** 2
        );

        return distance < circle.radius;


    }

    // отриова еды

    function drawFood() {

        ctx.beginPath();
        ctx.fillStyle = `blue`;
        ctx.arc(food.x, food.y, food.radius, 0, 2 * Math.PI);
        ctx.fill();

    }

    // функция отрисовки змеи и проверок

    function drawSnake() {

        // перемецение змеи
        snake.x += snake.dx;
        snake.y += snake.dy;

        // проверка на выход за границы поля

        if (snake.x < 0) {
            snake.x = canvas.width - setting.sizeAll;

        } else if (snake.x + snake.width > canvas.width) {
            snake.x = 0;
        }

        if (snake.y < 0) {
            snake.y = canvas.height - setting.sizeAll;

        } else if (snake.y + snake.height > canvas.height) {
            snake.y = 0;
        }

        // проверка если съели вкусншку

        if (checkCollisionSnakeFood(food, snake)) {
            let bol = true;
            while (bol == true) {
                food.x = Random(setting.sizeAll / 2, canvas.width - setting.sizeAll / 2);
                food.y = Random(setting.sizeAll / 2, canvas.height - setting.sizeAll / 2);
                let bol2 = false;
                // если новый элемент появляется на теле змеи то создаем еду на новом месте
                snake.body.forEach(elem => {
                    if (checkCollisionSnakeFood(food, elem) == true) {
                        bol2 = true;

                    }
                })
                if (bol2 == false) {
                    bol = false;
                }
            }

            // добавляем хвост змеи
            amountOfFood++;
            snake.maxEl += maxel;
            fod.innerText = `Score : ${amountOfFood}`;
            setting.speed += sped;
            audios.currentTime = 0;
            audios.pause();
            audios.play();
            if (ind == 0 && amountOfFood == 20) {
                setting.gamewin = true;

            }
            if (ind == 1 && amountOfFood == 17) {
                setting.gamewin = true;

            }
            if (ind == 2 && amountOfFood == 15) {
                setting.gamewin = true;

            }


        }

        //  отрисовка перемещения змеи

        snake.body.unshift(
            {
                x: snake.x,
                y: snake.y,
                width: setting.sizeAll,
                height: setting.sizeAll,
            }
        );
        if (snake.body.length > snake.maxEl) {
            snake.body.pop();
        }


        for (let i = 1; i < snake.body.length; i++) {


            ctx.fillStyle = `white`;
            ctx.fillRect(snake.body[i].x, snake.body[i].y, snake.body[i].width, snake.body[i].height);

            // если столкнулись с хвостом то проиграли :=(

            if (snake.x === snake.body[i].x && snake.y === snake.body[i].y) {
                setting.gameover = true;

            }

        }
        ctx.fillStyle = `green`;
        ctx.fillRect(snake.body[0].x, snake.body[0].y, snake.body[0].width, snake.body[0].height);

    }

    document.addEventListener("keydown", function (e) {

        // проверки на нажатие стреочек и если змея двигается в обратном направлении что бы ничего не сробатывало

        if (e.key === `ArrowUp` && snake.dy == 0) {
            snake.dy = setting.sizeAll * (-1);
            snake.dx = 0;
        }
        if (e.key === `ArrowDown` && snake.dy == 0) {
            snake.dy = setting.sizeAll;
            snake.dx = 0;
        }
        if (e.key === `ArrowLeft` && snake.dx == 0) {
            snake.dy = 0;
            snake.dx = setting.sizeAll * (-1);
        }
        if (e.key === `ArrowRight` && snake.dx == 0) {
            snake.dy = 0;
            snake.dx = setting.sizeAll;
        }
    })

    let x1, y1;


    function startTouch(e) {
        x1 = e.touches[0].clientX;
        y1 = e.touches[0].clientY;
    }

    function moveTouch(e) {
        let x2 = e.touches[0].clientX;
        let y2 = e.touches[0].clientY;
        let Dx = x2 - x1;
        let Dy = y2 - y1;
        if (Math.abs(Dx) > Math.abs(Dy)) {
            if (Dx > 0 && snake.dx == 0) {
                snake.dy = 0;
                snake.dx = setting.sizeAll;
            }
            if (Dx < 0 && snake.dx == 0) {
                snake.dy = 0;
                snake.dx = setting.sizeAll * (-1);
            }
        } else {
            if (Dy > 0 && snake.dy == 0) {
                snake.dy = setting.sizeAll;
                snake.dx = 0;
            }
            if (Dy < 0 && snake.dy == 0) {
                snake.dy = setting.sizeAll * (-1);
                snake.dx = 0;
            }
        }
    }


    canvas.addEventListener("touchstart", startTouch, false);
    canvas.addEventListener("touchmove", moveTouch, false);
    med.addEventListener("change", resize);

    // медиазапрос js 

    function resize(e) {
        let { matches } = e.currentTarget;
        if (matches) {
            canvas.width *= 1.4;
            canvas.height *= 1.4;
            setting.sizeAll *= 1.4;
            food.radius *= 1.4;
            food.x *= 1.4;
            food.y *= 1.4;
            snake.x *= 1.4;
            snake.y *= 1.4;
            snake.dx *= 1.4;
            snake.dy *= 1.4;
            snake.body.forEach((elem) => {
                elem.x *= 1.4;
                elem.y *= 1.4;
                elem.width *= 1.4;
                elem.height *= 1.4;
            })
        }
        if (!matches) {
            canvas.width /= 1.4;
            canvas.height /= 1.4;
            setting.sizeAll /= 1.4;
            food.radius /= 1.4;
            food.x /= 1.4;
            food.y /= 1.4;
            snake.x /= 1.4;
            snake.y /= 1.4;
            snake.dx /= 1.4;
            snake.dy /= 1.4;
            snake.body.forEach((elem) => {
                elem.x /= 1.4;
                elem.y /= 1.4;
                elem.height /= 1.4;
                elem.width /= 1.4;

            })
        }
    }




    // отрисовка экрана

    function draw() {

        setTimeout(() => {


            ctx.clearRect(0, 0, canvas.width, canvas.height);



            drawFood()
            drawSnake();

            if (setting.gameover) {

                window.cancelAnimationFrame(draw);

                addLocal(Number(amountOfFood), ind);
                alert(`вы роиграи вы набрали ${amountOfFood} очков`);

            } else if (setting.gamewin) {
                window.cancelAnimationFrame(draw);
                addLocal(amountOfFood, ind);
                alert(`Вы выйграли`);

            } else {
                window.requestAnimationFrame(draw);
            }






        }, 1000 / (10 * setting.speed))

    }

    window.requestAnimationFrame(draw);



    closeGame.addEventListener("click", function () {
        wraperGame.innerHTML = ``;
        wraperGame.append(text);
        wraperGame.append(butStart);
        wraperGame.append(scores);



    })

    // перезапуск игры

    restart.addEventListener("click", function () {
        snake = {
            x: (canvas.width / 2),
            y: (canvas.height / 2),
            width: setting.sizeAll,
            height: setting.sizeAll,
            dx: 0,
            dy: (setting.sizeAll * -1),
            body: [],
            maxEl: 3,
        }
        setting.speed = 0.5;

        food = {
            x: Random(setting.sizeAll * 2, canvas.width - setting.sizeAll * 2),
            y: Random(setting.sizeAll * 2, canvas.height - setting.sizeAll * 2),
            radius: setting.sizeAll / 2,

        }
        if (setting.gameover == true) {
            setting.gameover = false;
            window.requestAnimationFrame(draw);

        }
        if (setting.gamewin == true) {
            setting.gamewin = false;
            window.requestAnimationFrame(draw);
        }
        setting.speed = 0.5;
        amountOfFood = 0;
        fod.innerText = `Score : ${amountOfFood}`;


    })

}


// старт игры и выбор сложности

butStart.addEventListener("click", function () {

    wraperGame.innerHTML = `
    <p class="text">Snake</p>
    <button class="butsnake" id="easy">EASY</button>
    <button class="butsnake" id="medium">MEDIUM</button>
    <button class="butsnake" id="hard">HARD</button>
    `;

    const easy = document.getElementById("easy");
    const medium = document.getElementById("medium");
    const hard = document.getElementById("hard");

    easy.addEventListener("click", function () {
        game(0.2, 2, 0);
    })
    medium.addEventListener("click", function () {
        game(0.5, 5, 1);
    })
    hard.addEventListener("click", function () {
        game(0.8, 8, 2);
    })





})


console.log(`
    реализован интерфейс игры +5
    в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
    Логика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10
    Реализовано завершение игры при достижении игровой цели +10
    По окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10
    Есть таблица результатов, в которой сохраняются результаты 10 игр с наибольшим счетом (лучшим временем и т.п.) или просто 10 последних игр (хранится в local storage) +10
    Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10
    Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
    total: 70/60

`);