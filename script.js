const gra = document.getElementById('gra');
const paddleGracz = document.getElementById('paddle-gracz');
const paddleAi = document.getElementById('paddle-ai');
const pilka = document.getElementById('pilka');
const wynikGraczEl = document.getElementById('wynik-gracz');
const wynikAiEl = document.getElementById('wynik-ai');

let graczY = window.innerHeight / 2 - 100;
let aiY = window.innerHeight / 2 - 100;
let pilkaX = window.innerWidth / 2 - 20;
let pilkaY = window.innerHeight / 2 - 20;

let predkoscPilkiX = 8;
let predkoscPilkiY = 4;
let predkoscAi = 3.5; 

////////////////////Poziom Trudnosci upp////////////////////////////////

let wynikGracz = 0;
let wynikAi = 0;

let liczbaOdbic = 0;

let predkoscGracza = 0;
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') predkoscGracza = -10;
    if (e.key === 'ArrowDown') predkoscGracza = 10;
});
document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') predkoscGracza = 0;
});

let filmOdtwarzany = false;

function aktualizujGre() {
    if (filmOdtwarzany) return;

    graczY += predkoscGracza;
    if (graczY < 0) graczY = 0;
    if (graczY > window.innerHeight - 200) graczY = window.innerHeight - 200;
    paddleGracz.style.top = `${graczY}px`;

    if (pilkaY > aiY + 100) aiY += predkoscAi;
    if (pilkaY < aiY + 100) aiY -= predkoscAi;
    if (aiY < 0) aiY = 0;
    if (aiY > window.innerHeight - 200) aiY = window.innerHeight - 200;
    paddleAi.style.top = `${aiY}px`;

    pilkaX += predkoscPilkiX;
    pilkaY += predkoscPilkiY;

    if (pilkaY <= 0 || pilkaY >= window.innerHeight - 40) {
        predkoscPilkiY *= -1;
    }

    if (
        pilkaX <= 60 &&
        pilkaY + 40 >= graczY &&
        pilkaY <= graczY + 200
    ) {
        predkoscPilkiX *= -1;
        obliczOdbicie();
    }

    if (
        pilkaX >= window.innerWidth - 100 &&
        pilkaY + 40 >= aiY &&
        pilkaY <= aiY + 200
    ) {
        predkoscPilkiX *= -1;
        obliczOdbicie();
    }

    if (pilkaX <= 0) {
        wynikAi++;
        resetujPilke();
    }

    if (pilkaX >= window.innerWidth - 40) {
        wynikGracz++;
        resetujPilke();
    }

    pilka.style.left = `${pilkaX}px`;
    pilka.style.top = `${pilkaY}px`;

    wynikGraczEl.textContent = wynikGracz;
    wynikAiEl.textContent = wynikAi;

    if (wynikGracz >= 3) {
        pokazFilm('wygrana');
        wynikGracz = 0;
        wynikAi = 0;
        resetujPilke();
    } else if (wynikAi >= 3) {
        pokazFilm('przegrana');
        wynikGracz = 0;
        wynikAi = 0;
        resetujPilke();
    }

    requestAnimationFrame(aktualizujGre);
}

////////////////// Wyniki do wygranej upppppppppppp///////////////////////////

function resetujPilke() {
    pilkaX = window.innerWidth / 2 - 20;
    pilkaY = window.innerHeight / 2 - 20;
    predkoscPilkiX = 8 * (Math.random() > 0.5 ? 1 : -1);
    predkoscPilkiY = 4 * (Math.random() > 0.5 ? 1 : -1);
    liczbaOdbic = 0;
}

function obliczOdbicie() {
    liczbaOdbic++;
    if (liczbaOdbic % 2 === 0) {
        predkoscPilkiX *= 1.1;
        predkoscPilkiY *= 1.1;
    }
}
///////////////////>>>> Film koncowy <<<<<//////////////////////////////
function pokazFilm(wynik) {
    if (filmOdtwarzany) return;

    filmOdtwarzany = true;

    const film = document.createElement('video');
    film.src = wynik === 'wygrana' ? 'wygrana.mp4' : 'przegrana.mp4';
    film.autoplay = true;
    film.style.position = 'absolute';
    film.style.top = '50%';
    film.style.left = '50%';
    film.style.transform = 'translate(-50%, -50%)';
    film.style.zIndex = 10;

    film.onplay = () => {
        console.log('Film jest odtwarzany');
    };

    film.onended = () => {
        filmOdtwarzany = false;
        gra.removeChild(film);
        resetujGre();
    };

    gra.appendChild(film);
}

window.addEventListener('resize', () => {
    graczY = window.innerHeight / 2 - 100;
    aiY = window.innerHeight / 2 - 100;
    resetujPilke();
});

resetujPilke();
aktualizujGre();
