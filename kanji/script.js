// Definir los pares de kanji y significados
const kanji_meanings = [
    ["日", "día, sol, Japón, contador de días"],
    ["一", "uno"],
    ["国", "país"],
    ["人", "persona"],
    ["年", "año, contador de años"],
    ["大", "grande"],
    ["十", "diez"],
    ["二", "dos"],
    ["本", "libro, presente, verdadero, contador de objetos cilíndricos"],
    ["中", "dentro, medio, centro"],
    ["長", "largo, líder, superior, mayor"],
    ["出", "salida, dejar, salir"],
    ["三", "tres"],
    ["時", "hora, tiempo"],
    ["行", "ir, viaje, llevar a cabo, línea, fila"],
    ["見", "ver, esperanza, oportunidad, idea, mirar, visible"],
    ["月", "mes, luna"],
    ["分", "parte, minuto, entender"],
    ["後", "detrás, atrás, más tarde"],
    ["前", "delante, antes"],
    ["生", "vida, genuino, nacimiento"],
    ["五", "cinco"],
    ["間", "intervalo, espacio"],
    ["上", "arriba, sobre"],
    ["東", "este"],
    ["四", "cuatro"],
    ["今", "ahora, presente"],
    ["金", "oro"],
    ["九", "nueve"],
    ["入", "entrar, insertar"],
    ["学", "estudio, aprendizaje, ciencia"],
    ["高", "alto, caro, elevado"],
    ["円", "círculo, yen, redondo"],
    ["子", "niño"],
    ["外", "fuera, exterior"],
    ["八", "ocho"],
    ["六", "seis"],
    ["下", "debajo, bajar"],
    ["来", "venir, siguiente"],
    ["気", "espíritu, mente, aire, atmósfera, estado de ánimo"],
    ["小", "pequeño"],
    ["七", "siete"],
    ["山", "montaña"],
    ["話", "hablar, conversación"],
    ["女", "mujer, femenina"],
    ["北", "norte"],
    ["午", "mediodía, signo del caballo"],
    ["百", "cien"],
    ["書", "escribir"],
    ["先", "delante, anterior, futuro, precedencia"],
    ["名", "nombre, famoso, reputación"],
    ["川", "río"],
    ["千", "mil"],
    ["水", "agua"],
    ["半", "medio, mitad"],
    ["男", "hombre, masculino"],
    ["西", "oeste"],
    ["電", "electricidad, energía eléctrica"],
    ["校", "escuela, examen"],
    ["語", "palabra, habla, lenguaje"],
    ["土", "tierra, suelo"],
    ["木", "árbol, madera"],
    ["聞", "oír, escuchar, preguntar"],
    ["食", "comer, comida"],
    ["車", "coche, rueda"],
    ["何", "qué"],
    ["南", "sur"],
    ["万", "diez mil"],
    ["毎", "cada"],
    ["白", "blanco"],
    ["天", "cielo, cielo celestial"],
    ["母", "madre"],
    ["火", "fuego"],
    ["右", "derecha (dirección)"],
    ["読", "leer"],
    ["友", "amigo"],
    ["左", "izquierda"],
    ["休", "descansar, día libre, retirarse, dormir"],
    ["父", "padre"],
    ["雨", "lluvia"]
]

const kanji_kunyomi = [
    ["日", "ひ, -び, -か"],
    ["一", "ひと(つ)"],
    ["国", "くに"],
    ["人", "ひと"],
    ["年", "とし"],
    ["大", "おお(きい)"],
    ["十", "とお, と"],
    ["二", "ふた(つ)"],
    ["本", "もと"],
    ["中", "なか, うち, あた(る)"],
    ["長", "なが(い), おさ"],
    ["出", "で(る), だ(す), い(でる)"],
    ["三", "み(つ)"],
    ["時", "とき, -どき"],
    ["行", "い(く), ゆ(く), おこな(う)"],
    ["見", "み(る), み(せる)"],
    ["月", "つき"],
    ["分", "わ(ける)"],
    ["後", "のち, うし(ろ), あと"],
    ["前", "まえ"],
    ["生", "い(きる), う(む), お(う), は(える), なま"],
    ["五", "いつ(つ)"],
    ["間", "あいだ, ま, あい"],
    ["上", "うえ, うわ-, かみ, あ(げる), のぼ(る), たてまつ(る)"],
    ["東", "ひがし"],
    ["四", "よ(つ), よん"],
    ["今", "いま"],
    ["金", "かね, かな-, -がね"],
    ["九", "ここの(つ)"],
    ["入", "い(る), はい(る)"],
    ["学", "まな(ぶ)"],
    ["高", "たか(い)"],
    ["円", "まる(い)"],
    ["子", "こ, ね"],
    ["外", "そと, ほか, はず(す), と-"],
    ["八", "や(つ), よう"],
    ["六", "む(つ), むい"],
    ["下", "した, しも, もと, さ(げる), くだ(る), お(ろす)"],
    ["来", "く.る, きた.る, き, こ"],
    ["気", "いき"],
    ["小", "ちい(さい), こ-, お-, さ-"],
    ["七", "なな(つ), なの"],
    ["山", "やま"],
    ["話", "はな(す), はなし"],
    ["女", "おんな, め"],
    ["北", "きた"],
    ["午", "うま"],
    ["百", "もも"],
    ["書", "か(く)"],
    ["先", "さき, ま(ず)"],
    ["名", "な"],
    ["川", "かわ"],
    ["千", "ち"],
    ["水", "みず"],
    ["半", "なか(ば)"],
    ["男", "おとこ, お"],
    ["西", "にし"],
    ["電", "なし"],
    ["校", "なし"],
    ["語", "かた(る)"],
    ["土", "つち"],
    ["木", "き, こ-"],
    ["聞", "き(く)"],
    ["食", "く(う), た(べる), は(む)"],
    ["車", "くるま"],
    ["何", "なに, なん"],
    ["南", "みなみ"],
    ["万", "なし"],
    ["毎", "ごと(に)"],
    ["白", "しろ(い)"],
    ["天", "あまつ"],
    ["母", "はは, かあ"],
    ["火", "ひ, -び, ほ-"],
    ["右", "みぎ"],
    ["読", "よ(む)"],
    ["友", "とも"],
    ["左", "ひだり"],
    ["休", "やす(む)"],
    ["父", "ちち, とう"],
    ["雨", "あめ, あま"]
]

const kanji_onyomi = [
    ["日", "nichi, jitsu"],
    ["一", "ichi"],
    ["国", "koku"],
    ["人", "jin, nin"],
    ["年", "nen"],
    ["大", "dai, tai"],
    ["十", "juu"],
    ["二", "ni, ji"],
    ["本", "hon"],
    ["中", "chuu"],
    ["長", "chou"],
    ["出", "shutsu, sui"],
    ["三", "san"],
    ["時", "ji"],
    ["行", "kou, gyou, an"],
    ["見", "ken"],
    ["月", "getsu, gatsu"],
    ["分", "bun, fun, bu"],
    ["後", "go, kou"],
    ["前", "zen"],
    ["生", "sei, shou"],
    ["五", "go"],
    ["間", "kan, ken"],
    ["上", "jou, shou, shan"],
    ["東", "tou"],
    ["四", "shi"],
    ["今", "kon, kin"],
    ["金", "kin, kon, gon"],
    ["九", "kyuu, ku"],
    ["入", "nyuu"],
    ["学", "gaku"],
    ["高", "kou"],
    ["円", "en"],
    ["子", "shi, su, tsu"],
    ["外", "gai, ge"],
    ["八", "hachi"],
    ["六", "roku"],
    ["下", "ka, ge"],
    ["来", "rai, tai"],
    ["気", "ki, ke"],
    ["小", "shou"],
    ["七", "shichi"],
    ["山", "san, sen"],
    ["話", "wa"],
    ["女", "jo"],
    ["北", "hoku"],
    ["午", "go"],
    ["百", "hyaku, byaku"],
    ["書", "sho"],
    ["先", "sen"],
    ["名", "mei, myou"],
    ["川", "sen"],
    ["千", "sen"],
    ["水", "sui"],
    ["半", "han"],
    ["男", "dan, nan"],
    ["西", "sei, sai"],
    ["電", "den"],
    ["校", "kou"],
    ["語", "go"],
    ["土", "do, to"],
    ["木", "boku, moku"],
    ["聞", "bun, mon"],
    ["食", "shoku, jiki"],
    ["車", "sha"],
    ["何", "ka"],
    ["南", "nan, na"],
    ["万", "man, ban"],
    ["毎", "mai"],
    ["白", "haku, byaku"],
    ["天", "ten"],
    ["母", "bo"],
    ["火", "ka"],
    ["右", "u, yuu"],
    ["読", "doku, toku, tou"],
    ["友", "yuu"],
    ["左", "sa, sha"],
    ["休", "kyuu"],
    ["父", "fu"],
    ["雨", "u"]
]


var kanjiPairs = kanji_meanings;

const kanji_button = document.getElementById("kanji");
kanji_button.addEventListener("click", () => {
    kanjiPairs = kanji_meanings;
    startGame();
});

const onyomi = document.getElementById("onyomi");
onyomi.addEventListener("click", () => {
    kanjiPairs = kanji_onyomi;
    startGame();
});

const kunyomi = document.getElementById("kunyomi");
kunyomi.addEventListener("click", () => {
    kanjiPairs = kanji_kunyomi;
    startGame();
});


// Recuperar las mejores puntuaciones
let bestScores = JSON.parse(localStorage.getItem("bestScores") || "[]");

function begin() {
    const mikiScore = { name: "Miki", score: 1000 };

    // Asegurarse de que bestScores está inicializado
    bestScores.push(mikiScore);

    // Ordenar y guardar
    bestScores = bestScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("bestScores", JSON.stringify(bestScores));

    setRecords();

    console.log("Se ha añadido la puntuación de miki!");
}


begin();


// Variables de juego
let currentSet = [];
let selectedButtons = [];
let matchedPairs = 0;
let errorCount = 0;
let startTime;

// Referencias a los elementos DOM
const kanjiContainer = document.getElementById('kanji-container');
const wordContainer = document.getElementById('word-container');
const errorDisplay = document.getElementById('error-count');
const timeDisplay = document.getElementById('time-taken');

// Función para iniciar el juego
function startGame() {
    matchedPairs = 0;
    errorCount = 0;
    errorDisplay.textContent = errorCount;

    kanjiPairs.sort(() => Math.random() - 0.5); // Mezclar los pares
    startTime = Date.now();
    loadNextSet();
    begin();
    console.log("EL juego ha empezado");
}

// Terminar el juego
function endGame() {
    const endTime = Date.now();
    const timeTaken = Math.floor((endTime - startTime) / 1000);
    const basePoints = 1000;
    const timePenalty = timeTaken * 5;
    const errorPenalty = errorCount * 20;
    const finalScore = Math.max(0, basePoints - timePenalty - errorPenalty);

    // Verificar si el puntaje merece estar en el top 10
    const lowestScore = bestScores.length === 10 ? bestScores[9].score : 0;

    if (finalScore > lowestScore || bestScores.length < 10) {
        const playerName = prompt("Enter your name:") || "AAA";
        const newScore = { name: playerName, score: finalScore };

        // Insertar y reordenar
        bestScores.push(newScore);
        bestScores = bestScores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);

        // Guardar en localStorage
        localStorage.setItem('bestScores', JSON.stringify(bestScores));
    }

    setRecords(); // Actualizar el ranking

    alert(`Game Over!\nTime: ${timeTaken} seconds\nErrors: ${errorCount}\nScore: ${finalScore}`);
}

// Actualizar los mejores puntajes en la tabla
function setRecords() {
    const recordsTableBody = document.querySelector("#records tbody");
    recordsTableBody.innerHTML = "";

    bestScores.slice(0, 10).forEach((entry, index) => {
        const row = document.createElement("tr");
    
        const rankCell = document.createElement("td");
        rankCell.textContent = index + 1;
    
        const nameCell = document.createElement("td");
        nameCell.textContent = entry.name;
    
        const scoreCell = document.createElement("td");
        scoreCell.textContent = entry.score;
    
        row.appendChild(rankCell);
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
    
        recordsTableBody.appendChild(row);
    });
    
}

/* Botón para agregar puntajes de prueba
const addMikiButton = document.getElementById("addMikiButton");
addMikiButton.addEventListener("click", () => {
    const mikiScore = { name: "Miki", score: 9999 };
    bestScores.push(mikiScore);

    // Ordenar y guardar
    bestScores = bestScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("bestScores", JSON.stringify(bestScores));

    setRecords(); // Actualizar la tabla

    addMikiButton.style.display = "none";
});

*/

// Cargar un nuevo conjunto de pares
function loadNextSet() {
    if (kanjiPairs.length === 0) {
        endGame();
        return;
    }

    currentSet = kanjiPairs.splice(0, 5);
    renderButtons();
}

// Mostrar botones de kanji y significado
function renderButtons() {
    kanjiContainer.innerHTML = '';
    wordContainer.innerHTML = '';

    const kanjis = currentSet.map(pair => pair[0]);
    const meanings = currentSet.map(pair => pair[1]);

    const shuffledKanji = shuffleArray(kanjis);
    const shuffledMeanings = shuffleArray(meanings);

    shuffledKanji.forEach(kanji => {
        const button = document.createElement('button');
        button.className = "botones game-button";
        button.textContent = kanji;
        button.dataset.value = kanji;
        button.dataset.type = 'kanji';
        button.addEventListener('click', handleButtonClick);
        kanjiContainer.appendChild(button);
    });

    shuffledMeanings.forEach(meaning => {
        const button = document.createElement('button');
        button.className = "botones game-button";
        button.textContent = meaning;
        button.dataset.value = meaning;
        button.dataset.type = 'meaning';
        button.addEventListener('click', handleButtonClick);
        wordContainer.appendChild(button);
    });
}

// Manejar clic en botones
function handleButtonClick(e) {
    const button = e.target;
    if (selectedButtons.includes(button)) return;

    selectedButtons.push(button);
    button.style.backgroundColor = '#d3f9d8';

    if (selectedButtons.length === 2) {
        checkMatch();
    }
}

// Verificar si es un par correcto
function checkMatch() {
    const [btn1, btn2] = selectedButtons;
    const isKanji = btn1.dataset.type === 'kanji';
    const kanji = isKanji ? btn1.dataset.value : btn2.dataset.value;
    const meaning = isKanji ? btn2.dataset.value : btn1.dataset.value;

    const pairExists = currentSet.some(pair => pair[0] === kanji && pair[1] === meaning);

    if (pairExists) {
        matchedPairs++;
        btn1.style.visibility = 'hidden';
        btn2.style.visibility = 'hidden';

        if (matchedPairs === 5) {
            matchedPairs = 0;
            loadNextSet();
        }
    } else {
        errorCount++;
        errorDisplay.textContent = errorCount;
    }

    selectedButtons = [];
    resetButtonStyles();
}

// Restablecer estilo de botones
function resetButtonStyles() {
    document.querySelectorAll('.game-button').forEach(boton => {
        boton.style.backgroundColor = '#fff';
    });
}

// Mezclar un arreglo
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Iniciar el juego
startGame();
